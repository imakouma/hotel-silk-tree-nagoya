"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type AnalyticsTrackerProps = {
  siteId: string;
};

function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/(ipad|tablet|kindle|silk)/.test(userAgent)) {
    return "tablet";
  }

  if (/(mobi|iphone|android)/.test(userAgent)) {
    return "mobile";
  }

  return "desktop";
}

export default function AnalyticsTracker({ siteId }: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const endpoint =
      process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ||
      (window.location.hostname === "localhost"
        ? "http://localhost:4000/api/events"
        : undefined);
    const resolvedSiteId = process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID || siteId;

    if (!endpoint || !resolvedSiteId || !pathname) {
      return;
    }

    const currentUrl = new URL(window.location.href);
    const path = `${pathname}${currentUrl.search}`;
    const eventKey = `${resolvedSiteId}:${path}`;

    if (lastTracked.current === eventKey) {
      return;
    }

    lastTracked.current = eventKey;

    const payload = JSON.stringify({
      siteId: resolvedSiteId,
      path,
      title: document.title,
      referrer: document.referrer || undefined,
      language: navigator.language,
      source: currentUrl.searchParams.get("source") || undefined,
      device: detectDevice(),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        endpoint,
        new Blob([payload], { type: "text/plain;charset=UTF-8" }),
      );
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
      mode: "cors",
    }).catch(() => {
      // Analytics should never interrupt the hotel guide UI.
    });
  }, [pathname, siteId]);

  return null;
}
