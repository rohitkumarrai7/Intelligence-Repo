-- ============================================
-- Intelligence Repo - Full Seed Data
-- Run after supabase-setup.sql
-- ============================================

-- ============================================
-- INSERT ALL PRODUCTS (Voice Agents + Workflows + 8 Codebases)
-- ============================================

INSERT INTO products (slug, title, description, type, category, niche, price, status, tags, rating, review_count, compare_price) VALUES

-- Voice Agents (1-7)
('plumber-voice-agent', 'Plumber Voice Agent', 'AI voice agent that answers emergency plumbing calls 24/7, captures lead info, and dispatches technicians automatically.', 'VOICE_AGENT', 'Voice Agents', 'Plumbing', 2900, 'PUBLISHED', ARRAY['voice', 'plumbing', 'lead-capture', 'retell'], 5.0, 12, NULL),
('dental-appointment-booking', 'Dental Appointment Booking', 'Voice-powered booking agent for dental clinics with SMS confirmations and insurance capture.', 'VOICE_AGENT', 'Voice Agents', 'Dental', 2900, 'PUBLISHED', ARRAY['voice', 'dental', 'booking', 'cal.com'], 5.0, 8, NULL),
('real-estate-lead-qualification', 'Real Estate Lead Qualification', 'Voice agent that qualifies leads by budget, timeline, and pre-approval status with CRM sync.', 'VOICE_AGENT', 'Voice Agents', 'Real Estate', 2900, 'PUBLISHED', ARRAY['voice', 'real-estate', 'crm', 'lead-scoring'], 4.8, 15, NULL),
('restaurant-whatsapp-order', 'Restaurant WhatsApp Order', 'WhatsApp bot that takes orders, calculates totals, and sends order confirmations.', 'VOICE_AGENT', 'Voice Agents', 'Restaurant', 2900, 'PUBLISHED', ARRAY['whatsapp', 'restaurant', 'ordering', 'orders'], 5.0, 22, NULL),
('hvac-emergency-dispatch', 'HVAC Emergency Dispatch', 'Emergency classification and auto-dispatch for HVAC service calls with technician notification.', 'VOICE_AGENT', 'Voice Agents', 'HVAC', 2900, 'PUBLISHED', ARRAY['voice', 'hvac', 'emergency', 'dispatch'], 5.0, 7, NULL),
('cleaning-service-quote', 'Cleaning Service Quote', 'Automated quote calculator that prices cleaning services based on sqft, rooms, and extras.', 'WORKFLOW', 'Voice Agents', 'Cleaning', 2900, 'PUBLISHED', ARRAY['workflow', 'cleaning', 'quote', 'resend'], 4.9, 19, NULL),
('fitness-coach-followup', 'Fitness Coach Follow-Up', 'Automated client follow-up based on workout gaps, membership status, and personalized messaging.', 'WORKFLOW', 'Voice Agents', 'Fitness', 2900, 'PUBLISHED', ARRAY['workflow', 'fitness', 'sms', 'twilio'], 5.0, 11, NULL),

-- AI Marketing Pack (8-10)
('content-repurposing', 'Content Repurposing', 'Transform one blog post into Twitter threads, LinkedIn posts, Instagram captions, and TikTok scripts.', 'WORKFLOW', 'Workflows', 'Marketing', 2900, 'PUBLISHED', ARRAY['workflow', 'content', 'gemini', 'social-media'], 4.9, 34, NULL),
('lead-magnet-generator', 'Lead Magnet Generator', 'AI-powered lead magnet content generator for any topic, industry, or audience.', 'WORKFLOW', 'Workflows', 'Marketing', 2900, 'PUBLISHED', ARRAY['workflow', 'lead-magnet', 'gemini', 'content'], 4.8, 28, NULL),
('cold-email-personalizer', 'Cold Email Personalizer', 'Hyper-personalized cold email generator from LinkedIn data with multi-variant output.', 'WORKFLOW', 'Workflows', 'Marketing', 2900, 'PUBLISHED', ARRAY['workflow', 'email', 'gemini', 'hunter.io'], 4.7, 16, NULL),

