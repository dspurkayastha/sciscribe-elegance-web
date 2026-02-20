import { useCallback, useMemo } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import { getAnalyticsConsent } from '@/utils/analyticsConsent';

/**
 * Analytics event names
 * These are the custom events we track in Firebase Analytics
 */
export const AnalyticsEvents = {
  CONSULTATION_BOOKED: 'consultation_booked',
  FILE_UPLOADED: 'file_uploaded',
  FORM_SUBMITTED: 'form_submitted',
  WHATSAPP_CLICK: 'whatsapp_click',
  PAGE_VIEW: 'page_view',
  PAYMENT_COMPLETED: 'payment_completed',
  CTA_CLICK: 'cta_click',
} as const;

// Type for all possible event names
type EventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

/**
 * Base interface for all event parameters
 */
interface BaseEventParams {
  user_id?: string;
  timestamp?: number;
  source?: string;
  [key: string]: unknown;
}

/**
 * Event-specific parameter interfaces
 */
interface ConsultationParams extends BaseEventParams {
  service_type: string;
  consultation_id?: string;
}

interface FileUploadParams extends BaseEventParams {
  file_type: string;
  file_size: number;
  file_name?: string;
}

interface FormParams extends BaseEventParams {
  form_id: string;
  form_name: string;
  success: boolean;
  error?: string;
}

interface PaymentParams extends BaseEventParams {
  amount: number;
  currency?: string;
  payment_method?: string;
  transaction_id?: string;
}

interface PageViewParams extends BaseEventParams {
  page_path: string;
  page_title?: string;
}

interface CTAClickParams extends BaseEventParams {
  cta_id: string;
  cta_text: string;
  cta_location: string;
}

// Map event names to their parameter types
interface EventParamsMap {
  [AnalyticsEvents.CONSULTATION_BOOKED]: ConsultationParams;
  [AnalyticsEvents.FILE_UPLOADED]: FileUploadParams;
  [AnalyticsEvents.FORM_SUBMITTED]: FormParams;
  [AnalyticsEvents.WHATSAPP_CLICK]: BaseEventParams;
  [AnalyticsEvents.PAGE_VIEW]: PageViewParams;
  [AnalyticsEvents.PAYMENT_COMPLETED]: PaymentParams;
  [AnalyticsEvents.CTA_CLICK]: CTAClickParams;
}

/**
 * Custom hook for Firebase Analytics integration
 * Provides type-safe event logging functions for the application
 */
export function useAnalytics() {
  // Check if analytics is available (not in development) and user has given consent
  const isAnalyticsAvailable = useMemo(() => {
    return Boolean(analytics) && !import.meta.env.DEV && getAnalyticsConsent();
  }, []);

  /**
   * Generic event logging function with type safety
   */
  const logAnalyticsEvent = useCallback(
    <E extends EventName>(eventName: E, params: EventParamsMap[E]) => {
      if (!isAnalyticsAvailable || !analytics) return;

      try {
        // Cast to any to avoid Firebase Analytics typing issues
        // Firebase's logEvent expects a string for the event name
        logEvent(analytics, eventName as string, {
          ...params,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Analytics Error:', error instanceof Error ? error.message : String(error));
      }
    },
    [isAnalyticsAvailable]
  );

  /**
   * Event-specific logging functions with proper typing
   */
  const logConsultationBooked = useCallback(
    (params: ConsultationParams) => {
      logAnalyticsEvent(AnalyticsEvents.CONSULTATION_BOOKED, params);
    },
    [logAnalyticsEvent]
  );

  const logFileUploaded = useCallback(
    (params: FileUploadParams) => {
      logAnalyticsEvent(AnalyticsEvents.FILE_UPLOADED, params);
    },
    [logAnalyticsEvent]
  );

  const logFormSubmitted = useCallback(
    (params: FormParams) => {
      logAnalyticsEvent(AnalyticsEvents.FORM_SUBMITTED, params);
    },
    [logAnalyticsEvent]
  );

  const logWhatsappClick = useCallback(
    (source?: string) => {
      logAnalyticsEvent(AnalyticsEvents.WHATSAPP_CLICK, { source });
    },
    [logAnalyticsEvent]
  );

  const logPageView = useCallback(
    (path: string) => {
      logAnalyticsEvent(AnalyticsEvents.PAGE_VIEW, {
        page_path: path,
        page_title: document.title,
      });
    },
    [logAnalyticsEvent]
  );

  const logPaymentCompleted = useCallback(
    (params: PaymentParams) => {
      logAnalyticsEvent(AnalyticsEvents.PAYMENT_COMPLETED, params);
    },
    [logAnalyticsEvent]
  );

  const logCtaClick = useCallback(
    (params: CTAClickParams) => {
      logAnalyticsEvent(AnalyticsEvents.CTA_CLICK, params);
    },
    [logAnalyticsEvent]
  );

  return {
    isAnalyticsAvailable,
    logConsultationBooked,
    logFileUploaded,
    logFormSubmitted,
    logWhatsappClick,
    logPageView,
    logPaymentCompleted,
    logCtaClick,
  };
}
