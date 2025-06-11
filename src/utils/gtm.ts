// Google Tag Manager utilities

// Define the GTM dataLayer item type
type DataLayerItem = {
  [key: string]: unknown;
  event?: string;
};

// Define the window dataLayer
declare global {
  interface Window {
    dataLayer?: DataLayerItem[];
  }
}

/**
 * Initialize the dataLayer array if it doesn't exist
 */
export const initDataLayer = (): void => {
  window.dataLayer = window.dataLayer || [];
};

/**
 * Push an event to the dataLayer
 * @param event The event object to push to the dataLayer
 */
export const pushEvent = (event: DataLayerItem): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }
};

/**
 * Push a page view event to the dataLayer
 * @param path The page path
 * @param title The page title
 */
export const pushPageView = (path: string, title: string): void => {
  pushEvent({
    event: 'page_view',
    page: {
      path,
      title
    }
  });
};

/**
 * Push a custom event to the dataLayer
 * @param eventName The name of the event
 * @param eventParams Additional parameters for the event
 */
export const pushCustomEvent = (eventName: string, eventParams: Record<string, unknown> = {}): void => {
  pushEvent({
    event: eventName,
    ...eventParams
  });
};
