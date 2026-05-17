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
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as PortfolioProject[];
}

async function writeProjects(projects: PortfolioProject[]) {
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
    category: "Custom Project",
    description: input.description,
    imageUrl: input.imageUrl,
    videoUrl: input.videoUrl,
    challenge: input.description,
    solution: "Solution details will be added from the admin panel.",
    results: "Result metrics will be added after launch.",
    keyFeatures: ["Responsive", "AI Chatbot", "Secure DB"],
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
  updates: Partial<
    Pick<PortfolioProject, "title" | "description" | "imageUrl" | "videoUrl" | "published">
  >,
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
    title: updates.title ?? current.title,
    description: updates.description ?? current.description,
    imageUrl: updates.imageUrl ?? current.imageUrl,
    videoUrl: updates.videoUrl ?? current.videoUrl,
    published: updates.published ?? current.published,
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
