import { X, PhoneCall, MessageCircleMore, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addDays } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

// Simple phone number validation (allows numbers, spaces, +, -, and ())
const phoneRegex = /^[\d\s+\-()]{10,20}$/;

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  contact: z.string()
    .min(10, { message: 'Please enter a valid phone number (at least 10 digits).' })
    .regex(phoneRegex, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(10, { message: 'Please provide more details (min 10 characters).' }),
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Please select a valid date',
  }),
  timeSlot: z.string().min(1, { message: 'Please select a time slot.' })
}).refine(data => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return data.date >= today;
}, {
  message: 'Please select a future date',
  path: ['date']
});

type FormValues = z.infer<typeof formSchema>;

// Generate time slots from 9 AM to 5 PM with 1-hour intervals
const generateTimeSlots = (date: Date): string[] => {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 17;
  const now = new Date();
  const isCurrentDay = date.toDateString() === now.toDateString();
  const currentHour = now.getHours();

  for (let hour = startHour; hour < endHour; hour++) {
    if (isCurrentDay && hour <= currentHour) continue;
    const startTime = format(new Date().setHours(hour, 0, 0, 0), 'h:mm a');
    const endTime = format(new Date().setHours(hour + 1, 0, 0, 0), 'h:mm a');
    slots.push(`${startTime} - ${endTime}`);
  }

  return slots;
};

