import { promises as fs } from "fs";
import path from "path";
import { CreatePortfolioInput, PortfolioProject } from "@/lib/portfolio-types";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio-projects.json");
const DEFAULT_BENTO_SPANS = [
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
];

async function readProjects(): Promise<PortfolioProject[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as PortfolioProject[];
  } catch {
    return [];
  }
}

async function writeProjects(projects: PortfolioProject[]) {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), "utf8");
}

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

  const newProject: PortfolioProject = {
    id: `prj_${Date.now().toString(36)}`,
    slug,
    title: input.title,
    category: input.category ?? "web-dev",
    clientType: input.clientType ?? "Enterprise Client",
    description: input.description,
    imageUrl: input.imageUrl,
    videoUrl: input.videoUrl,
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
