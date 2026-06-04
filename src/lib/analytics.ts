/**
 * Lekki, pluggable tracker zdarzeń.
 *
 * Cel: zmierzyć fake-door test Seller Tools (O1 Q3 2026 — CTR >= 10%).
 * - Jeśli na stronie jest PostHog (window.posthog), wysyła zdarzenie tam.
 * - Zawsze pcha zdarzenie na window.dataLayer (GTM-friendly).
 * - Trzyma lokalny licznik w localStorage, żeby dało się szybko podejrzeć
 *   CTR bez czekania na pełny pipeline analityczny (patrz getLocalFunnel()).
 *
 * Gdy podłączycie PostHog na produkcji, ten plik nie wymaga zmian —
 * wystarczy że window.posthog będzie dostępny.
 */

export type AnalyticsEvent =
  | "seller_tools_page_view"
  | "seller_tools_cta_click"
  | "seller_tools_waitlist_signup";

type Props = Record<string, string | number | boolean | undefined>;

interface PostHogLike {
  capture: (event: string, props?: Props) => void;
}

declare global {
  interface Window {
    posthog?: PostHogLike;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const LOCAL_KEY = "fh_seller_tools_funnel";

function bumpLocalCounter(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    const data: Record<string, number> = raw ? JSON.parse(raw) : {};
    data[event] = (data[event] ?? 0) + 1;
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch {
    /* localStorage niedostępny — ignorujemy */
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;

  const payload = { ...props, ts: Date.now() };

  // 1. PostHog (jeśli jest)
  window.posthog?.capture(event, payload);

  // 2. dataLayer / GTM
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });

  // 3. lokalny licznik do szybkiego podglądu CTR
  bumpLocalCounter(event);

  // 4. log developerski
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload);
  }
}

/** Szybki podgląd lejka fake-door z lokalnego licznika (do debugowania). */
export function getLocalFunnel() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    const data: Record<string, number> = raw ? JSON.parse(raw) : {};
    const views = data["seller_tools_page_view"] ?? 0;
    const clicks = data["seller_tools_cta_click"] ?? 0;
    const signups = data["seller_tools_waitlist_signup"] ?? 0;
    return {
      views,
      clicks,
      signups,
      ctr: views > 0 ? clicks / views : 0,
    };
  } catch {
    return null;
  }
}
