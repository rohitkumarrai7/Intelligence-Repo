import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const authSupabase = createClient(supabaseUrl, supabaseAnonKey);
    const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: created, error: createError } = await adminSupabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: { name: name || "" },
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    if (!created.user?.id) {
      return NextResponse.json({ error: "Signup failed - no user ID returned" }, { status: 500 });
    }

    const { data: sessionData, error: loginError } = await authSupabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (loginError || !sessionData.session) {
      return NextResponse.json({ error: loginError?.message || "Signup succeeded, but login failed" }, { status: 400 });
    }

    const userId = created.user.id;

    const { error: userError } = await adminSupabase.from("users").upsert({
      id: userId,
      email: normalizedEmail,
      name: name || null,
      role: "USER",
    }, { onConflict: "id" });

    if (userError) {
      console.warn("Failed to create user profile:", userError.message);
    }

    const { error: workflowError } = await adminSupabase.from("user_workflows").insert({
      user_id: userId,
      workflow_slug: "dental-appointment-booking",
      source: "FREE_SIGNUP",
      status: "ACTIVE",
    });

    if (workflowError) {
      console.warn("Failed to grant free dental workflow:", workflowError.message);
    }

    const res = NextResponse.json({ success: true, userId, email: normalizedEmail });
    res.cookies.set("sb-access-token", sessionData.session.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: sessionData.session.expires_in,
    });

    return res;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
