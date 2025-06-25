import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { Oswald, Roboto } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Engineered Success Sales | Sales Training for Blue-Collar Businesses",
  description:
    "Stop losing leads and start closing more deals. Specialized sales training for contractors, real estate agents, auto detailers, and service businesses.",
  keywords: "sales training, contractor sales, real estate sales, business coaching, lead conversion",
  authors: [{ name: "Engineered Success Sales" }],
  openGraph: {
    title: "Engineered Success Sales | Sales Training for Blue-Collar Businesses",
    description:
      "Stop losing leads and start closing more deals. Specialized sales training for contractors, real estate agents, auto detailers, and service businesses.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${roboto.variable}`}>
      <head>
        {/* Google Analytics - Replace G-XXXXXXXXXX with your actual Measurement ID */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'industry_type',
                'custom_parameter_2': 'lead_score'
              }
            });
            
            // Enhanced ecommerce for lead tracking
            gtag('config', 'G-XXXXXXXXXX', {
              custom_map: {'custom_parameter_1': 'lead_value'}
            });
          `}
        </Script>

        {/* Facebook Pixel - Replace YOUR_PIXEL_ID with your actual Pixel ID */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
            
            // Advanced matching for better targeting
            fbq('init', 'YOUR_PIXEL_ID', {
              em: 'hashed_email', // Will be populated when user submits form
              ph: 'hashed_phone', // Will be populated when user submits form
            });
          `}
        </Script>

        {/* Facebook Pixel NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* Tracking Debug Panel - Remove in production */}
        <div
          id="tracking-debug"
          className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50 hidden"
        >
          <h3 className="font-bold mb-2">🔍 Tracking Debug</h3>
          <div id="debug-content"></div>
          <button id="close-debug" className="mt-2 bg-red-600 px-2 py-1 rounded text-xs">
            Close
          </button>
        </div>

        {/* Cookie Consent Banner */}
        <div id="cookie-banner" className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 hidden">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              We use cookies and tracking pixels to improve your experience and for marketing purposes.
              <a href="/privacy" className="underline ml-1">
                Learn more
              </a>
            </p>
            <div className="flex gap-2">
              <button id="accept-cookies" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                Accept All
              </button>
              <button id="reject-cookies" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Test & Debug Script */}
        <Script id="tracking-debug-script" strategy="afterInteractive">
          {`
            // Debug panel functionality
            let debugPanel = document.getElementById('tracking-debug');
            let debugContent = document.getElementById('debug-content');
            
            // Show debug panel with Ctrl+Shift+D
            document.addEventListener('keydown', function(e) {
              if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                debugPanel.classList.toggle('hidden');
                updateDebugInfo();
              }
            });
            
            document.getElementById('close-debug')?.addEventListener('click', function() {
              debugPanel.classList.add('hidden');
            });
            
            function updateDebugInfo() {
              let info = [];
              
              // Check Google Analytics
              if (typeof gtag !== 'undefined') {
                info.push('✅ Google Analytics loaded');
              } else {
                info.push('❌ Google Analytics not loaded');
              }
              
              // Check Facebook Pixel
              if (typeof fbq !== 'undefined') {
                info.push('✅ Facebook Pixel loaded');
              } else {
                info.push('❌ Facebook Pixel not loaded');
              }
              
              // Check cookies
              let cookiesAccepted = localStorage.getItem('cookies-accepted');
              info.push('🍪 Cookies: ' + (cookiesAccepted || 'not set'));
              
              // Check visitor data
              let visitorData = localStorage.getItem('ess_visitor_data');
              if (visitorData) {
                try {
                  let data = JSON.parse(visitorData);
                  info.push('👤 Visits: ' + (data.totalVisits || 0));
                  info.push('📊 Lead Score: ' + (data.leadScore || 0));
                } catch(e) {
                  info.push('❌ Visitor data corrupted');
                }
              } else {
                info.push('👤 No visitor data');
              }
              
              debugContent.innerHTML = info.join('<br>');
            }
            
            // Cookie banner functionality
            if (!localStorage.getItem('cookies-accepted')) {
              document.getElementById('cookie-banner').classList.remove('hidden');
            }

            document.getElementById('accept-cookies')?.addEventListener('click', function() {
              localStorage.setItem('cookies-accepted', 'true');
              document.getElementById('cookie-banner').classList.add('hidden');
              
              // Enable tracking
              if (typeof fbq !== 'undefined') {
                fbq('consent', 'grant');
                console.log('✅ Facebook Pixel consent granted');
              }
              if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted'
                });
                console.log('✅ Google Analytics consent granted');
              }
            });

            document.getElementById('reject-cookies')?.addEventListener('click', function() {
              localStorage.setItem('cookies-accepted', 'false');
              document.getElementById('cookie-banner').classList.add('hidden');
              
              // Disable tracking
              if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied'
                });
                console.log('❌ Google Analytics consent denied');
              }
            });
            
            // Test tracking functions
            window.testTracking = function() {
              console.log('🧪 Testing tracking...');
              
              // Test Google Analytics
              if (typeof gtag !== 'undefined') {
                gtag('event', 'test_event', {
                  event_category: 'testing',
                  event_label: 'manual_test',
                  value: 1
                });
                console.log('✅ Google Analytics test event sent');
              }
              
              // Test Facebook Pixel
              if (typeof fbq !== 'undefined') {
                fbq('track', 'CustomEvent', {
                  event_name: 'test_event',
                  content_name: 'tracking_test'
                });
                console.log('✅ Facebook Pixel test event sent');
              }
              
              alert('Tracking test completed! Check browser console for details.');
            };
            
            // Auto-test on page load (after 3 seconds)
            setTimeout(function() {
              console.log('🚀 ESS Tracking System Initialized');
              console.log('📊 Use Ctrl+Shift+D to open debug panel');
              console.log('🧪 Use testTracking() in console to test events');
            }, 3000);
          `}
        </Script>
      </body>
    </html>
  )
}
