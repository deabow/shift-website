"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Upload,
  Image as ImageIcon,
  Film,
  Layers,
  Globe,
  X,
  Check,
  Sparkles,
  Eye,
  EyeOff,
  Video,
  Code2,
  Target,
  ExternalLink,
} from "lucide-react";
import { toast, Toaster } from "@/components/toast";
import { PortfolioProject, PORTFOLIO_CATEGORIES } from "@/lib/portfolio-types";

type ProjectFormState = {
  title: string;
  category: string;
  clientType: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  challenge: string;
  solution: string;
  results: string;
  published: boolean;
};

const initialFormState: ProjectFormState = {
  title: "",
  category: "web-dev",
  clientType: "Enterprise Client",
  description: "",
  imageUrl: "",
  videoUrl: "",
  challenge: "",
  solution: "",
  results: "",
  published: true,
};

export function AdminPortfolioDashboard() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormState>(initialFormState);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingVid, setUploadingVid] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/portfolio", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load projects.");
      const data = (await response.json()) as PortfolioProject[];
      setProjects(data);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (project: PortfolioProject) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category || "web-dev",
      clientType: project.clientType || "Enterprise Client",
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      videoUrl: project.videoUrl || "",
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: project.results || "",
      published: project.published,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setter = type === "image" ? setUploadingImg : setUploadingVid;
    setter(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const { url } = await res.json();
      if (type === "image") {
        setForm((prev) => ({ ...prev, imageUrl: url }));
        toast("Image uploaded successfully!");
      } else {
        setForm((prev) => ({ ...prev, videoUrl: url }));
        toast("Video uploaded successfully!");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed.", "error");
    } finally {
      setter(false);
    }
  };

  const saveProject = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast("Project title and description are required.", "error");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/portfolio/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error("Unable to update project.");
        const updated = (await response.json()) as PortfolioProject;
        setProjects((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        toast("Project updated successfully!");
      } else {
        // Create
        const response = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error("Unable to create project.");
        const created = (await response.json()) as PortfolioProject;
        setProjects((prev) => [created, ...prev]);
        toast("New project created successfully!");
      }
      setIsModalOpen(false);
      setForm(initialFormState);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to save project.", "error");
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (project: PortfolioProject) => {
    try {
      const response = await fetch(`/api/portfolio/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      });
      if (!response.ok) throw new Error("Failed to update status.");
      const updated = (await response.json()) as PortfolioProject;
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
      toast(`Project is now ${updated.published ? "Published (Live)" : "Draft (Hidden)"}`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Status change failed.", "error");
    }
  };

  const removeProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete project.");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast("Project deleted successfully.");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Deletion failed.", "error");
    }
  };

  const filteredProjects = selectedCategoryFilter === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategoryFilter);

  const liveCount = projects.filter((p) => p.published).length;
  const draftCount = projects.filter((p) => !p.published).length;

  return (
    <div className="w-full space-y-8">
      <Toaster />

      {/* Top Overview Bar */}
      <div className="rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Admin Control Core</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100">
            Portfolio Management
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Easily create, edit, upload media, and manage showcase projects across the 3 core disciplines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-zinc-900/90 border border-white/[0.06] text-xs text-zinc-300">
            <div>
              <span className="text-zinc-500 block text-[10px] font-bold uppercase">Total</span>
              <span className="font-mono text-sm font-bold text-white">{projects.length}</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-emerald-500 block text-[10px] font-bold uppercase">Live</span>
              <span className="font-mono text-sm font-bold text-emerald-400">{liveCount}</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-amber-500 block text-[10px] font-bold uppercase">Drafts</span>
              <span className="font-mono text-sm font-bold text-amber-400">{draftCount}</span>
            </div>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-950 transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            <Plus className="w-4 h-4 text-zinc-950" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategoryFilter === cat.id
                ? "bg-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-zinc-900/60 border border-white/[0.06] text-zinc-400 hover:text-white"
            }`}
          >
            {cat.labelEn}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-zinc-900/30 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-12 text-center backdrop-blur-2xl">
          <div className="text-4xl mb-3">📁</div>
          <h3 className="text-xl font-bold text-zinc-100">No Projects Found</h3>
          <p className="text-sm text-zinc-400 mt-1">Click &quot;Add New Project&quot; above to create your first case study.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-2xl p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
            >
              <div>
                {/* Media Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900 mb-4">
                  {project.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-600">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <button
                    onClick={() => togglePublished(project)}
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-transform active:scale-95 flex items-center gap-1 ${
                      project.published
                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                    }`}
                  >
                    {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{project.published ? "LIVE" : "DRAFT"}</span>
                  </button>
                </div>

                {/* Category Pill */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  {PORTFOLIO_CATEGORIES.find((c) => c.id === project.category)?.labelEn || project.category}
                </span>

                <h3 className="text-lg font-bold text-zinc-100 mt-2 line-clamp-1">{project.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => removeProject(project.id)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400/80 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 md:p-8 shadow-2xl backdrop-blur-2xl my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>{editingId ? "Edit Case Study" : "Create New Case Study"}</span>
              </h2>

              <div className="mt-6 space-y-5">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Service Category (Required)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "web-dev", label: "Web & Software", icon: Code2 },
                      { id: "digital-marketing", label: "Digital Marketing", icon: Target },
                      { id: "media-production", label: "Media Production", icon: Video },
                    ].map((cat) => {
                      const CatIcon = cat.icon;
                      const isSelected = form.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, category: cat.id }))}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                            isSelected
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                              : "bg-zinc-900/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <CatIcon className="w-4 h-4 text-emerald-400" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. NextGen E-Commerce Platform"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/80 p-3 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief summary of the case study..."
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/80 p-3 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>

                {/* Image Upload / URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Image (Upload file or enter URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://... or click upload"
                      className="flex-1 rounded-xl border border-white/10 bg-zinc-900/80 p-3 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                    />
                    <input
                      ref={imageFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "image")}
                    />
                    <button
                      type="button"
                      onClick={() => imageFileInputRef.current?.click()}
                      disabled={uploadingImg}
                      className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-zinc-900 px-4 text-xs font-bold uppercase text-emerald-400 hover:bg-zinc-800"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploadingImg ? "..." : "Upload"}</span>
                    </button>
                  </div>
                  {form.imageUrl && (
                    <div className="mt-2 h-24 w-full rounded-xl overflow-hidden border border-white/10 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Video Upload / URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Video Reel (Upload MP4 or enter URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.videoUrl}
                      onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                      placeholder="https://... or click upload MP4"
                      className="flex-1 rounded-xl border border-white/10 bg-zinc-900/80 p-3 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                    />
                    <input
                      ref={videoFileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "video")}
                    />
                    <button
                      type="button"
                      onClick={() => videoFileInputRef.current?.click()}
                      disabled={uploadingVid}
                      className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-zinc-900 px-4 text-xs font-bold uppercase text-emerald-400 hover:bg-zinc-800"
                    >
                      <Film className="w-4 h-4" />
                      <span>{uploadingVid ? "..." : "Upload"}</span>
                    </button>
                  </div>
                </div>

                {/* Additional Optional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      The Challenge (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.challenge}
                      onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                      placeholder="Problem statement..."
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/80 p-2.5 text-xs text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      The Solution (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.solution}
                      onChange={(e) => setForm({ ...form, solution: e.target.value })}
                      placeholder="Architectural solution..."
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/80 p-2.5 text-xs text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="publishedCheck"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="h-4 w-4 rounded accent-emerald-500"
                  />
                  <label htmlFor="publishedCheck" className="text-xs font-bold uppercase text-zinc-200 cursor-pointer">
                    Publish Immediately to Website (Live)
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-zinc-900 px-5 py-2.5 text-xs font-bold uppercase text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveProject}
                  disabled={saving}
                  className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                >
                  {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
