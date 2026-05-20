import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fbgyotxiniweeygfxgjf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ3lvdHhpbndlZXlnZnhnamYiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY1MjY4ODAwMCwiZXhwIjoxOTY4MjY0MDAwfQ.BEI4h3BSIjT1JbWgzWvKj0vEliHUX3RI4gn6HfDhV2w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProductType = "prompt" | "workflow" | "voice_agent" | "bundle";
export type ProductStatus = "draft" | "published";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ProductType;
  category: string;
  niche: string | null;
  price: number;
  compare_price: number | null;
  status: ProductStatus;
  featured: boolean;
  thumbnail: string | null;
  tags: string[];
  downloads: number;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface Workflow extends Product {
  type: "workflow";
  n8n_json_url: string;
  diagram_image: string;
  apps_integrated: string[];
  setup_time: string;
  step_by_step_guide: string;
  video_tutorial_url: string | null;
  prerequisites: string;
  model_compatibility: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface VoiceAgent extends Product {
  type: "voice_agent";
  demo_audio_urls: string[];
  retell_config_url: string;
  system_prompt_script: string;
  n8n_integration_json_url: string;
  setup_guide_pdf_url: string;
  handles: string[];
  case_study: string;
  before_after_stats: Record<string, string>;
}

export interface Prompt extends Product {
  type: "prompt";
  full_prompt_text: string;
  variables: string[];
  example_output: string;
  usage_instructions: string;
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  icon: string;
  description: string;
  sort_order: number;
};

export type Niche = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
};