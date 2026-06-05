import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  validateProfile,
  validateSkill,
  validateProject,
  validateExperience,
  validateEducation,
  validateCertification,
  validateTestimonial,
  validateBlogPost,
  validateTerminalCommand,
} from "@/lib/validation";

interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "url";
  placeholder?: string;
  span2?: boolean;
  required?: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

interface Props {
  title: string;
  getItems: () => Promise<any>;
  createItem: (d: any) => Promise<any>;
  updateItem: (id: string, d: any) => Promise<any>;
  deleteItem: (id: string) => Promise<any>;
  fields: FieldDef[];
  emptyForm: Record<string, any>;
  renderCard: (item: any) => React.ReactNode;
  validator?: (data: any) => { isValid: boolean; errors: ValidationError[] };
}

function AdminGeneric({
  title,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  fields,
  emptyForm,
  renderCard,
  validator,
}: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const load = () =>
    getItems()
      .then((d: any) => setItems(d))
      .catch((err) => {
        toast({
          title: "Error",
          description: `Failed to load ${title.toLowerCase()}: ${err.message}`,
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

    // Validate form
    if (validator) {
      const result = validator(form);
      if (!result.isValid) {
        const errors: Record<string, string> = {};
        result.errors.forEach((err) => {
          errors[err.field] = err.message;
        });
        setFieldErrors(errors);
        toast({
          title: "Validation Error",
          description: `Please fix the errors in the form`,
          variant: "destructive",
        });
        return;
      }
    }

    setSubmitting(true);
    try {
      if (editId) {
        await updateItem(editId, form);
        toast({
          title: "Success",
          description: `${title} updated successfully!`,
        });
      } else {
        await createItem(form);
        toast({
          title: "Success",
          description: `${title} created successfully!`,
        });
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      load();
    } catch (err: any) {
      const errorMsg = err.message || `Failed to save ${title.toLowerCase()}`;
      console.error("Form submission error:", err);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
      setFieldErrors({ submit: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <ConfirmDialog
        open={!!deleteId}
        title={`Delete ${title}`}
        message={`Delete this ${title.toLowerCase()} entry?`}
        onConfirm={async () => {
          try {
            await deleteItem(deleteId!);
            toast({
              title: "Success",
              description: `${title} deleted successfully!`,
            });
            setDeleteId(null);
            load();
          } catch (err: any) {
            toast({
              title: "Error",
              description: `Failed to delete ${title.toLowerCase()}: ${
                err.message
              }`,
              variant: "destructive",
            });
            setDeleteId(null);
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowForm(true);
            setFieldErrors({});
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line" /> Add
        </button>
      </div>

      {showForm && (
        <div className="mb-5 bg-gray-900 border border-emerald-500/30 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">
            {editId ? "Edit" : "New"} {title}
          </h2>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            {fieldErrors.submit && (
              <div className="sm:col-span-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <i className="ri-error-warning-line" />
                {fieldErrors.submit}
              </div>
            )}
            {fields.map((f) => (
              <div
                key={f.key}
                className={
                  f.span2 || f.type === "textarea" ? "sm:col-span-2" : ""
                }
              >
                <label className="inline-flex text-sm text-gray-300 mb-1 items-center gap-1">
                  {f.label}
                  {f.required && <span className="text-red-400">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <>
                    <textarea
                      value={form[f.key] ?? ""}
                      rows={3}
                      placeholder={f.placeholder}
                      onChange={(e) =>
                        setForm((p: any) => ({ ...p, [f.key]: e.target.value }))
                      }
                      className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none resize-none transition-colors ${
                        fieldErrors[f.key]
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-700 focus:border-emerald-500"
                      }`}
                    />
                    {fieldErrors[f.key] && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <i className="ri-error-warning-line text-xs" />
                        {fieldErrors[f.key]}
                      </p>
                    )}
                  </>
                ) : f.type === "checkbox" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form[f.key] ?? false}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          [f.key]: e.target.checked,
                        }))
                      }
                      className="accent-emerald-500 w-4 h-4 mt-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-400">{f.label}</span>
                  </div>
                ) : (
                  <>
                    <input
                      type={f.type || "text"}
                      value={form[f.key] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) =>
                        setForm((p: any) => ({
                          ...p,
                          [f.key]:
                            f.type === "number"
                              ? +e.target.value
                              : e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                        fieldErrors[f.key]
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-700 focus:border-emerald-500"
                      }`}
                    />
                    {fieldErrors[f.key] && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <i className="ri-error-warning-line text-xs" />
                        {fieldErrors[f.key]}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="sm:col-span-2 flex gap-3">
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
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-20 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <i className="ri-inbox-Line text-4xl mb-3 block opacity-50" />
          <p>No {title.toLowerCase()} yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 flex items-start justify-between transition-colors"
            >
              <div className="flex-1">{renderCard(item)}</div>
              <div className="flex gap-1 ml-4 flex-shrink-0">
                <button
                  onClick={() => {
                    const normalized = {
                      ...item,
                      points: Array.isArray(item.points)
                        ? item.points.join(", ")
                        : item.points,
                    };
                    setForm(normalized);
                    setEditId(item._id);
                    setShowForm(true);
                    setFieldErrors({});
                  }}
                  className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <i className="ri-edit-line" />
                </button>
                <button
                  onClick={() => setDeleteId(item._id)}
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

// ── Education ─────────────────────────────────────────────────────────────────
export function AdminEducation() {
  return (
    <AdminGeneric
      title="Education"
      getItems={adminApi.getEducation}
      createItem={adminApi.createEducation}
      updateItem={adminApi.updateEducation}
      deleteItem={adminApi.deleteEducation}
      emptyForm={{
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        order: 0,
      }}
      fields={[
        { key: "institution", label: "Institution", required: true },
        { key: "degree", label: "Degree", required: true },
        { key: "field", label: "Field of Study", required: true },
        {
          key: "startDate",
          label: "Start Date (YYYY-MM)",
          placeholder: "2015-09",
          required: true,
        },
        { key: "endDate", label: "End Date (YYYY-MM)", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "current", label: "Currently Studying", type: "checkbox" },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      validator={(data) =>
        validateEducation({
          school: data.institution,
          degree: data.degree,
          field: data.field,
          startDate: data.startDate,
          endDate: data.endDate,
        })
      }
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">
            {item.degree} in {item.field}
          </p>
          <p className="text-emerald-400 text-sm">{item.institution}</p>
          <p className="text-gray-500 text-xs mt-0.5">
            {item.startDate} → {item.current ? "Present" : item.endDate}
          </p>
        </>
      )}
    />
  );
}

// ── Certifications ────────────────────────────────────────────────────────────
export function AdminCertifications() {
  return (
    <AdminGeneric
      title="Certifications"
      getItems={adminApi.getCertifications}
      createItem={adminApi.createCertification}
      updateItem={adminApi.updateCertification}
      deleteItem={adminApi.deleteCertification}
      emptyForm={{
        name: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: "",
        imageUrl: "",
        order: 0,
      }}
      fields={[
        { key: "name", label: "Certification Name", required: true },
        { key: "issuer", label: "Issuing Organization", required: true },
        {
          key: "issueDate",
          label: "Issue Date (YYYY-MM)",
          placeholder: "2020-06",
          required: true,
        },
        { key: "expiryDate", label: "Expiry Date (YYYY-MM)" },
        { key: "credentialId", label: "Credential ID" },
        { key: "credentialUrl", label: "Credential URL", type: "url" },
        { key: "imageUrl", label: "Badge Image URL", type: "url" },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      validator={(data) =>
        validateCertification({
          name: data.name,
          issuer: data.issuer,
          issuedDate: data.issueDate,
        })
      }
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-emerald-400 text-sm">{item.issuer}</p>
          <p className="text-gray-500 text-xs mt-0.5">
            Issued: {item.issueDate}
            {item.expiryDate ? ` · Expires: ${item.expiryDate}` : ""}
          </p>
          {item.credentialId && (
            <p className="text-gray-600 text-xs">ID: {item.credentialId}</p>
          )}
        </>
      )}
    />
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function AdminTestimonials() {
  return (
    <AdminGeneric
      title="Testimonials"
      getItems={adminApi.getTestimonials}
      createItem={adminApi.createTestimonial}
      updateItem={adminApi.updateTestimonial}
      deleteItem={adminApi.deleteTestimonial}
      emptyForm={{
        name: "",
        role: "",
        company: "",
        content: "",
        avatarUrl: "",
        rating: 5,
        order: 0,
      }}
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "role", label: "Job Role", required: true },
        { key: "company", label: "Company", required: true },
        {
          key: "content",
          label: "Testimonial Text",
          type: "textarea",
          span2: true,
          required: true,
        },
        { key: "avatarUrl", label: "Avatar URL", type: "url" },
        {
          key: "rating",
          label: "Rating (1–5)",
          type: "number",
          required: true,
        },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      validator={(data) =>
        validateTestimonial({
          author: data.name,
          content: data.content,
          rating: data.rating,
        })
      }
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-gray-400 text-sm">
            {item.role} @ {item.company}
          </p>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            "{item.content}"
          </p>
          <p className="text-yellow-400 text-xs mt-1">
            {"★".repeat(item.rating)}
            {"☆".repeat(5 - item.rating)}
          </p>
        </>
      )}
    />
  );
}

// ── Blog Posts ───────────────────────────────────────────────────────────────
export function AdminBlogPosts() {
  return (
    <AdminGeneric
      title="Blog Posts"
      getItems={adminApi.getBlogPosts}
      createItem={adminApi.createBlogPost}
      updateItem={adminApi.updateBlogPost}
      deleteItem={adminApi.deleteBlogPost}
      emptyForm={{
        title: "",
        description: "",
        url: "",
        date: "",
        category: "",
        icon: "ri-file-text-line",
        order: 0,
      }}
      fields={[
        { key: "title", label: "Title", required: true },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          span2: true,
          required: true,
        },
        { key: "url", label: "URL", type: "url", required: true },
        { key: "date", label: "Display Date", required: true },
        { key: "category", label: "Category", required: true },
        { key: "icon", label: "Icon Class" },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      validator={(data) =>
        validateBlogPost({
          title: data.title,
          description: data.description,
          url: data.url,
          category: data.category,
        })
      }
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {item.date} · {item.category}
          </p>
        </>
      )}
    />
  );
}

// ── Process Steps ────────────────────────────────────────────────────────────
export function AdminProcessSteps() {
  return (
    <AdminGeneric
      title="Process Steps"
      getItems={adminApi.getProcessSteps}
      createItem={adminApi.createProcessStep}
      updateItem={adminApi.updateProcessStep}
      deleteItem={adminApi.deleteProcessStep}
      emptyForm={{
        title: "",
        description: "",
        icon: "ri-flow-chart",
        order: 0,
      }}
      fields={[
        { key: "title", label: "Title" },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          span2: true,
        },
        { key: "icon", label: "Icon Class" },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
          <p className="text-gray-500 text-xs mt-1">{item.icon}</p>
        </>
      )}
    />
  );
}

// ── Testing Approaches ───────────────────────────────────────────────────────
export function AdminTestingApproaches() {
  return (
    <AdminGeneric
      title="Testing Approaches"
      getItems={adminApi.getTestingApproaches}
      createItem={adminApi.createTestingApproach}
      updateItem={adminApi.updateTestingApproach}
      deleteItem={adminApi.deleteTestingApproach}
      emptyForm={{
        key: "",
        title: "",
        icon: "ri-check-line",
        points: "",
        order: 0,
      }}
      fields={[
        { key: "key", label: "Unique Key" },
        { key: "title", label: "Title" },
        { key: "icon", label: "Icon Class" },
        {
          key: "points",
          label: "Points (comma separated)",
          type: "textarea",
          span2: true,
        },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="text-gray-500 text-xs mt-1">key: {item.key}</p>
          <p className="text-gray-400 text-sm mt-1">
            {
              (Array.isArray(item.points)
                ? item.points
                : String(item.points || "").split(",")
              ).length
            }{" "}
            points
          </p>
        </>
      )}
    />
  );
}

// ── Terminal Commands ───────────────────────────────────────────────────────
export function AdminTerminalCommands() {
  return (
    <AdminGeneric
      title="Terminal Commands"
      getItems={adminApi.getTerminalCommands}
      createItem={adminApi.createTerminalCommand}
      updateItem={adminApi.updateTerminalCommand}
      deleteItem={adminApi.deleteTerminalCommand}
      emptyForm={{
        command: "",
        description: "",
        output: "",
        category: "Custom",
        active: true,
        order: 0,
      }}
      fields={[
        { key: "command", label: "Command", required: true },
        { key: "description", label: "Description", required: true },
        {
          key: "output",
          label: "Output",
          type: "textarea",
          span2: true,
          required: true,
        },
        { key: "category", label: "Category" },
        { key: "active", label: "Active", type: "checkbox" },
        { key: "order", label: "Sort Order", type: "number" },
      ]}
      validator={validateTerminalCommand}
      renderCard={(item) => (
        <>
          <p className="font-semibold text-white">{item.command}</p>
          <p className="text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {item.output}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {item.category || "Custom"} ·{" "}
            {item.active === false ? "Hidden" : "Visible"}
          </p>
        </>
      )}
    />
  );
}