-- Business Operations (11-15)
('meeting-summarizer', 'Meeting Summarizer', 'Extract decisions, action items with owners and deadlines, and sentiment from meeting notes.', 'WORKFLOW', 'Workflows', 'Business', 2900, 'PUBLISHED', ARRAY['workflow', 'meetings', 'gemini', 'action-items'], 5.0, 45, NULL),
('support-ticket-router', 'Support Ticket Router', 'AI-powered ticket classification, auto-resolution, and intelligent routing to teams.', 'WORKFLOW', 'Workflows', 'Support', 2900, 'PUBLISHED', ARRAY['workflow', 'support', 'ai', 'classification'], 4.9, 21, NULL),
('competitor-price-monitor', 'Competitor Price Monitor', 'Competitor price monitoring every 6 hours with AI trend analysis and Slack alerts.', 'WORKFLOW', 'Workflows', 'Business', 2900, 'PUBLISHED', ARRAY['workflow', 'price', 'scraping', 'slack'], 4.6, 9, NULL),
('resume-screening', 'Resume Screening', 'AI-powered candidate screening with match scoring, skills analysis, and interview questions.', 'WORKFLOW', 'Workflows', 'HR', 2900, 'PUBLISHED', ARRAY['workflow', 'hr', 'gemini', 'hiring'], 5.0, 33, NULL),
('social-comment-responder', 'Social Comment Responder', 'Auto-generate on-brand replies to social media comments with sentiment detection.', 'WORKFLOW', 'Workflows', 'Marketing', 2900, 'PUBLISHED', ARRAY['workflow', 'social', 'gemini', 'automation'], 4.8, 27, NULL),

-- ═══════════════════════════════════════
-- CODEBASES (8 products)
-- ═══════════════════════════════════════
('tars-conversa-ai-livechat', 'TARS-CONVERSA — AI LiveChat Engine', 'Production-grade real-time conversational AI platform with WebSocket-driven bi-directional communication and context-aware LLM orchestration for sub-200ms response latency.', 'WORKFLOW', 'Codebases', 'Development', 7900, 'PUBLISHED', ARRAY['codebase', 'react', 'websocket', 'openai', 'livechat'], 5.0, 27, 12900),
('finflock-algorithmic-trading', 'Finflock — Algorithmic Trading Engine', 'Institutional-grade quantitative finance toolkit automating the full algorithmic trading pipeline from data ingestion to backtesting with 20+ technical indicators.', 'WORKFLOW', 'Codebases', 'Sales', 9700, 'PUBLISHED', ARRAY['codebase', 'python', 'pandas', 'trading', 'backtesting'], 5.0, 19, 14900),
('gmaps-scraper-ai-outreach', 'GMaps Scraper — AI Cold Outreach Engine', 'Enterprise-grade lead generation combining high-throughput Google Maps business data extraction with LLM-powered hyper-personalized cold email generation on Flask.', 'WORKFLOW', 'Codebases', 'Sales', 12700, 'PUBLISHED', ARRAY['codebase', 'flask', 'python', 'gemini', 'scraper'], 5.0, 23, 19700),
('hashtric-marketing-intelligence', 'Hashtric — Marketing Intelligence OS', 'Full-stack marketing intelligence OS compressing the entire paid advertising lifecycle from trending topic discovery to live ad deployment in under 60 seconds with cross-platform attribution.', 'WORKFLOW', 'Codebases', 'Marketing', 19700, 'PUBLISHED', ARRAY['codebase', 'next.js', 'meta-ads', 'google-ads', 'attribution'], 5.0, 14, 29700),
('jobify-universal-ats-extension', 'Jobify — Universal ATS Chrome Extension', 'Manifest V3 Chrome extension unifying multi-platform recruitment into a single ATS command center aggregating candidates from LinkedIn, Naukri, Indeed & Internshala.', 'WORKFLOW', 'Codebases', 'HR', 9700, 'PUBLISHED', ARRAY['codebase', 'chrome-extension', 'react', 'ats', 'recruitment'], 5.0, 31, 14900),
('autostream-social-lead-agent', 'AutoStream — Social-to-Lead AI Agent', 'Production-ready autonomous lead capture agent built on LangGraph stateful orchestration with FAISS-powered RAG for context-grounded conversations.', 'WORKFLOW', 'Codebases', 'Sales', 14700, 'PUBLISHED', ARRAY['codebase', 'langgraph', 'faiss', 'python', 'rag'], 5.0, 16, 21700),
('resumod-ats-optimizer-extension', 'Resumod — ATS Resume Optimizer Extension', 'Manifest V3 Chrome extension providing end-to-end ATS optimization from real-time compatibility scoring to AI resume rewriting with one-click optimized download.', 'WORKFLOW', 'Codebases', 'HR', 6700, 'PUBLISHED', ARRAY['codebase', 'chrome-extension', 'openai', 'ats', 'resume'], 5.0, 34, 9900),
('trend-analyzer-threat-intelligence', 'Trend Analyzer — Social Threat Intelligence', 'Full-stack social media threat intelligence platform combining real-time trend visualization with automated hate speech detection and coordinated campaign monitoring.', 'WORKFLOW', 'Codebases', 'Media', 14900, 'PUBLISHED', ARRAY['codebase', 'next.js', 'convex', 'clerk', 'nlp'], 5.0, 11, 21900)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  tags = EXCLUDED.tags,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  compare_price = EXCLUDED.compare_price;

