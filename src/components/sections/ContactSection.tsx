import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircleMore
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const honeypot = (
      document.querySelector(
        'input[name="bot-field"]'
      ) as HTMLInputElement
    )?.value || "";

    try {
      await fetch(
        "https://asia-south1-sciscribe-main.cloudfunctions.net/submitQuickContactForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            honeypot
          })
        }
      );

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible."
      });

      setIsSuccess(true);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-4xl font-bold text-foreground">
              Thank You!
            </h2>
            <p className="mb-8 text-lg text-foreground/80">
              We've received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="btn-hover rounded-lg bg-sciscribe-navy 
                dark:bg-primary px-6 py-3 font-medium text-white 
                transition-all hover:bg-sciscribe-navy/90 
                dark:hover:bg-primary/90"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-foreground">
            Contact Us
          </h2>
          <p className="mb-12 text-lg text-foreground/80">
            Have questions about our services? We're here to help.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 
          lg:grid-cols-2"
        >
          {/* Contact Info Panel */}
          <div className="animate-slide-in rounded-lg bg-sciscribe-light 
            dark:bg-card p-8"
          >
            <h3 className="mb-6 text-2xl font-bold text-foreground">
              Get in Touch
            </h3>

            <div className="mb-8 space-y-6">
              <ContactItem
                icon={<Mail size={20} />}
                title="Email"
                lines={[
                  "contact@sciscribesolutions.com",
                  "support@sciscribesolutions.com"
                ]}
              />
              <ContactItem
                icon={<Phone size={20} />}
                title="Phone"
                lines={["+91 9395582679"]}
                extra={
                  <a
                    href="https://api.whatsapp.com/message/XMKZUS2MJHUBG1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-foreground/70 
                      hover:text-sciscribe-gold transition-colors mt-1"
                  >
                    <MessageCircleMore size={16} className="mr-1" />
                    <span>WhatsApp</span>
                  </a>
                }
              />
              <ContactItem
                icon={<MapPin size={20} />}
                title="Location"
                lines={["Hazra Road", "Kolkata, India"]}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in rounded-lg bg-white 
            dark:bg-card p-8 shadow-md"
          >
            <h3 className="mb-6 text-2xl font-bold text-foreground">
              Send us a Message
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              autoComplete="off"
            >
              <input
                type="hidden"
                name="form-name"
                value="contact"
              />
              <p style={{ display: "none" }} aria-hidden="true">
                <label>
                  Don't fill this out if you're human:
                  <input
                    name="bot-field"
                    autoComplete="off"
                  />
                </label>
              </p>

              <InputField
                id="name"
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                id="email"
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextareaField
                id="message"
                label="Your Message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-hover w-full rounded-lg bg-sciscribe-navy 
                  dark:bg-primary px-6 py-3 font-medium text-white 
                  transition-all hover:bg-sciscribe-navy/90 
                  dark:hover:bg-primary/90 mb-4"
              >
                Send Message
              </button>

              <div className="text-center">
                <Link
                  to="/contact"
                  className="text-sciscribe-gold hover:text-sciscribe-gold/80 
                    font-medium"
                >
                  Want a full quote? Send us more details →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({
  icon,
  title,
  lines,
  extra
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  extra?: React.ReactNode;
}) => (
  <div className="flex items-start">
    <div className="mr-4 flex h-10 w-10 items-center justify-center 
      rounded-lg bg-white dark:bg-sciscribe-navy/30 text-foreground"
    >
      {icon}
    </div>
    <div>
      <p className="font-medium text-foreground">{title}</p>
      {lines.map((line, i) => (
        <p key={i} className="text-foreground/70">
          {line}
        </p>
      ))}
      {extra}
    </div>
  </div>
);

const InputField = ({
  id,
  label,
  type,
  value,
  onChange
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full rounded-lg border border-gray-200 p-3 
        focus:border-sciscribe-gold focus:outline-none 
        focus:ring-2 focus:ring-sciscribe-gold/20 
        dark:bg-sciscribe-navy/30 dark:border-sciscribe-navy/50"
    />
  </div>
);

const TextareaField = ({
  id,
  label,
  value,
  onChange
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      rows={5}
      className="w-full rounded-lg border border-gray-200 p-3 
        focus:border-sciscribe-gold focus:outline-none 
        focus:ring-2 focus:ring-sciscribe-gold/20 
        dark:bg-sciscribe-navy/30 dark:border-sciscribe-navy/50"
    ></textarea>
  </div>
);

export default ContactSection;
