import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { validateBlogPost } from "@/lib/validation";

const ICON_OPTIONS = [
  "ri-file-text-line",
  "ri-article-line",
  "ri-code-line",
  "ri-test-tube-line",
  "ri-graduation-cap-line",
  "ri-book-line",
  "ri-lightbulb-line",
  "ri-robot-line",
  "ri-tools-line",
  "ri-flow-chart",
  "ri-git-branch-line",
  "ri-database-line",
];

interface BlogPost {
  _id?: string;
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  icon: string;
  imageUrl?: string;
  order: number;
}

export default function AdminBlogPostsEnhanced() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<BlogPost>({
    title: "",
    description: "",
    url: "",
    date: "",
    category: "",
    icon: "ri-file-text-line",
    imageUrl: "",
    order: 0,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const load = () =>
    adminApi
      .getBlogPosts()
      .then((d: any) => setItems(d))
      .catch((err) => {
        toast({
          title: "Error",
          description: `Failed to load blog posts: ${err.message}`,
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Validate
    const result = validateBlogPost({
      title: form.title,
      description: form.description,
      url: form.url,
      category: form.category,
      imageUrl: form.imageUrl,
    });

    if (!result.isValid) {
      const errors: Record<string, string> = {};
      result.errors.forEach((err) => {
        errors[err.field] = err.message;
      });
      setFieldErrors(errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editId) {
        await adminApi.updateBlogPost(editId, form);
        toast({
          title: "Success",
          description: "Blog post updated successfully!",
        });
      } else {
        await adminApi.createBlogPost(form);
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        });
      }
      setForm({
        title: "",
        description: "",
        url: "",
        date: "",
        category: "",
        icon: "ri-file-text-line",
        imageUrl: "",
        order: 0,
      });
      setEditId(null);
      setShowForm(false);
      load();
    } catch (err: any) {
      const errorMsg = err.message || "Failed to save blog post";
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getDisplayImage = (item: BlogPost) => {
    if (item.imageUrl) {
      return (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-20 h-20 object-cover rounded"
        />
      );
    }
    return (
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
        <i className={`${item.icon} text-2xl text-white`}></i>
      </div>
    );
  };

  return (
    <AdminLayout>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Blog Post"
        message="Delete this blog post entry?"
        onConfirm={async () => {
          try {
            await adminApi.deleteBlogPost(deleteId!);
            toast({
              title: "Success",
              description: "Blog post deleted successfully!",
            });
            setDeleteId(null);
            load();
          } catch (err: any) {
            toast({
              title: "Error",
              description: `Failed to delete: ${err.message}`,
              variant: "destructive",
            });
            setDeleteId(null);
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="ri-article-line"></i>
          Blog Posts
        </h1>
        <button
          onClick={() => {
            setForm({
              title: "",
              description: "",
              url: "",
              date: "",
              category: "",
              icon: "ri-file-text-line",
              imageUrl: "",
              order: 0,
            });
            setEditId(null);
            setShowForm(true);
            setFieldErrors({});
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line" /> Add Blog Post
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 bg-gray-900 border border-emerald-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            {editId ? "Edit" : "New"} Blog Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {fieldErrors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <i className="ri-error-warning-line" />
                {fieldErrors.submit}
              </div>
            )}

            {/* Title and Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="inline-flex text-sm text-gray-300 mb-2 items-center gap-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                    fieldErrors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  }`}
                  placeholder="Blog post title"
                />
                {fieldErrors.title && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <i className="ri-error-warning-line text-xs" />
                    {fieldErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="inline-flex text-sm text-gray-300 mb-2 items-center gap-1">
                  Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                    fieldErrors.category
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  }`}
                  placeholder="e.g., Tutorial, Snippet"
                />
                {fieldErrors.category && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <i className="ri-error-warning-line text-xs" />
                    {fieldErrors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="inline-flex text-sm text-gray-300 mb-2 items-center gap-1">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none resize-none transition-colors ${
                  fieldErrors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700 focus:border-emerald-500"
                }`}
                placeholder="Blog post description..."
              />
              {fieldErrors.description && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <i className="ri-error-warning-line text-xs" />
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {/* URL and Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="inline-flex text-sm text-gray-300 mb-2 items-center gap-1">
                  URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, url: e.target.value }))
                  }
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                    fieldErrors.url
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  }`}
                  placeholder="https://example.com/blog"
                />
                {fieldErrors.url && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <i className="ri-error-warning-line text-xs" />
                    {fieldErrors.url}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Display Date
                </label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="June 5, 2024"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Header Image URL (Optional)
              </label>
              <input
                type="url"
                value={form.imageUrl || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors ${
                  fieldErrors.imageUrl
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {fieldErrors.imageUrl && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <i className="ri-error-warning-line text-xs" />
                  {fieldErrors.imageUrl}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use icon. If provided, image takes precedence.
              </p>

              {form.imageUrl && (
                <div className="mt-4">
                  <div className="text-xs text-gray-400 mb-2">Preview</div>
                  <div className="w-48 h-28 rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                    <img
                      src={form.imageUrl}
                      alt="Blog preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Icon Selector */}
            <div>
              <label className="block text-sm text-gray-300 mb-3">
                Icon (Used if no image URL)
              </label>
              <div
                className={`grid grid-cols-4 sm:grid-cols-6 gap-2 ${
                  form.imageUrl ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {ICON_OPTIONS.map((iconClass) => (
                  <button
                    key={iconClass}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, icon: iconClass }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      form.icon === iconClass
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-gray-700 hover:border-emerald-500/50"
                    }`}
                    title={iconClass}
                  >
                    <i className={`${iconClass} text-xl text-gray-300`}></i>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selected: {form.icon}
              </p>
              {form.imageUrl && (
                <p className="text-xs text-amber-400 mt-1">
                  Icon selection is disabled while an image URL is present.
                </p>
              )}
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((p) => ({ ...p, order: +e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFieldErrors({});
                }}
                disabled={submitting}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded-lg disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 rounded-lg font-semibold disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Saving…
                  </>
                ) : editId ? (
                  <>
                    <i className="ri-check-line" />
                    Update
                  </>
                ) : (
                  <>
                    <i className="ri-save-line" />
                    Create
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-24 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <i className="ri-inbox-line text-4xl mb-3 block opacity-50" />
          <p>No blog posts yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 flex gap-5 items-start justify-between transition-colors"
            >
              <div className="flex gap-4 flex-1">
                {getDisplayImage(item)}
                <div className="flex-1">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-gray-400 text-sm line-clamp-1 mt-1">
                    {item.description}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => {
                    setForm(item);
                    setEditId(item._id || null);
                    setShowForm(true);
                    setFieldErrors({});
                  }}
                  className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <i className="ri-edit-line" />
                </button>
                <button
                  onClick={() => setDeleteId(item._id || null)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
