import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const CODEBASE_FILES: { slug: string; filePath: string; storagePath: string }[] = [
  {
    slug: "tars-conversa-ai-livechat",
    filePath: path.resolve(__dirname, "../../zip file of the project/Chat Application/TARS-CONVERSA-main.zip"),
    storagePath: "codebases/TARS-CONVERSA-main.zip",
  },
  {
    slug: "finflock-algorithmic-trading",
    filePath: path.resolve(__dirname, "../../zip file of the project/financebuster/Finflock-main.zip"),
    storagePath: "codebases/Finflock-main.zip",
  },
  {
    slug: "gmaps-scraper-ai-outreach",
    filePath: path.resolve(__dirname, "../../zip file of the project/Google-Maps-Scrapper/Google-Maps-Scrapper-master.zip"),
    storagePath: "codebases/Google-Maps-Scrapper-master.zip",
  },
  {
    slug: "hashtric-marketing-intelligence",
    filePath: path.resolve(__dirname, "../../zip file of the project/hashtric/hashtric-web-main.zip"),
    storagePath: "codebases/hashtric-full-stack.zip",
  },
  {
    slug: "jobify-universal-ats-extension",
    filePath: path.resolve(__dirname, "../../zip file of the project/jobify/jobify chrome extesion.zip"),
    storagePath: "codebases/jobify-chrome-extension.zip",
  },
  {
    slug: "autostream-social-lead-agent",
    filePath: path.resolve(__dirname, "../../zip file of the project/Lead AI agent/autostream-agent-main.zip"),
    storagePath: "codebases/autostream-agent-main.zip",
  },
  {
    slug: "resumod-ats-optimizer-extension",
    filePath: path.resolve(__dirname, "../../zip file of the project/Resumeforge/resumemod-main.zip"),
    storagePath: "codebases/resumemod-main.zip",
  },
  {
    slug: "trend-analyzer-threat-intelligence",
    filePath: path.resolve(__dirname, "../../zip file of the project/Trend anlyzer/Trend-Analyzer-master.zip"),
    storagePath: "codebases/Trend-Analyzer-master.zip",
  },
];

async function uploadCodebases() {
  console.log("Uploading codebase zip files to Supabase Storage...\n");

  for (const file of CODEBASE_FILES) {
    if (!fs.existsSync(file.filePath)) {
      console.warn(`[SKIP] File not found: ${file.filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(file.filePath);
    const fileSize = fileBuffer.length;

    console.log(`Uploading ${file.slug} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`);

    const { data, error } = await supabase.storage
      .from("codebases")
      .upload(file.storagePath, fileBuffer, {
        contentType: "application/zip",
        upsert: true,
      });

    if (error) {
      console.error(`[ERROR] Failed to upload ${file.slug}:`, error.message);
      continue;
    }

    console.log(`[OK] Uploaded ${file.slug} → ${file.storagePath}`);

    await supabase
      .from("codebase_files")
      .upsert({
        product_slug: file.slug,
        file_name: path.basename(file.filePath),
        storage_path: file.storagePath,
        file_size: fileSize,
        version: "1.0.0",
      }, { onConflict: "product_slug" });

    console.log(`[OK] Database record updated for ${file.slug}\n`);
  }

  console.log("Upload complete!");
}

uploadCodebases().catch(console.error);
