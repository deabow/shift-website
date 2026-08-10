import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { CreatePortfolioInput, PortfolioProject } from "@/lib/portfolio-types";
import { logger } from "@/lib/logger";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio-projects.json");
const TMP_FILE = path.join(os.tmpdir(), "portfolio-projects.json");

const DEFAULT_BENTO_SPANS = [
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
];

// Vercel Blob constants
const BLOB_STORE_KEY = "portfolio-projects.json";

// Global in-memory cache for serverless instance reuse
const globalStore = globalThis as unknown as {
  __SHIFT_PORTFOLIO_CACHE__?: PortfolioProject[];
};

/* ─── Vercel Blob helpers ─────────────────────────────────────────────────── */

async function readFromVercelBlob(): Promise<PortfolioProject[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    // Dynamic import to avoid errors when @vercel/blob is not installed
    const { list: listBlobs } = await import("@vercel/blob");

    const { blobs } = await listBlobs({ prefix: BLOB_STORE_KEY, limit: 1 });
    if (blobs.length === 0) return null;

    const response = await fetch(blobs[0].url);
    if (!response.ok) return null;

    const data = (await response.json()) as PortfolioProject[];
    if (Array.isArray(data)) {
      logger.info("portfolio-store", `Loaded ${data.length} projects from Vercel Blob.`);
      return data;
    }
    return null;
  } catch (error) {
    logger.error("portfolio-store", "Vercel Blob read failed", error);
    return null;
  }
}

async function writeToVercelBlob(projects: PortfolioProject[]): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;

  try {
    const { put } = await import("@vercel/blob");

    const jsonString = JSON.stringify(projects, null, 2);
    await put(BLOB_STORE_KEY, jsonString, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    logger.info("portfolio-store", `Persisted ${projects.length} projects to Vercel Blob.`);
    return true;
  } catch (error) {
    logger.error("portfolio-store", "Vercel Blob write failed", error);
    return false;
  }
}

/* ─── Cloud Database adapter placeholder ──────────────────────────────────── */

/**
 * Serverless Database Adapter Placeholder / External Provider Fetcher.
 * Connects to MongoDB, Vercel Postgres, or Supabase when env vars are present.
 */
async function fetchFromCloudDatabase(): Promise<PortfolioProject[] | null> {
  const dbUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || process.env.POSTGRES_URL;
  if (!dbUrl) return null;

  try {
    // If a cloud DB connection URL is supplied, query here.
    // Example: const projects = await db.portfolio.findMany();
    logger.info("portfolio-store", "Cloud DB URL detected. Using Cloud Database Provider.");
    return null;
  } catch (error) {
    logger.error("portfolio-store", "Cloud DB query failed", error);
    return null;
  }
}

/* ─── Core read/write ─────────────────────────────────────────────────────── */

async function readProjects(): Promise<PortfolioProject[]> {
  if (globalStore.__SHIFT_PORTFOLIO_CACHE__ && globalStore.__SHIFT_PORTFOLIO_CACHE__.length > 0) {
    return globalStore.__SHIFT_PORTFOLIO_CACHE__;
  }

  // 1. Try cloud database adapter first
  const dbData = await fetchFromCloudDatabase();
  if (dbData && dbData.length > 0) {
    globalStore.__SHIFT_PORTFOLIO_CACHE__ = dbData;
    return dbData;
  }

  // 2. Try Vercel Blob store (persistent serverless storage)
  const blobData = await readFromVercelBlob();
  if (blobData && blobData.length > 0) {
    globalStore.__SHIFT_PORTFOLIO_CACHE__ = blobData;
    return blobData;
  }

  // 3. Try primary DATA_FILE (local development)
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const data = JSON.parse(raw) as PortfolioProject[];
    if (Array.isArray(data) && data.length > 0) {
      globalStore.__SHIFT_PORTFOLIO_CACHE__ = data;
      return data;
    }
  } catch {
    // Ignore and proceed
  }

  // 4. Try TMP_FILE
  try {
    const raw = await fs.readFile(TMP_FILE, "utf8");
    const data = JSON.parse(raw) as PortfolioProject[];
    if (Array.isArray(data) && data.length > 0) {
      globalStore.__SHIFT_PORTFOLIO_CACHE__ = data;
      return data;
    }
  } catch {
    // Ignore
  }

  globalStore.__SHIFT_PORTFOLIO_CACHE__ = [];
  return [];
}