-- ============================================
-- INSERT WORKFLOW DETAILS
-- ============================================

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites) 
SELECT id, ARRAY['Supabase', 'Gemini', 'Resend'], '30-60 min', 'INTERMEDIATE', ARRAY['GPT-4', 'Claude', 'Gemini'], 'Supabase account, Gemini API key'
FROM products WHERE slug = 'content-repurposing'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'Gemini'], '15-30 min', 'BEGINNER', ARRAY['GPT-4', 'Gemini'], 'Supabase account, Gemini API key'
FROM products WHERE slug = 'lead-magnet-generator'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'Gemini', 'Hunter.io', 'Resend'], '30-60 min', 'INTERMEDIATE', ARRAY['GPT-4', 'Gemini'], 'Supabase, Gemini, Hunter.io accounts'
FROM products WHERE slug = 'cold-email-personalizer'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'Gemini', 'Resend'], '15-30 min', 'BEGINNER', ARRAY['GPT-4', 'Gemini'], 'Supabase account, Gemini API key'
FROM products WHERE slug = 'meeting-summarizer'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'Gemini', 'Slack'], '30-60 min', 'INTERMEDIATE', ARRAY['GPT-4', 'Gemini'], 'Supabase, Gemini API, Slack webhook'
FROM products WHERE slug = 'support-ticket-router'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'ScraperAPI', 'Gemini', 'Slack'], '1-2 hours', 'ADVANCED', ARRAY['GPT-4', 'Gemini'], 'Supabase, ScraperAPI, Gemini, Slack'
FROM products WHERE slug = 'competitor-price-monitor'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'Gemini', 'Resend'], '30-60 min', 'INTERMEDIATE', ARRAY['GPT-4', 'Gemini'], 'Supabase, Gemini, Resend'
FROM products WHERE slug = 'resume-screening'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO workflow_details (product_id, apps_integrated, setup_time, difficulty, model_compatibility, prerequisites)
SELECT id, ARRAY['Supabase', 'Gemini'], '15-30 min', 'BEGINNER', ARRAY['GPT-4', 'Gemini'], 'Supabase account, Gemini API key'
FROM products WHERE slug = 'social-comment-responder'
ON CONFLICT (product_id) DO NOTHING;

-- ============================================
-- INSERT VOICE AGENT DETAILS
-- ============================================

INSERT INTO voice_agent_details (product_id, handles, case_study, before_after_stats)
SELECT id, ARRAY['Emergency dispatch', 'Lead capture', 'Appointment scheduling', 'SMS follow-up', 'Slack alerts'], 'Reduced missed calls by 80%', '{"missed_calls": "15/day", "now": "3/day", "lead_capture_rate": "+95%"}'::jsonb
FROM products WHERE slug = 'plumber-voice-agent'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO voice_agent_details (product_id, handles, case_study, before_after_stats)
SELECT id, ARRAY['Appointment booking', 'SMS reminders', 'Insurance verification', 'Calendar sync', 'Confirmation texts'], 'Booked 50+ appointments in first week', '{"daily_bookings": "5", "now": "45", "no_show_rate": "-60%"}'::jsonb
FROM products WHERE slug = 'dental-appointment-booking'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO voice_agent_details (product_id, handles, case_study, before_after_stats)
SELECT id, ARRAY['Lead scoring', 'Budget assessment', 'CRM sync', 'Agent routing', 'Follow-up scheduling'], 'Qualified 200+ leads in first month', '{"lead_quality": "+40%", "response_time": "-90%", "conversion_rate": "+25%"}'::jsonb
FROM products WHERE slug = 'real-estate-lead-qualification'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO voice_agent_details (product_id, handles, case_study, before_after_stats)
SELECT id, ARRAY['Order taking', 'Price calculation', 'Order confirmations', 'Special instructions', 'Status updates'], 'Processed 1000+ orders without errors', '{"order_errors": "12%", "now": "0.5%", "avg_order_time": "-70%"}'::jsonb
FROM products WHERE slug = 'restaurant-whatsapp-order'
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO voice_agent_details (product_id, handles, case_study, before_after_stats)
SELECT id, ARRAY['Emergency detection', 'Technician calling', 'Slack alerts', 'Ticket creation', 'Status updates'], 'Response time reduced from 30min to 5min', '{"response_time": "30min", "now": "5min", "customer_satisfaction": "+40%"}'::jsonb
FROM products WHERE slug = 'hvac-emergency-dispatch'
ON CONFLICT (product_id) DO NOTHING;

