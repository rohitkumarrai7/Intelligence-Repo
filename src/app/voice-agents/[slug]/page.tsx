import { redirect } from "next/navigation";

export default function VoiceAgentDetailPage({ params }: { params: { slug: string } }) {
  redirect(`/products/${params.slug}`);
}
