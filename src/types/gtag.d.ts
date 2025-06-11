type GtagConfigParams = {
  debug_mode?: boolean;
  send_page_view?: boolean;
  transport_type?: string;
  [key: string]: unknown;
};

type GtagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

interface Gtag {
  (command: 'config', targetId: string, config?: GtagConfigParams): void;
  (command: 'event', action: string, params?: GtagEventParams): void;
  (command: 'js', date: Date): void;
  (command: 'set', params: { [key: string]: unknown }): void;
}

interface Window {
  gtag?: Gtag;
  dataLayer?: Array<{
    event?: string;
    [key: string]: unknown;
  }>;
}
