"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Copy,
  Upload,
  Image as ImageIcon,
  Film,
  Layers,
  Globe,
  X,
  Sparkles,
  Eye,
  EyeOff,
  Video,
  Code2,
  Target,
  Search,
  CheckCircle2,
  Grid,
  Maximize2,
} from "lucide-react";
import { toast, Toaster } from "@/components/toast";
import { PortfolioProject, PORTFOLIO_CATEGORIES, MediaItem } from "@/lib/portfolio-types";

type ProjectFormState = {
  title: string;
  category: string;
  clientType: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  liveUrl: string;
  gallery: MediaItem[];
  challenge: string;
  solution: string;
  results: string;
  keyFeatures: string;
  bentoSpan: string;
  published: boolean;
};

const initialFormState: ProjectFormState = {
  title: "",
  category: "web-dev",
  clientType: "Enterprise Client",
  description: "",
  imageUrl: "",
  videoUrl: "",
  liveUrl: "",
  gallery: [],
  challenge: "",
  solution: "",
  results: "",
  keyFeatures: "",
  bentoSpan: "md:col-span-1 md:row-span-1",
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
  const [searchQuery, setSearchQuery] = useState("");

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
    const existingGallery =
      project.gallery && project.gallery.length > 0
        ? project.gallery
        : [
            ...(project.imageUrl ? [{ type: "image" as const, url: project.imageUrl }] : []),
            ...(project.videoUrl ? [{ type: "video" as const, url: project.videoUrl }] : []),
          ];

    setForm({
      title: project.title,
      category: project.category || "web-dev",
      clientType: project.clientType || "Enterprise Client",
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      videoUrl: project.videoUrl || "",
      liveUrl: project.liveUrl || "",
      gallery: existingGallery,
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: project.results || "",
      keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures.join(", ") : "",
      bentoSpan: project.bentoSpan || "md:col-span-1 md:row-span-1",
      published: project.published,
    });
    setIsModalOpen(true);
  };

  const duplicateProject = (project: PortfolioProject) => {
    setEditingId(null);
    const existingGallery =
      project.gallery && project.gallery.length > 0
        ? project.gallery
        : [
            ...(project.imageUrl ? [{ type: "image" as const, url: project.imageUrl }] : []),
            ...(project.videoUrl ? [{ type: "video" as const, url: project.videoUrl }] : []),
          ];

    setForm({
      title: `${project.title} (Copy)`,
      category: project.category || "web-dev",
      clientType: project.clientType || "Enterprise Client",
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      videoUrl: project.videoUrl || "",
      liveUrl: project.liveUrl || "",
      gallery: existingGallery,
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: project.results || "",
      keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures.join(", ") : "",
      bentoSpan: project.bentoSpan || "md:col-span-1 md:row-span-1",
      published: true,
    });
    setIsModalOpen(true);
    toast("Project duplicated! Review details and save.", "success");
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
      const newItem: MediaItem = { type, url };

      if (type === "image") {
        setForm((prev) => ({
          ...prev,
          imageUrl: prev.imageUrl || url,
          gallery: [...prev.gallery, newItem],
        }));
        toast("Image uploaded & added to gallery!");
      } else {
        setForm((prev) => ({
          ...prev,
          videoUrl: prev.videoUrl || url,
          gallery: [...prev.gallery, newItem],
        }));
        toast("Video uploaded & added to gallery!");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed.", "error");
    } finally {
      setter(false);
    }
  };

  const removeGalleryItem = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const saveProject = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast("Project title and description are required.", "error");
      return;
    }

    setSaving(true);
    const parsedFeatures = form.keyFeatures
      ? form.keyFeatures.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Next.js 14", "Responsive Design", "Security First"];

    const payload = {
      ...form,
      keyFeatures: parsedFeatures,
    };

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/portfolio/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
          body: JSON.stringify(payload),
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

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategoryFilter === "all" ||
      (selectedCategoryFilter === "published" && p.published) ||
      (selectedCategoryFilter === "drafts" && !p.published) ||
      p.category === selectedCategoryFilter;

    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.clientType && p.clientType.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const liveCount = projects.filter((p) => p.published).length;
  const draftCount = projects.filter((p) => !p.published).length;

  return (
    <div className="w-full space-y-8" dir="rtl">
      <Toaster />

      {/* Top Control Bar */}
      <div className="rounded-3xl border border-black/10 dark:border-white/[0.08] bg-white/80 dark:bg-zinc-950/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-right w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>لوحة تحكم معرض الأعمال — SHIFT Core</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            إدارة المشاريع والأعمال
          </h1>
          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            إضافة وتعديل ورفع الوسائط بشكل مباشر وكامل بدون أي بيانات وهمية تلقائية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-black/10 dark:border-white/[0.06] text-xs text-zinc-700 dark:text-zinc-300">
            <div>
              <span className="text-zinc-500 block text-[10px] font-bold uppercase">الإجمالي</span>
              <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white">{projects.length}</span>
            </div>
            <div className="h-6 w-px bg-black/10 dark:bg-white/10" />
            <div>
              <span className="text-emerald-500 block text-[10px] font-bold uppercase">منشور (Live)</span>
              <span className="font-mono text-sm font-bold text-emerald-400">{liveCount}</span>
            </div>
            <div className="h-6 w-px bg-black/10 dark:bg-white/10" />
            <div>
              <span className="text-amber-500 block text-[10px] font-bold uppercase">مسودة (Draft)</span>
              <span className="font-mono text-sm font-bold text-amber-400">{draftCount}</span>
            </div>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-950 transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            <Plus className="w-4 h-4 text-zinc-950" />
            <span>إضافة مشروع جديد</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Live Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: "all", label: "الكل" },
            { id: "published", label: "المنشورة (Live)" },
            { id: "drafts", label: "المسودات (Drafts)" },
            { id: "web-dev", label: "الويب والتطبيقات" },
            { id: "digital-marketing", label: "التسويق" },
            { id: "media-production", label: "الإنتاج الإعلامي" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategoryFilter === cat.id
                  ? "bg-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "bg-zinc-100 dark:bg-zinc-900/60 border border-black/10 dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو البراند..."
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/80 pr-9 pl-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-zinc-900/30 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-black/10 dark:border-white/[0.08] bg-white/80 dark:bg-zinc-950/80 p-12 text-center backdrop-blur-2xl flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <Sparkles size={28} />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">لا توجد مشاريع مطابقة</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
            اضغط على &quot;إضافة مشروع جديد&quot; أعلاه لإنشاء مشروعك الأول وإدارته مباشرة.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 uppercase tracking-wider transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            <span>إضافة مشروع جديد الآن</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl border border-black/10 dark:border-white/[0.08] bg-white/90 dark:bg-zinc-950/80 backdrop-blur-2xl p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] text-right"
            >
              <div>
                {/* Media Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/[0.06] bg-zinc-900 mb-4">
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

                  {/* Quick Replace Cover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-extrabold shadow-lg hover:scale-105 transition-transform"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>تغير صورة الكفر</span>
                    </button>
                  </div>

                  {/* Status Toggle Button */}
                  <button
                    onClick={() => togglePublished(project)}
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-transform active:scale-95 flex items-center gap-1 ${
                      project.published
                        ? "bg-emerald-500/90 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        : "bg-amber-500/90 text-zinc-950"
                    }`}
                  >
                    {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{project.published ? "منشور (Live)" : "مسودة (Draft)"}</span>
                  </button>
                </div>

                {/* Category Pill */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full inline-block">
                  {PORTFOLIO_CATEGORIES.find((c) => c.id === project.category)?.labelEn || project.category}
                </span>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEditModal(project)}
                    className="flex items-center gap-1 text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>

                  <button
                    onClick={() => duplicateProject(project)}
                    className="flex items-center gap-1 text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-colors"
                    title="تكرار المشروع"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ</span>
                  </button>
                </div>

                <button
                  onClick={() => removeProject(project.id)}
                  className="flex items-center gap-1 text-xs font-bold uppercase text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
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
              className="relative w-full max-w-2xl rounded-3xl border border-black/10 dark:border-white/[0.08] bg-white dark:bg-zinc-950 p-6 md:p-8 shadow-2xl backdrop-blur-2xl my-8 overflow-hidden max-h-[90vh] overflow-y-auto text-right"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <span>{editingId ? "تعديل بيانات المشروع" : "إضافة مشروع جديد للمعرض"}</span>
              </h2>

              <div className="mt-6 space-y-5">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    تصنيف الخدمة (مطلوب)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "web-dev", label: "برمجة وتطوير الويب", icon: Code2 },
                      { id: "digital-marketing", label: "تسويق رقمي", icon: Target },
                      { id: "media-production", label: "إنتاج سينمائي وهوية", icon: Video },
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
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                              : "bg-zinc-100 dark:bg-zinc-900/60 border-black/10 dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                        >
                          <CatIcon className="w-4 h-4 text-emerald-500" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title & Client Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      عنوان المشروع (مطلوب)
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="مثال: منصة تسوق إلكترونية متكاملة"
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      نوع العميل / البراند
                    </label>
                    <input
                      type="text"
                      value={form.clientType}
                      onChange={(e) => setForm({ ...form, clientType: e.target.value })}
                      placeholder="مثال: شركة تطوير عقاري / SaaS"
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    وصف المشروع (مطلوب)
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="شرح مختصر ومبهر عن تفاصيل المشروع ومميزاته..."
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Live Website URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    <span>رابط الموقع الحي المباشر (اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://client-website.com"
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Main Cover Image Upload / URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    صورة الغلاف الكفر (رفع ملف جديدة أو تغيير الرابط)
                  </label>

                  {/* Live Cover Preview if URL exists */}
                  {form.imageUrl && (
                    <div className="relative mb-3 h-36 w-full overflow-hidden rounded-2xl border border-emerald-500/30 bg-zinc-900 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.imageUrl}
                        alt="Cover Preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => imageFileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-extrabold shadow-lg"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>تغيير هذه الصورة</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://... أو اضغط رفع صورة جديدة"
                      className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
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
                      className="flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900 px-4 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploadingImg ? "جاري الرفع..." : "رفع صورة الكفر"}</span>
                    </button>
                  </div>
                </div>

                {/* Video Upload / URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    فيديو العرض Reel (رابط Google Drive أو YouTube أو MP4)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.videoUrl}
                      onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                      placeholder="https://drive.google.com/... أو YouTube / Vimeo"
                      className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
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
                      className="flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900 px-4 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      <Film className="w-4 h-4" />
                      <span>{uploadingVid ? "..." : "رفع فيديو"}</span>
                    </button>
                  </div>
                </div>

                {/* Multi-Media Gallery Manager */}
                {form.gallery.length > 0 && (
                  <div className="rounded-2xl border border-black/10 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900/40 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-500">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        <span>معرض الوسائط الإضافية ({form.gallery.length} عناصر)</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {form.gallery.map((media, idx) => (
                        <div
                          key={idx}
                          className="group relative h-20 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 flex items-center justify-center"
                        >
                          {media.type === "image" ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={media.url} alt={`Media ${idx + 1}`} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-1 text-emerald-400">
                              <Film size={20} />
                              <span className="text-[9px] font-mono text-zinc-300">Video</span>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => removeGalleryItem(idx)}
                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="إزالة العنصر"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features Tags & Layout Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      الكلمات المفتاحية والمميزات (فواصل بين الكلمات)
                    </label>
                    <input
                      type="text"
                      value={form.keyFeatures}
                      onChange={(e) => setForm({ ...form, keyFeatures: e.target.value })}
                      placeholder="Next.js 14, تصوير درون, حماية عالية"
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      حجم الكارت في Bento Grid
                    </label>
                    <select
                      value={form.bentoSpan}
                      onChange={(e) => setForm({ ...form, bentoSpan: e.target.value })}
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="md:col-span-1 md:row-span-1">كارت قياسي (Standard 1x1)</option>
                      <option value="md:col-span-2 md:row-span-2">كارت مميز كبير (Featured Big 2x2)</option>
                      <option value="md:col-span-2 md:row-span-1">كارت عريض (Wide 2x1)</option>
                    </select>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      التحدي والهدف (اختياري)
                    </label>
                    <textarea
                      rows={2}
                      value={form.challenge}
                      onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                      placeholder="أهداف العميل والتحديات المطلوبة..."
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      الحل والتنفيذ (اختياري)
                    </label>
                    <textarea
                      rows={2}
                      value={form.solution}
                      onChange={(e) => setForm({ ...form, solution: e.target.value })}
                      placeholder="كيف قامت SHIFT بحل التحدي..."
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none"
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
                    className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="publishedCheck" className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200 cursor-pointer">
                    نشر المشروع مباشرة في الموقع (Live)
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 px-5 py-2.5 text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={saveProject}
                  disabled={saving}
                  className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                >
                  {saving ? "جاري الحفظ..." : editingId ? "تحديث المشروع" : "إنشاء المشروع"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
