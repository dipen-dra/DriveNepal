import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as getVehicles, m as deleteVehicle, C as ConfirmModal, G as updateVehicle, j as createVehicle } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-oauth__google.mjs";
import { a9 as Search, a4 as Plus, a2 as Pen, al as Trash2, as as X, a7 as Save } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function VehiclesTab() {
  const queryClient = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editVehicle, setEditVehicle] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["vehicles", "all"],
    queryFn: () => getVehicles({})
  });
  const vehicles = (data?.data ?? []).filter((v) => v.name.toLowerCase().includes(q.toLowerCase()));
  const {
    mutate: doDelete
  } = useMutation({
    mutationFn: (id) => deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles"]
      });
      toast.success("Vehicle deleted successfully");
    },
    onError: () => toast.error("Failed to delete vehicle")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search vehicles…", className: "w-full h-10 pl-10 pr-4 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setEditVehicle(null);
        setShowModal(true);
      }, className: "h-10 px-5 inline-flex items-center gap-2 rounded-full gradient-brand text-white text-sm font-medium shadow-[var(--shadow-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add vehicle"
      ] })
    ] }),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleModal, { vehicle: editVehicle, onClose: () => setShowModal(false), onSaved: () => {
      setShowModal(false);
      queryClient.invalidateQueries({
        queryKey: ["vehicles"]
      });
      toast.success(editVehicle ? "Vehicle updated successfully" : "Vehicle created successfully");
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card shadow-soft overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-muted-foreground", children: "Loading vehicles…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Vehicle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Price / day" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-muted/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.image, alt: "", className: "h-10 w-14 rounded-md object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-ink", children: v.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: v.brand })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 capitalize", children: [
          v.type,
          " · ",
          v.category
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-medium text-ink", children: [
          "NPR ",
          v.pricePerDay.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: v.location }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
          v.rating,
          " ★ ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "(",
            v.reviews,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setEditVehicle(v);
            setShowModal(true);
          }, className: "h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmModal, { title: "Delete Vehicle", description: `Are you sure you want to delete ${v.name}? This action cannot be undone.`, onConfirm: () => doDelete(v._id), confirmText: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) })
        ] }) })
      ] }, v._id)) })
    ] }) })
  ] });
}
function VehicleModal({
  vehicle,
  onClose,
  onSaved
}) {
  const isEdit = !!vehicle;
  const [form, setForm] = reactExports.useState({
    slug: vehicle?.slug ?? "",
    name: vehicle?.name ?? "",
    brand: vehicle?.brand ?? "",
    type: vehicle?.type ?? "car",
    category: vehicle?.category ?? "",
    pricePerDay: vehicle?.pricePerDay ?? 0,
    fuel: vehicle?.fuel ?? "Petrol",
    transmission: vehicle?.transmission ?? "Automatic",
    seats: vehicle?.seats ?? 5,
    location: vehicle?.location ?? "Kathmandu",
    description: vehicle?.description ?? "",
    features: vehicle?.features?.join(", ") ?? "",
    isAvailable: vehicle?.isAvailable ?? true
  });
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [galleryFiles, setGalleryFiles] = reactExports.useState([]);
  const [error, setError] = reactExports.useState(null);
  const {
    mutate,
    isPending
  } = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (!isEdit) {
        throw new Error("Main image is required");
      }
      galleryFiles.forEach((file) => {
        formData.append("gallery", file);
      });
      return isEdit ? updateVehicle(vehicle._id, formData) : createVehicle(formData);
    },
    onSuccess: onSaved,
    onError: (err) => {
      setError(err.message);
      toast.error(err.message);
    }
  });
  const F = ({
    label,
    k,
    type = "text"
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value: String(form[k]), onChange: (e) => setForm((d) => ({
      ...d,
      [k]: e.target.value
    })), className: "mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    scale: 0.95
  }, animate: {
    opacity: 1,
    scale: 1
  }, className: "w-full max-w-2xl rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] p-6 max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-ink", children: isEdit ? "Edit vehicle" : "Add vehicle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-xl", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Slug", k: "slug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Name", k: "name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Brand", k: "brand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.type, onChange: (e) => setForm((d) => ({
          ...d,
          type: e.target.value
        })), className: "mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "car", children: "Car" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bike", children: "Bike" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Category", k: "category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Price per day (NPR)", k: "pricePerDay", type: "number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Fuel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.fuel, onChange: (e) => setForm((d) => ({
          ...d,
          fuel: e.target.value
        })), className: "mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm", children: ["Petrol", "Diesel", "Electric", "Hybrid"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: f }, f)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Transmission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.transmission, onChange: (e) => setForm((d) => ({
          ...d,
          transmission: e.target.value
        })), className: "mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Automatic" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Manual" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Seats", k: "seats", type: "number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Location", k: "location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
          "Main Image ",
          isEdit && "(Leave blank to keep current)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setImageFile(e.target.files?.[0] || null), className: "mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Gallery Images (Up to 5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", multiple: true, onChange: (e) => setGalleryFiles(Array.from(e.target.files || [])), className: "mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Features (comma-separated)", k: "features" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => setForm((d) => ({
          ...d,
          description: e.target.value
        })), rows: 3, className: "mt-1 w-full px-3 py-2 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm resize-none" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "h-10 px-5 rounded-full border border-border text-sm font-medium hover:bg-muted", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => mutate(), disabled: isPending, className: "h-10 px-5 rounded-full gradient-brand text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
        " ",
        isPending ? "Saving…" : "Save"
      ] })
    ] })
  ] }) });
}
export {
  VehiclesTab as component
};
