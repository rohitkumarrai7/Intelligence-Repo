"use client";

declare global {
  interface Window {
    fbq?: (
      action: "track",
      eventName: "InitiateCheckout" | "Purchase",
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
  }
}

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

export const generateClientEventId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const getMetaBrowserIds = () => ({
  fbp: getCookie("_fbp"),
  fbc: getCookie("_fbc"),
});

type TrackParams = {
  eventId: string;
  value: number;
  currency?: string;
  contentName: string;
  contentIds: string[];
};

export const trackInitiateCheckout = (params: TrackParams) => {
  if (!window.fbq) return;
  window.fbq(
    "track",
    "InitiateCheckout",
    {
      value: params.value,
      currency: params.currency || "USD",
      content_name: params.contentName,
      content_ids: params.contentIds,
      content_type: "product",
    },
    { eventID: params.eventId }
  );
};

export const trackPurchase = (params: TrackParams) => {
  if (!window.fbq) return;
  window.fbq(
    "track",
    "Purchase",
    {
      value: params.value,
      currency: params.currency || "USD",
      content_name: params.contentName,
      content_ids: params.contentIds,
      content_type: "product",
    },
    { eventID: params.eventId }
  );
};
