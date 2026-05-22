import { redirect } from "next/navigation";
import { products } from "@/lib/data";

export default function WorkflowDetailPage({ params }: { params: { slug: string } }) {
  redirect(`/products/${params.slug}`);
}
