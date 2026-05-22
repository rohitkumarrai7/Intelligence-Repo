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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name || "" },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Signup failed — no user ID returned" }, { status: 500 });
    }

    const { error: userError } = await supabase.from("users").upsert({
      id: userId,
      email,
      name: name || null,
      role: "USER",
    }, { onConflict: "id" });

    if (userError) {
      console.error("Failed to insert user row:", userError);
    }

    const { error: wfError } = await supabase.from("user_workflows").insert({
      user_id: userId,
      email,
      workflow_slug: "dental-appointment-booking",
      source: "FREE_SIGNUP",
      status: "ACTIVE",
    });

    if (wfError) {
      console.error("Failed to grant free dental workflow:", wfError);
    }

    return NextResponse.json({
      success: true,
      userId,
      message: "Account created! Dental workflow granted.",
      freeWorkflow: {
        slug: "dental-appointment-booking",
        name: "Dental Clinic Appointment Booking Bot",
        downloadUrl: "/workflow/json/dental-booking-production.json",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