-- ============================================
-- INSERT BUNDLES
-- ============================================

-- Get bundle product IDs first
DO $$
DECLARE
  voice_pack_id UUID;
  marketing_pack_id UUID;
  business_pack_id UUID;
  master_bundle_id UUID;
BEGIN
  -- Create bundle products
  INSERT INTO products (slug, title, description, type, category, niche, price, status, tags, compare_price)
  VALUES 
    ('niche-voice-agents-pack', 'Niche Voice Agents Pack', '7 voice agent kits for plumbers, dental, real estate, restaurant, HVAC, cleaning, and fitness', 'BUNDLE', 'Bundles', NULL, 14700, 'PUBLISHED', ARRAY['bundle', 'voice-agents', 'pack'], 20300)
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO products (slug, title, description, type, category, niche, price, status, tags, compare_price)
  VALUES 
    ('ai-marketing-pack', 'AI Marketing Pack', '3 workflows for content repurposing, lead magnets, and cold email', 'BUNDLE', 'Bundles', NULL, 12700, 'PUBLISHED', ARRAY['bundle', 'marketing', 'pack'], 17400)
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO products (slug, title, description, type, category, niche, price, status, tags, compare_price)
  VALUES 
    ('business-operations-pack', 'Business Operations Pack', '5 workflows for meetings, support, price monitoring, resume screening, and social responses', 'BUNDLE', 'Bundles', NULL, 14700, 'PUBLISHED', ARRAY['bundle', 'business', 'pack'], 20300)
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO products (slug, title, description, type, category, niche, price, status, tags, compare_price)
  VALUES 
    ('master-bundle', 'Master Bundle - All 15 Workflows', 'Complete collection of all 15 workflows + lifetime updates + commercial license', 'BUNDLE', 'Bundles', NULL, 29700, 'PUBLISHED', ARRAY['bundle', 'all', 'lifetime'], 43500)
  ON CONFLICT (slug) DO NOTHING;

  -- Get IDs
  SELECT id INTO voice_pack_id FROM products WHERE slug = 'niche-voice-agents-pack';
  SELECT id INTO marketing_pack_id FROM products WHERE slug = 'ai-marketing-pack';
  SELECT id INTO business_pack_id FROM products WHERE slug = 'business-operations-pack';
  SELECT id INTO master_bundle_id FROM products WHERE slug = 'master-bundle';

  -- Create bundles
  INSERT INTO bundles (product_id, included_product_ids, savings_amount)
  VALUES 
    (voice_pack_id, ARRAY[
      (SELECT id FROM products WHERE slug = 'plumber-voice-agent'),
      (SELECT id FROM products WHERE slug = 'dental-appointment-booking'),
      (SELECT id FROM products WHERE slug = 'real-estate-lead-qualification'),
      (SELECT id FROM products WHERE slug = 'restaurant-whatsapp-order'),
      (SELECT id FROM products WHERE slug = 'hvac-emergency-dispatch'),
      (SELECT id FROM products WHERE slug = 'cleaning-service-quote'),
      (SELECT id FROM products WHERE slug = 'fitness-coach-followup')
    ]::UUID[], 5600)
  ON CONFLICT (product_id) DO NOTHING;

  INSERT INTO bundles (product_id, included_product_ids, savings_amount)
  VALUES 
    (marketing_pack_id, ARRAY[
      (SELECT id FROM products WHERE slug = 'content-repurposing'),
      (SELECT id FROM products WHERE slug = 'lead-magnet-generator'),
      (SELECT id FROM products WHERE slug = 'cold-email-personalizer')
    ]::UUID[], 4700)
  ON CONFLICT (product_id) DO NOTHING;

  INSERT INTO bundles (product_id, included_product_ids, savings_amount)
  VALUES 
    (business_pack_id, ARRAY[
      (SELECT id FROM products WHERE slug = 'meeting-summarizer'),
      (SELECT id FROM products WHERE slug = 'support-ticket-router'),
      (SELECT id FROM products WHERE slug = 'competitor-price-monitor'),
      (SELECT id FROM products WHERE slug = 'resume-screening'),
      (SELECT id FROM products WHERE slug = 'social-comment-responder')
    ]::UUID[], 5600)
  ON CONFLICT (product_id) DO NOTHING;

  INSERT INTO bundles (product_id, included_product_ids, savings_amount)
  VALUES 
    (master_bundle_id, ARRAY[
      (SELECT id FROM products WHERE slug = 'plumber-voice-agent'),
      (SELECT id FROM products WHERE slug = 'dental-appointment-booking'),
      (SELECT id FROM products WHERE slug = 'real-estate-lead-qualification'),
      (SELECT id FROM products WHERE slug = 'restaurant-whatsapp-order'),
      (SELECT id FROM products WHERE slug = 'hvac-emergency-dispatch'),
      (SELECT id FROM products WHERE slug = 'cleaning-service-quote'),
      (SELECT id FROM products WHERE slug = 'fitness-coach-followup'),
      (SELECT id FROM products WHERE slug = 'content-repurposing'),
      (SELECT id FROM products WHERE slug = 'lead-magnet-generator'),
      (SELECT id FROM products WHERE slug = 'cold-email-personalizer'),
      (SELECT id FROM products WHERE slug = 'meeting-summarizer'),
      (SELECT id FROM products WHERE slug = 'support-ticket-router'),
      (SELECT id FROM products WHERE slug = 'competitor-price-monitor'),
      (SELECT id FROM products WHERE slug = 'resume-screening'),
      (SELECT id FROM products WHERE slug = 'social-comment-responder'),
      (SELECT id FROM products WHERE slug = 'tars-conversa-ai-livechat'),
      (SELECT id FROM products WHERE slug = 'finflock-algorithmic-trading'),
      (SELECT id FROM products WHERE slug = 'gmaps-scraper-ai-outreach'),
      (SELECT id FROM products WHERE slug = 'hashtric-marketing-intelligence'),
      (SELECT id FROM products WHERE slug = 'jobify-universal-ats-extension'),
      (SELECT id FROM products WHERE slug = 'autostream-social-lead-agent'),
      (SELECT id FROM products WHERE slug = 'resumod-ats-optimizer-extension'),
      (SELECT id FROM products WHERE slug = 'trend-analyzer-threat-intelligence')
    ]::UUID[], 13800)
  ON CONFLICT (product_id) DO NOTHING;
