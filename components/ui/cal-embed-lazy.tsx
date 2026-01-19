'use client';

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { Calendar, ExternalLink } from 'lucide-react';

// Dynamically import Cal component with no SSR - only loads when needed
const Cal = dynamic(
  () => import("@calcom/embed-react").then((mod) => mod.default),
  { 
    ssr: false,
  }
);

// Cal.com valid layout types
type BookerLayouts = 'month_view' | 'week_view' | 'column_view';

interface CalConfig {
  layout?: string;
  [key: string]: string | string[] | Record<string, string> | undefined;
}

interface CalEmbedLazyProps {
  namespace?: string;
  calLink?: string;
  config?: CalConfig;
}

const LoadingSkeleton = () => (
  <div className="flex items-center justify-center min-h-[600px] w-full">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      <p className="text-sm font-light text-white/40">Loading calendar...</p>
    </div>
  </div>
);

const ConsentPrompt = ({ onAccept }: { onAccept: () => void; onDecline?: () => void }) => (
  <div className="flex items-center justify-center min-h-[600px] w-full p-8">
    <div className="max-w-lg space-y-6 text-center">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <Calendar size={32} className="text-white/40" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-light tracking-tight text-white">
          Load Booking Calendar
        </h3>
        <p className="text-sm font-light leading-relaxed text-white/60">
          Our booking calendar is powered by Cal.com, which uses third-party cookies for scheduling functionality. 
          These cookies help manage your booking session and preferences.
        </p>
        <p className="text-xs font-light text-white/40">
          Alternatively, you can book directly on Cal.com or contact us via email below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <button
          onClick={onAccept}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black px-6 py-3 text-sm font-light tracking-tight hover:bg-white/90 hover:scale-105 transition-all duration-300"
        >
          Load Calendar
          <Calendar size={16} />
        </button>
        <a
          href="https://cal.com/zynra.studio/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-6 py-3 text-sm font-light tracking-tight hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
        >
          Open on Cal.com
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </div>
);

export default function CalEmbedLazy({ 
  namespace = "30min",
  calLink = "zynra.studio/30min",
  config = { layout: "month_view" }
}: CalEmbedLazyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userConsent, setUserConsent] = useState<boolean | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Check if element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  // Only load Cal.com after user consent
  useEffect(() => {
    if (userConsent === true && !shouldLoad && !isInitialized) {
      setShouldLoad(true);
    }
  }, [userConsent, shouldLoad, isInitialized]);

  useEffect(() => {
    if (!shouldLoad || isInitialized) return;

    // Dynamically import and initialize Cal API only when needed
    const initCal = async () => {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi({ namespace });
        cal("ui", { 
          hideEventTypeDetails: false, 
          layout: (config.layout || "month_view") as BookerLayouts 
        });
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to load Cal.com:", error);
      }
    };

    // Small delay to ensure Cal component is loaded first
    const timer = setTimeout(() => {
      initCal();
    }, 100);

    return () => clearTimeout(timer);
  }, [shouldLoad, isInitialized, namespace, config.layout]);

  const handleAccept = () => {
    setUserConsent(true);
  };

  const handleDecline = () => {
    setUserConsent(false);
  };

  return (
    <div ref={containerRef} className="min-h-[600px] w-full">
      {!isInView ? (
        <LoadingSkeleton />
      ) : userConsent === null ? (
        <ConsentPrompt onAccept={handleAccept} onDecline={handleDecline} />
      ) : userConsent === false ? (
        <div className="flex items-center justify-center min-h-[600px] w-full p-8">
          <div className="max-w-md text-center space-y-4">
            <p className="text-sm font-light text-white/60">
              You can book a meeting directly on Cal.com or reach out via email.
            </p>
            <a
              href="https://cal.com/zynra.studio/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-6 py-3 text-sm font-light tracking-tight hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
            >
              Open on Cal.com
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      ) : shouldLoad ? (
        <Cal
          namespace={namespace}
          calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={config as Record<string, string | string[] | Record<string, string>>}
        />
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}
