"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getAnalyticsConsent } from "@/utils/analyticsConsent";

/**
 * Tracks page views on route changes using gtag.js
 * Only fires if user has granted analytics consent
 */
export default function PageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!getAnalyticsConsent()) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "page_view", {
                page_path: url,
                page_title: document.title,
            });
        }
    }, [pathname, searchParams]);

    return null;
}
