import { createHash, randomUUID } from "crypto";

type MetaUserData = {
  em?: string;
  ph?: string;
  external_id?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
};

type MetaCustomData = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
};

type SendMetaEventParams = {
  eventName: "InitiateCheckout" | "Purchase";
  eventId: string;
  eventSourceUrl: string;
  userData: MetaUserData;
  customData?: MetaCustomData;
  testEventCode?: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const sha256 = (value: string) =>
  createHash("sha256").update(value, "utf8").digest("hex");

const hashIfPresent = (value?: string, normalizer: (v: string) => string = normalize) => {
  if (!value) return undefined;
  const normalized = normalizer(value);
  if (!normalized) return undefined;
  return sha256(normalized);
};

export const generateEventId = () => randomUUID();

export async function sendMetaConversionEvent(params: SendMetaEventParams) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return;

  const user_data: Record<string, unknown> = {
    client_ip_address: params.userData.client_ip_address,
    client_user_agent: params.userData.client_user_agent,
    fbp: params.userData.fbp,
    fbc: params.userData.fbc,
    external_id: hashIfPresent(params.userData.external_id),
    em: hashIfPresent(params.userData.em),
    ph: hashIfPresent(params.userData.ph, onlyDigits),
  };

  const payload = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        action_source: "website",
        event_source_url: params.eventSourceUrl,
        user_data,
        custom_data: params.customData,
      },
    ],
    test_event_code: params.testEventCode,
  };

  const response = await fetch(`https://graph.facebook.com/v22.0/${pixelId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      access_token: accessToken,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Meta CAPI error:", errorText);
  }
}
