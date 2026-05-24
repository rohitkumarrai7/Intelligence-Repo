import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const authSupabase = createClient(supabaseUrl, supabaseAnonKey);
    const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || req.cookies.get("sb-access-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: { user }, error } = await authSupabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const name = user.user_metadata?.name || user.user_metadata?.full_name || "";
    const email = user.email || "";

    const { error: userError } = await adminSupabase.from("users").upsert({
      id: user.id,
      email,
      name: name || null,
      role: "USER",
    }, { onConflict: "id" });

    if (userError) {
      console.warn("Failed to sync Supabase user row:", userError.message);
    }

    const fallbackWorkflow = {
      workflow_slug: "dental-appointment-booking",
      source: "FREE_SIGNUP",
      granted_at: user.created_at,
      download_count: 0,
    };

    const { data: workflows, error: workflowsError } = await adminSupabase
      .from("user_workflows")
      .select("workflow_slug, source, granted_at, download_count")
      .eq("user_id", user.id)
      .eq("status", "ACTIVE");

    if (workflowsError) {
      console.warn("Falling back to default workflow:", workflowsError.message);
    }

    return NextResponse.json({
      userId: user.id,
      email,
      name,
      workflows: workflowsError || !workflows?.length ? [fallbackWorkflow] : workflows,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
