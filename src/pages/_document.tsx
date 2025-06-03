import React from 'react';
import { Helmet } from 'react-helmet-async';

type DocumentProps = {
  children: React.ReactNode;
  styles?: React.ReactElement[];
};

export const Document: React.FC<DocumentProps> = ({ children, styles }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#6366F1" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MVG24STSTN"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MVG24STSTN');
          `}
        </script>

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS */}
        <style>
          {`
            /* Load Inter from Google Fonts CDN */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            
            /* Critical CSS for above-the-fold content */
            html, body, #root {
              margin: 0;
              padding: 0;
              width: 100%;
              min-height: 100%;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            }
            
            * {
              box-sizing: border-box;
            }
          `}
        </style>
        
        {styles}
      </Helmet>
      {children}
    </>
  );
};

export default Document;