async function writeProjects(projects: PortfolioProject[]) {
  globalStore.__SHIFT_PORTFOLIO_CACHE__ = projects;

  // 1. If Cloud DB URL exists, sync to Cloud Database
  const dbUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || process.env.POSTGRES_URL;
  if (dbUrl) {
    try {
      logger.info("portfolio-store", "Persisting project changes to Cloud Database.");
      // Cloud DB persistence logic goes here (e.g. await db.portfolio.upsertMany(...))
    } catch (error) {
      logger.error("portfolio-store", "Cloud DB write failed", error);
    }
  }

  // 2. Try Vercel Blob store (persistent serverless storage)
  const blobSuccess = await writeToVercelBlob(projects);
  if (blobSuccess) return;

  // 3. Try writing to primary DATA_FILE (Works locally / non-serverless)
  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), "utf8");
    return;
  } catch {
    // Read-only filesystem failover (Vercel serverless environment)
  }

  // 4. Failover: write to /tmp directory
  try {
    await fs.writeFile(TMP_FILE, JSON.stringify(projects, null, 2), "utf8");
  } catch {
    // Ignore if tmp also restricted
  }
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function ensureUniqueSlug(baseSlug: string, existing: PortfolioProject[]) {
  let slug = baseSlug;
  let idx = 2;
  const existingSet = new Set(existing.map((item) => item.slug));
  while (existingSet.has(slug)) {
    slug = `${baseSlug}-${idx}`;
    idx += 1;
  }
  return slug;
}

/* ─── Public API ──────────────────────────────────────────────────────────── */

export async function getAllProjects() {
  const projects = await readProjects();
  return projects.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getPublishedProjects() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.published);
}

export async function getProjectBySlug(slug: string) {
  const projects = await readProjects();
  return projects.find((project) => project.slug === slug);
}

export async function createProject(input: CreatePortfolioInput) {
  const projects = await readProjects();
  const now = new Date().toISOString();
  const baseSlug = slugify(input.title) || "untitled-project";
  const slug = ensureUniqueSlug(baseSlug, projects);

  const initialGallery = input.gallery && input.gallery.length > 0
    ? input.gallery
    : [
        ...(input.imageUrl ? [{ type: "image" as const, url: input.imageUrl }] : []),
        ...(input.videoUrl ? [{ type: "video" as const, url: input.videoUrl }] : []),
      ];

  const newProject: PortfolioProject = {
    id: `prj_${Date.now().toString(36)}`,
    slug,
    title: input.title,
    category: input.category ?? "web-dev",
    clientType: input.clientType ?? "Enterprise Client",
    description: input.description,
    imageUrl: input.imageUrl,
    videoUrl: input.videoUrl,
    gallery: initialGallery,
    liveUrl: input.liveUrl ?? "",
    challenge: input.challenge ?? input.description,
    solution: input.solution ?? "Architected end-to-end digital ecosystem.",
    results: input.results ?? "Delivered sub-second latency and high engagement.",
    keyFeatures: input.keyFeatures && input.keyFeatures.length > 0 ? input.keyFeatures : ["Next.js 14", "Responsive Design", "Cyber Security"],
    bentoSpan:
      DEFAULT_BENTO_SPANS[projects.length % DEFAULT_BENTO_SPANS.length] ??
      DEFAULT_BENTO_SPANS[0],
    published: input.published,
    createdAt: now,
    updatedAt: now,
  };


  projects.unshift(newProject);
  await writeProjects(projects);
  return newProject;
}

export async function updateProject(
  id: string,
  updates: Partial<PortfolioProject>,
) {
  const projects = await readProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0) return null;

  const current = projects[index];
  const now = new Date().toISOString();

  let nextSlug = current.slug;
  if (updates.title && updates.title !== current.title) {
    const baseSlug = slugify(updates.title) || current.slug;
    nextSlug = ensureUniqueSlug(
      baseSlug,
      projects.filter((project) => project.id !== id),
    );
  }

  const updated: PortfolioProject = {
    ...current,
    ...updates,
    slug: nextSlug,
    updatedAt: now,
  };

  projects[index] = updated;
  await writeProjects(projects);
  return updated;
}

export async function deleteProject(id: string) {
  const projects = await readProjects();
  const next = projects.filter((project) => project.id !== id);
  if (next.length === projects.length) return false;
  await writeProjects(next);
  return true;
}
