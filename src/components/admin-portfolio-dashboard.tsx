"use client";

import { PortfolioProject } from "@/lib/portfolio-types";
import { useEffect, useState } from "react";

type CreateFormState = {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  published: boolean;
};

const initialFormState: CreateFormState = {
  title: "",
  description: "",
  imageUrl: "",
  videoUrl: "",
  published: false,
};

export function AdminPortfolioDashboard() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<CreateFormState>(initialFormState);
  const [saving, setSaving] = useState(false);
  const [drafts, setDrafts] = useState<
    Record<string, Pick<PortfolioProject, "title" | "description" | "imageUrl" | "videoUrl">>
  >({});

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/portfolio", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load projects.");
      const data = (await response.json()) as PortfolioProject[];
      setProjects(data);
      setDrafts(
        Object.fromEntries(
          data.map((project) => [
            project.id,
            {
              title: project.title,
              description: project.description,
              imageUrl: project.imageUrl,
              videoUrl: project.videoUrl,
            },
          ]),
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const createProject = async () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.imageUrl.trim() ||
      !form.videoUrl.trim()
    ) {
      setError("Title, description, image URL, and video URL are required.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Unable to create project.");
      const created = (await response.json()) as PortfolioProject;
      setProjects((prev) => [created, ...prev]);
      setForm(initialFormState);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project.");
    } finally {
      setSaving(false);
    }
  };

  const updateProject = async (
    id: string,
    payload: Partial<
      Pick<PortfolioProject, "title" | "description" | "imageUrl" | "videoUrl" | "published">
    >,
  ) => {
    const response = await fetch(`/api/portfolio/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to update project.");
    const updated = (await response.json()) as PortfolioProject;
    setProjects((prev) => prev.map((project) => (project.id === id ? updated : project)));
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        title: updated.title,
        description: updated.description,
        imageUrl: updated.imageUrl,
        videoUrl: updated.videoUrl,
      },
    }));
  };

  const togglePublished = async (project: PortfolioProject) => {
    try {
      await updateProject(project.id, { published: !project.published });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle publish state.");
    }
  };

  const removeProject = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete project.");
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Portfolio Projects</h2>
          <p className="mt-1 text-sm text-zinc-300">
            Create, edit, publish, or delete case studies from one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
        >
          Create New Project
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.14em] text-zinc-400">
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-4 text-sm text-zinc-400" colSpan={4}>
                  Loading projects...
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] text-sm text-zinc-100"
                >
                  <td className="px-3 py-3">
                    <input
                      value={drafts[project.id]?.title ?? project.title}
                      onChange={(event) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [project.id]: {
                            title: event.target.value,
                            description:
                              prev[project.id]?.description ?? project.description,
                            imageUrl: prev[project.id]?.imageUrl ?? project.imageUrl,
                            videoUrl: prev[project.id]?.videoUrl ?? project.videoUrl,
                          },
                        }))
                      }
                      className="w-full rounded-md border border-white/15 bg-black/35 px-2 py-1.5 text-sm text-white"
                    />
                    <textarea
                      value={drafts[project.id]?.description ?? project.description}
                      onChange={(event) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [project.id]: {
                            title: prev[project.id]?.title ?? project.title,
                            description: event.target.value,
                            imageUrl: prev[project.id]?.imageUrl ?? project.imageUrl,
                            videoUrl: prev[project.id]?.videoUrl ?? project.videoUrl,
                          },
                        }))
                      }
                      rows={2}
                      className="mt-2 w-full rounded-md border border-white/15 bg-black/35 px-2 py-1.5 text-xs text-zinc-300"
                    />
                    <input
                      value={drafts[project.id]?.imageUrl ?? project.imageUrl}
                      onChange={(event) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [project.id]: {
                            title: prev[project.id]?.title ?? project.title,
                            description:
                              prev[project.id]?.description ?? project.description,
                            imageUrl: event.target.value,
                            videoUrl: prev[project.id]?.videoUrl ?? project.videoUrl,
                          },
                        }))
                      }
                      className="mt-2 w-full rounded-md border border-white/15 bg-black/35 px-2 py-1.5 text-xs text-zinc-300"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        value={drafts[project.id]?.videoUrl ?? project.videoUrl}
                        onChange={(event) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [project.id]: {
                              title: prev[project.id]?.title ?? project.title,
                              description:
                                prev[project.id]?.description ?? project.description,
                              imageUrl: prev[project.id]?.imageUrl ?? project.imageUrl,
                              videoUrl: event.target.value,
                            },
                          }))
                        }
                        placeholder="Video URL"
                        className="w-full rounded-md border border-white/15 bg-black/35 px-2 py-1.5 text-xs text-zinc-300"
                      />
                      <label className="flex cursor-pointer items-center justify-center rounded-md border border-white/15 bg-black/35 px-2 py-1.5 text-xs text-zinc-300 transition hover:bg-white/10">
                        Upload
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/upload", { method: "POST", body: formData });
                              if (!res.ok) throw new Error("Upload failed");
                              const data = await res.json();
                              setDrafts((prev) => ({
                                ...prev,
                                [project.id]: {
                                  title: prev[project.id]?.title ?? project.title,
                                  description: prev[project.id]?.description ?? project.description,
                                  imageUrl: prev[project.id]?.imageUrl ?? project.imageUrl,
                                  videoUrl: data.url,
                                },
                              }));
                            } catch (err) {
                              alert("Failed to upload video");
                            }
                          }}
                        />
                      </label>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => void togglePublished(project)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                        project.published
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-zinc-500/25 text-zinc-300"
                      }`}
                    >
                      {project.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-xs text-zinc-300">/{project.slug}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          void updateProject(project.id, {
                            title: drafts[project.id]?.title ?? project.title,
                            description:
                              drafts[project.id]?.description ?? project.description,
                            imageUrl: drafts[project.id]?.imageUrl ?? project.imageUrl,
                            videoUrl: drafts[project.id]?.videoUrl ?? project.videoUrl,
                          })
                        }
                        className="rounded-lg border border-white/20 bg-white/[0.02] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => void removeProject(project.id)}
                        className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#111114]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">Create New Project</h3>
            <div className="mt-4 space-y-4">
              <input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Title"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
              />
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="Description"
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
              />
              <input
                value={form.imageUrl}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                }
                placeholder="Image URL"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  value={form.videoUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, videoUrl: event.target.value }))
                  }
                  placeholder="Video URL (YouTube, Vimeo, or MP4)"
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                />
                <label className="flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10">
                  Upload
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const res = await fetch("/api/upload", { method: "POST", body: formData });
                        if (!res.ok) throw new Error("Upload failed");
                        const data = await res.json();
                        setForm((prev) => ({ ...prev, videoUrl: data.url }));
                      } catch (err) {
                        alert("Failed to upload video");
                      }
                    }}
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-200">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, published: event.target.checked }))
                  }
                />
                Published
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void createProject()}
                disabled={saving}
                className="rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