END $$;

-- ============================================
-- CODEBASE FILES - Map products to Supabase storage paths
-- ============================================
-- Upload your zip files to Supabase Storage → codebases bucket
-- Then insert the mapping here:

INSERT INTO codebase_files (product_slug, file_name, storage_path, version) VALUES
  ('tars-conversa-ai-livechat', 'TARS-CONVERSA-main.zip', 'codebases/TARS-CONVERSA-main.zip', '1.0.0'),
  ('finflock-algorithmic-trading', 'Finflock-main.zip', 'codebases/Finflock-main.zip', '1.0.0'),
  ('gmaps-scraper-ai-outreach', 'Google-Maps-Scrapper-master.zip', 'codebases/Google-Maps-Scrapper-master.zip', '1.0.0'),
  ('hashtric-marketing-intelligence', 'hashtric-full-stack.zip', 'codebases/hashtric-full-stack.zip', '1.0.0'),
  ('jobify-universal-ats-extension', 'jobify-chrome-extension.zip', 'codebases/jobify-chrome-extension.zip', '1.0.0'),
  ('autostream-social-lead-agent', 'autostream-agent-main.zip', 'codebases/autostream-agent-main.zip', '1.0.0'),
  ('resumod-ats-optimizer-extension', 'resumemod-main.zip', 'codebases/resumemod-main.zip', '1.0.0'),
  ('trend-analyzer-threat-intelligence', 'Trend-Analyzer-master.zip', 'codebases/Trend-Analyzer-master.zip', '1.0.0')
ON CONFLICT (product_slug) DO UPDATE SET
  file_name = EXCLUDED.file_name,
  storage_path = EXCLUDED.storage_path,
  version = EXCLUDED.version,
  updated_at = now();