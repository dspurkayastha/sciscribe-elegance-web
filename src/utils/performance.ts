/**
 * Performance optimization utilities for Core Web Vitals
 * Helps improve LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift)
 */

// Type for analytics data
type WebVitalsData = {
  event_category: string;
  event_label: string;
  value: number;
  non_interaction: boolean;
};

/**
 * Marks the start of LCP measurement
 * Call this as early as possible in your application
 */
export const markLCPStart = (): void => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Create a performance mark for LCP start
    performance.mark('lcp-start');
  }
};

/**
 * Marks the end of LCP measurement when the largest contentful paint occurs
 * This helps track LCP performance in analytics
 */
export const observeLCP = (): void => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Create a new PerformanceObserver to observe LCP events
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      // Mark LCP end and measure the time
      if (lastEntry) {
        performance.mark('lcp-end');
        performance.measure('lcp', 'lcp-start', 'lcp-end');
        
        // Log LCP time to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`LCP: ${lastEntry.startTime}ms`);
        }
        
        // Send to analytics in production
        if (process.env.NODE_ENV === 'production' && 'gtag' in window) {
          // Create analytics data
          const analyticsData: WebVitalsData = {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
            non_interaction: true,
          };
          
          // Send to Google Analytics
          try {
            // Access gtag safely without TypeScript errors
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const win = window as {gtag?: (...args: any[]) => void};
            if (typeof win.gtag === 'function') {
              win.gtag('event', 'web_vitals', analyticsData);
            }
          } catch (error) {
            console.error('Failed to send web vitals to analytics:', error);
          }
        }
      }
      
      // Disconnect observer after first LCP
      lcpObserver.disconnect();
    });
    
    // Start observing LCP events
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  }
};

/**
 * Initializes performance monitoring
 * Call this in your main application entry point
 */
export const initPerformanceMonitoring = (): void => {
  markLCPStart();
  observeLCP();
  
  // Add additional performance monitoring as needed
};

export default initPerformanceMonitoring;
