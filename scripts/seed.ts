import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fbgyotxiniweeygfxgjf.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ3lvdHhpbndlZXlnZnhnamYiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjUyNjg4MDAwLCJleHAiOjE5NjgyNjQwMDB9.PpgL3iEUUiKtWKR5JQJBi1POAxx6m5gBF8GjDPN3Z8w";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const products = [
  { title: "Plumber Voice Agent", slug: "plumber-voice-agent", type: "VOICE_AGENT", category: "Voice Agents", niche: "Plumbing", price: 2900, description: "AI voice agent that answers emergency plumbing calls 24/7, captures lead info, and dispatches technicians.", tags: ["voice", "plumbing", "lead-capture"] },
  { title: "Dental Appointment Booking", slug: "dental-appointment-booking", type: "VOICE_AGENT", category: "Voice Agents", niche: "Dental", price: 2900, description: "Voice-powered booking agent for dental clinics with SMS confirmations and insurance capture.", tags: ["voice", "dental", "booking"] },
  { title: "Real Estate Lead Qualification", slug: "real-estate-lead-qualification", type: "VOICE_AGENT", category: "Voice Agents", niche: "Real Estate", price: 2900, description: "Voice agent that qualifies leads by budget, timeline, and pre-approval status.", tags: ["voice", "real-estate", "crm"] },
  { title: "Restaurant WhatsApp Order", slug: "restaurant-whatsapp-order", type: "VOICE_AGENT", category: "Voice Agents", niche: "Restaurant", price: 2900, description: "WhatsApp bot that takes orders, calculates totals, and sends confirmations.", tags: ["whatsapp", "restaurant", "ordering"] },
  { title: "HVAC Emergency Dispatch", slug: "hvac-emergency-dispatch", type: "VOICE_AGENT", category: "Voice Agents", niche: "HVAC", price: 2900, description: "Emergency classification and auto-dispatch for HVAC service calls.", tags: ["voice", "hvac", "emergency"] },
  { title: "Cleaning Service Quote", slug: "cleaning-service-quote", type: "WORKFLOW", category: "Workflows", niche: "Cleaning", price: 2900, description: "Quote calculator that prices cleaning services based on sqft, rooms, and extras.", tags: ["workflow", "cleaning", "quote"] },
  { title: "Fitness Coach Follow-Up", slug: "fitness-coach-followup", type: "WORKFLOW", category: "Workflows", niche: "Fitness", price: 2900, description: "Automated client follow-up based on workout gaps and membership status.", tags: ["workflow", "fitness", "sms"] },
  { title: "Content Repurposing", slug: "content-repurposing", type: "WORKFLOW", category: "Workflows", niche: "Marketing", price: 2900, description: "Transform one blog post into Twitter, LinkedIn, Instagram, and TikTok content.", tags: ["workflow", "content", "gemini"] },
  { title: "Lead Magnet Generator", slug: "lead-magnet-generator", type: "WORKFLOW", category: "Workflows", niche: "Marketing", price: 2900, description: "AI-powered lead magnet content generator for any topic.", tags: ["workflow", "lead-magnet", "gemini"] },
  { title: "Meeting Summarizer", slug: "meeting-summarizer", type: "WORKFLOW", category: "Workflows", niche: "Business", price: 2900, description: "Extract decisions, action items, and sentiment from meeting notes.", tags: ["workflow", "meetings", "gemini"] },
  { title: "Cold Email Personalizer", slug: "cold-email-personalizer", type: "WORKFLOW", category: "Workflows", niche: "Marketing", price: 2900, description: "Hyper-personalized cold email generator from LinkedIn data.", tags: ["workflow", "email", "gemini"] },
  { title: "Support Ticket Router", slug: "support-ticket-router", type: "WORKFLOW", category: "Workflows", niche: "Support", price: 2900, description: "AI-powered ticket classification and auto-resolution.", tags: ["workflow", "support", "ai"] },
  { title: "Competitor Price Monitor", slug: "competitor-price-monitor", type: "WORKFLOW", category: "Workflows", niche: "Business", price: 2900, description: "Competitor price monitoring with AI trend analysis.", tags: ["workflow", "price", "scraping"] },
  { title: "Resume Screening", slug: "resume-screening", type: "WORKFLOW", category: "Workflows", niche: "HR", price: 2900, description: "AI-powered candidate screening and interview question generation.", tags: ["workflow", "hr", "gemini"] },
  { title: "Social Comment Responder", slug: "social-comment-responder", type: "WORKFLOW", category: "Workflows", niche: "Marketing", price: 2900, description: "Auto-generate on-brand replies to social media comments.", tags: ["workflow", "social", "gemini"] },
];

async function seedProducts() {
  console.log("Seeding products...");

  for (const product of products) {
    const { data, error } = await supabase
      .from("products")
      .upsert(
        {
          slug: product.slug,
          title: product.title,
          description: product.description,
          type: product.type,
          category: product.category,
          niche: product.niche,
          price: product.price,
          status: "PUBLISHED",
          featured: false,
          tags: product.tags,
          downloads: Math.floor(Math.random() * 100),
          rating: 4 + Math.random(),
          review_count: Math.floor(Math.random() * 50),
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) {
      console.error(`Error seeding ${product.title}:`, error);
    } else {
      console.log(`Seeded: ${product.title}`);
    }
  }

  console.log("Done!");
}

seedProducts().catch(console.error);