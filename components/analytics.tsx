"use client"
import Script from "next/script"

interface AnalyticsProps {
  trackingId: string
}

export function Analytics({ trackingId }: AnalyticsProps) {
  return (
    <>
      {/* Google Analytics */}
      <Script 
        strategy="afterInteractive" 
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} 
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
          `,
        }}
      />
    </>
  )
}