interface ConsultationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationOverlay({ isOpen, onClose }: ConsultationOverlayProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { logConsultationBooked, logWhatsappClick } = useAnalytics();

  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement) return;
    const handleScroll = () => setIsScrolled(formElement.scrollTop > 10);
    formElement.addEventListener('scroll', handleScroll);
    return () => formElement.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', contact: '', message: '', date: undefined, timeSlot: '' }
  });

  const selectedFormDate = watch('date');

  useEffect(() => {
    if (selectedFormDate) {
      const newTimeSlots = generateTimeSlots(selectedFormDate);
      if (newTimeSlots.length === 0) setValue('timeSlot', '');
    }
  }, [selectedFormDate, setValue]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setValue('date', date, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      const honeypot = (document.querySelector('input[name="bot-field"]') as HTMLInputElement)?.value || "";
      const cleanPhone = data.contact.replace(/^(\+)?(\d)/, (match, p1, p2) => {
        return p1 ? `${p1}${p2}` : p2;
      }).replace(/\D/g, '');

      const submissionData = {
        name: data.name, phone: cleanPhone, message: data.message,
        consultationDate: data.date.toISOString(), timeSlot: data.timeSlot,
        type: 'consultation', honeypot, createdAt: new Date().toISOString()
      };

      const response = await fetch(
        'https://asia-south1-sciscribe-main.cloudfunctions.net/submitConsultationForm',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submissionData) }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setIsSuccess(true);
      reset();
      logConsultationBooked({ date: data.date.toISOString(), time_slot: data.timeSlot, success: true, service_type: 'general_consultation' });

      const timer = setTimeout(() => {
        onClose();
        setTimeout(() => setIsSuccess(false), 300);
      }, 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ title: 'Submission failed', description: error instanceof Error ? error.message : 'Please try again later', variant: 'destructive' });
      logConsultationBooked({ date: data.date.toISOString(), time_slot: data.timeSlot, success: false, service_type: 'general_consultation', error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectTimeSlot = (slot: string) => setValue('timeSlot', slot, { shouldValidate: true });

  useEffect(() => {
    if (isOpen) { reset(); setSelectedDate(undefined); setIsSuccess(false); }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  // Shared input styles for the dark editorial aesthetic
  const inputClasses = "w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 focus:outline-none transition-colors h-12 px-4 text-sm font-light";
  const labelClasses = "block text-xs font-mono text-white/50 uppercase tracking-wider mb-2";
  const errorClasses = "mt-1.5 text-xs text-red-400/80 font-light";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex flex-col w-full max-w-lg max-h-[90vh] bg-[#0a0a12] border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className={`relative px-8 pt-8 pb-4 transition-all ${isScrolled ? 'border-b border-white/[0.06]' : ''}`}>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-1.5 hover:bg-white/[0.05] transition-colors"
              >
                <X className="h-4 w-4 text-white/40" />
              </button>

              <p className="text-xs tracking-[0.3em] font-mono text-white/40 uppercase mb-3">Consultation</p>
              <h2 className="text-2xl md:text-3xl font-serif text-white font-normal leading-tight">
                Schedule a <em className="italic">Free</em><br />Consultation
              </h2>

              {/* Quick Contact Actions */}
              <div className="flex gap-3 mt-6">
                <a
                  href="tel:+919395582679"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-white transition-all text-sm font-light no-underline"
                >
                  <PhoneCall className="h-4 w-4 text-white/40" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/919395582679"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => { e.stopPropagation(); logWhatsappClick('consultation_overlay'); }}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-white transition-all text-sm font-light no-underline"
                >
                  <MessageCircleMore className="h-4 w-4 text-white/40" />
                  WhatsApp
                </a>
              </div>

              {/* Divider */}
              <div className="relative mt-5 mb-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-white/[0.06]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[#0a0a12] text-xs font-mono text-white/30 tracking-wider">
                    or, <em className="italic font-serif text-white/40 not-italic" style={{ fontStyle: 'italic' }}>fill in your details</em>
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Form */}
            <div ref={formRef} className="flex-1 overflow-y-auto px-8 pb-8 pt-4">
              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center border border-white/10 mb-6">
                    <svg className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif italic text-white mb-3">Request Received</h3>
                  <p className="text-sm font-light text-white/50 mb-8">
                    We&apos;ve received your consultation request and will contact you shortly.
                  </p>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-wider">
                    Closing automatically...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Full Name <span className="text-red-400/60">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      className={`${inputClasses} ${errors.name ? 'border-red-400/40' : ''}`}
                      placeholder="Your name"
                      {...register('name')}
                    />
                    {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact" className={labelClasses}>
                      Phone Number <span className="text-red-400/60">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PhoneCall className="h-3.5 w-3.5 text-white/20" />
                      </div>
                      <Input
                        id="contact"
                        type="tel"
                        className={`${inputClasses} pl-10 ${errors.contact ? 'border-red-400/40' : ''}`}
                        placeholder="+91 93955 82679"
                        {...register('contact', {
                          onChange: (e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            let formattedValue = '';
                            if (value.length > 0) {
                              formattedValue = `+${value.substring(0, 2)}`;
                              if (value.length > 2) formattedValue += ` (${value.substring(2, Math.min(7, value.length))}`;
                              if (value.length > 7) formattedValue += `) ${value.substring(7, Math.min(12, value.length))}`;
                            }
                            e.target.value = formattedValue;
                          }
                        })}
                      />
                    </div>
                    {errors.contact && <p className={errorClasses}>{errors.contact.message}</p>}
                    <p className="mt-1.5 text-xs text-white/25 font-light">
                      Include country code (e.g., +1 for US, +91 for India)
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>
                        Date <span className="text-red-400/60">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={`${inputClasses} flex items-center justify-between text-left ${!selectedDate ? 'text-white/30' : 'text-white/80'}`}
                          >
                            <span>{selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select date'}</span>
                            <CalendarIcon className="h-3.5 w-3.5 text-white/20" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#0a0a12] border border-white/10" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date > addDays(new Date(), 30) ||
                              date.getDay() === 0 ||
                              date.getDay() === 6
                            }
                            initialFocus
                            className="border-0"
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && <p className={errorClasses}>{errors.date.message}</p>}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        Time <span className="text-red-400/60">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            disabled={!selectedDate}
                            className={`${inputClasses} flex items-center justify-between text-left ${!watch('timeSlot') ? 'text-white/30' : 'text-white/80'} ${!selectedDate ? 'opacity-40 cursor-not-allowed' : ''}`}
                          >
                            <span>{watch('timeSlot') || 'Select time'}</span>
                            <Clock className="h-3.5 w-3.5 text-white/20" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-2 bg-[#0a0a12] border border-white/10" align="start">
                          <div className="max-h-[200px] overflow-y-auto space-y-0.5">
                            {timeSlots.length > 0 ? (
                              timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => selectTimeSlot(slot)}
                                  className={`w-full text-left px-3 py-2 text-sm font-light transition-colors ${watch('timeSlot') === slot
                                    ? 'bg-white/[0.08] text-white'
                                    : 'text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                                    }`}
                                >
                                  {slot.split(' - ')[0]}
                                </button>
                              ))
                            ) : (
                              <div className="py-3 text-center text-xs text-white/30 font-light">
                                {selectedDate ? 'No available slots' : 'Select a date first'}
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                      {errors.timeSlot && <p className={errorClasses}>{errors.timeSlot.message}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      How can we help? <span className="text-red-400/60">*</span>
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      className={`${inputClasses} h-auto py-3 resize-none ${errors.message ? 'border-red-400/40' : ''}`}
                      placeholder="Briefly describe what you need help with..."
                      {...register('message')}
                    />
                    {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
                  </div>

                  {/* Honeypot */}
                  <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                    <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-14 flex items-center justify-center gap-2 border border-white/20 bg-white/[0.04] text-white/90 hover:bg-white/[0.08] hover:border-white/30 transition-all text-sm font-light tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={isSubmitting || !selectedDate || timeSlots.length === 0}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Scheduling...
                        </>
                      ) : (
                        <>
                          <CalendarIcon className="h-4 w-4 text-white/40" />
                          {selectedDate
                            ? `Schedule for ${format(selectedDate, 'MMM d, yyyy')}`
                            : 'Select a date to continue'}
                        </>
                      )}
                    </button>
                    {selectedDate && watch('timeSlot') && (
                      <p className="mt-3 text-xs text-center text-white/30 font-mono tracking-wider">
                        {format(selectedDate, 'EEE, MMM d')} at {watch('timeSlot')}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
