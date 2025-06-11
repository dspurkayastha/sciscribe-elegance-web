import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { COOKIE_CONSENT_KEY, setAnalyticsConsent } from '@/utils/analyticsConsent';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6',
        'bg-slate-800/95 dark:bg-sciscribe-navy/95 backdrop-blur-md text-white',
        'border-t border-slate-700 dark:border-sciscribe-mist/20 shadow-2xl'
      )}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-200 dark:text-slate-300">
          We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies. You can learn more in our{' '}
          <a href="/privacy-policy" className="font-semibold underline hover:text-sciscribe-gold transition-colors">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white dark:border-sciscribe-mist/30 dark:text-slate-300 dark:hover:bg-sciscribe-mist/20 dark:hover:text-white"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-sciscribe-gold text-sciscribe-navy hover:bg-sciscribe-gold/90 dark:bg-sciscribe-gold dark:text-sciscribe-navy dark:hover:bg-sciscribe-gold/90"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
