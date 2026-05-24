import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const email = searchParams.get("email");

    if (!slug || !email) {
      return NextResponse.json({ error: "Missing slug or email" }, { status: 400 });
    }

    const { data: fileRecord, error: fileError } = await supabase
      .from("codebase_files")
      .select("*")
      .eq("product_slug", slug)
      .single();

    if (fileError || !fileRecord) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const { data: purchase, error: purchaseError } = await supabase
      .from("purchased_codebases")
      .select("*")
      .eq("product_slug", slug)
      .eq("email", email)
      .eq("status", "ACTIVE")
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: "Purchase not verified" }, { status: 403 });
    }

    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("codebases")
      .createSignedUrl(fileRecord.storage_path, 3600, {
        download: true,
      });

    if (urlError || !signedUrlData) {
      return NextResponse.json({ error: "Failed to generate download link" }, { status: 500 });
    }

    await supabase
      .from("purchased_codebases")
      .update({
        download_count: purchase.download_count + 1,
        last_downloaded_at: new Date().toISOString(),
      })
      .eq("id", purchase.id);

    await supabase
      .from("codebase_files")
      .update({
        download_count: fileRecord.download_count + 1,
      })
      .eq("id", fileRecord.id);

    return NextResponse.json({
      downloadUrl: signedUrlData.signedUrl,
      fileName: fileRecord.file_name,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
