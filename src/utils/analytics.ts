import { pushCustomEvent } from './gtm';

// Note: Using the Gtag interface from src/types/gtag.d.ts

/**
 * Track an event using Google Tag Manager dataLayer
 * This maintains backward compatibility with the previous gtag implementation
 * while using the new GTM dataLayer approach
 * 
 * @param action The event action (e.g., 'click', 'submit')
 * @param category The event category (e.g., 'engagement', 'conversion')
 * @param label Optional label for the event
 * @param value Optional numeric value for the event
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  // Use the new GTM dataLayer approach
  pushCustomEvent('custom_event', {
    event_action: action,
    event_category: category,
    event_label: label,
    event_value: value,
  });
  
  // Also call gtag directly if it exists (for backward compatibility)
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
