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
import { format, addDays, isToday } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  contact: z.string().min(5, { message: 'Please enter a valid email or phone number.' }),
  message: z.string().min(10, { message: 'Please provide more details (min 10 characters).' }),
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Please select a valid date',
  }),
  timeSlot: z.string().min(1, { message: 'Please select a time slot.' })
}).refine(data => {
  // Ensure selected date is not in the past
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
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  const now = new Date();
  
  // If the selected date is today, only show future time slots
  const isCurrentDay = date.toDateString() === now.toDateString();
  const currentHour = now.getHours();
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Skip past hours if it's today
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
  
  // Handle scroll for shadow effect
  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement) return;

    const handleScroll = () => {
      const scrollTop = formElement.scrollTop;
      setIsScrolled(scrollTop > 10);
    };
    
    formElement.addEventListener('scroll', handleScroll);
    
    return () => {
      formElement.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);
  
  // Generate time slots for the selected date
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];
  
  // Format selected date for display
  const formattedDate = selectedDate ? format(selectedDate, 'PPP') : 'Select date';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: '',
      message: '',
      date: undefined,
      timeSlot: ''
    }
  });
  
  // Watch the date field to update time slots when date changes
  const selectedFormDate = watch('date');
  
  // Update time slots when selected date changes
  useEffect(() => {
    if (selectedFormDate) {
      const newTimeSlots = generateTimeSlots(selectedFormDate);
      // If no time slots available for the selected date, clear the time slot
      if (newTimeSlots.length === 0) {
        setValue('timeSlot', '');
      }
    }
  }, [selectedFormDate, setValue]);
  
  // Helper function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue('date', date, { shouldValidate: true });
    }
  }; 
  
  // Navigate between months in the date picker
  const nextMonth = () => {
    // implement next month logic
  };
  
  const prevMonth = () => {
    // implement previous month logic
  }; 
  
  // Format the selected date for display
  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return 'Select a date';
    return format(date, 'MMM d, yyyy');
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  const selectTimeSlot = (slot: string) => {
    setValue('timeSlot', slot, { shouldValidate: true });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex flex-col w-full max-w-md max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            {/* Fixed header with shadow on scroll */}
            <div className={`sticky top-0 z-20 bg-white dark:bg-slate-900 transition-shadow px-6 pt-6 pb-2 ${isScrolled ? 'shadow-sm' : ''}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent dark:from-sciscribe-gold dark:to-amber-300">
                  Schedule a Free Consultation
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Call or text us for an immediate consultation
              </p>
              {/* Quick Action Buttons */}
              <div className="flex gap-3 mt-4">
                {/* Call Us */}
                <div className="relative group flex-1 rounded-lg overflow-hidden">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full px-6 py-6 gap-2 text-base font-medium bg-white/80 dark:bg-slate-800/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20"
                  >
                    <a 
                      href="tel:+919395582679" 
                      onClick={e => e.stopPropagation()} 
                      className="flex items-center justify-center gap-2 no-underline"
                    >
                      <PhoneCall className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="text-red-800 dark:text-red-200">Call Us</span>
                    </a>
                  </Button>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>

                {/* WhatsApp */}
                <div className="relative group flex-1 rounded-lg overflow-hidden">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full px-6 py-6 gap-2 text-base font-medium bg-white/80 dark:bg-slate-800/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <a 
                      href="https://wa.me/919395582679" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={e => e.stopPropagation()} 
                      className="flex items-center justify-center gap-2 no-underline"
                    >
                      <MessageCircleMore className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-800 dark:text-green-200">WhatsApp</span>
                    </a>
                  </Button>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sciscribe-teal/30 to-sciscribe-teal/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </div>
              
              {/* OR Divider */}
              <div className="relative mt-2 mb-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white dark:bg-slate-900 text-sm italic text-slate-500 dark:text-slate-400">
                    Or
                  </span>
                </div>
              </div>
              <div className="relative mt-1 mb-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white dark:bg-slate-900 text-sm text-slate-500 dark:text-slate-400">
                    Fill in your details and we'll get back to you shortly
                  </span>
                </div>
              </div>
            </div>
            {/* Scrollable form content */}
            <div 
              ref={formRef}
              className="flex-1 overflow-y-auto px-6 pb-6 pt-2"
            >
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    We've received your consultation request. Our team will contact you shortly to confirm your time slot.
                  </p>
                  <Button onClick={onClose} className="px-8">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      className={`bg-white/80 dark:bg-slate-800/80 ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email or Phone <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="contact"
                      type="text"
                      className={`bg-white/80 dark:bg-slate-800/80 ${errors.contact ? 'border-red-500' : ''}`}
                      placeholder="your@email.com or +1 (555) 000-0000"
                      {...register('contact')}
                    />
                    {errors.contact && (
                      <p className="mt-1 text-sm text-red-500">{errors.contact.message}</p>
                    )}
                  </div>

                  {/* Date and Time Selection */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Date <span className="text-red-500">*</span>
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-between text-left font-normal h-12 ${
                                !selectedDate ? 'text-slate-500' : ''
                              }`}
                            >
                              {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => 
                                date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                                date > addDays(new Date(), 30) ||
                                date.getDay() === 0 || // Sunday
                                date.getDay() === 6   // Saturday
                              }
                              initialFocus
                              className="border-0"
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.date && (
                          <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Time <span className="text-red-500">*</span>
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={!selectedDate}
                              className="w-full justify-between text-left font-normal h-12"
                            >
                              {watch('timeSlot') || 'Select a time'}
                              <Clock className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-2" align="start">
                            <div className="max-h-[200px] overflow-y-auto">
                              {timeSlots.length > 0 ? (
                                timeSlots.map((slot) => (
                                  <Button
                                    key={slot}
                                    variant="ghost"
                                    onClick={() => selectTimeSlot(slot)}
                                    className={`w-full justify-start ${watch('timeSlot') === slot ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
                                  >
                                    {slot.split(' - ')[0]}
                                  </Button>
                                ))
                              ) : (
                                <div className="py-2 text-center text-sm text-slate-500">
                                  {selectedDate ? 'No available slots' : 'Select a date first'}
                                </div>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                        {errors.timeSlot && (
                          <p className="mt-1 text-sm text-red-500">{errors.timeSlot.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      How can we help you? <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      className={`bg-white/80 dark:bg-slate-800/80 ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Briefly describe what you need help with..."
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="sticky bottom-0 bg-white dark:bg-slate-900 pt-4 pb-2 -mx-6 px-6 border-t border-slate-200 dark:border-slate-800">
                    <Button
                      type="submit"
                      className="w-full h-14 text-base font-semibold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal hover:from-sciscribe-blue/90 hover:to-sciscribe-teal/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isSubmitting || !selectedDate || timeSlots.length === 0}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Scheduling...
                        </>
                      ) : (
                        <>
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          {selectedDate 
                            ? `Schedule for ${format(selectedDate, 'MMM d, yyyy')}`
                            : 'Select a date to continue'}
                        </>
                      )}
                    </Button>
                    {selectedDate && watch('timeSlot') && (
                      <p className="mt-2 text-sm text-center text-slate-500 dark:text-slate-400">
                        Selected: {format(selectedDate, 'EEE, MMM d, yyyy')} at {watch('timeSlot')}
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
