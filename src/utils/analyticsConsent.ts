/**
 * Analytics consent management utilities
 */

export const COOKIE_CONSENT_KEY = 'cookie_consent_given';
export const ANALYTICS_CONSENT_KEY = 'analytics_consent';

/**
 * Check if user has given consent for analytics
 */
export const getAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'granted';
};

/**
 * Set analytics consent status
 */
export const setAnalyticsConsent = (granted: boolean): void => {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
  localStorage.setItem(ANALYTICS_CONSENT_KEY, granted ? 'granted' : 'denied');
};
