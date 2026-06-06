import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { I as useAuth, E as updateProfile, g as changePassword, H as uploadAvatar, h as cn } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-oauth__google.mjs";
import { j as Camera, as as X, a2 as Pen, a7 as Save, U as Lock, r as CircleCheck, u as CircleX } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function ProfileTab() {
  const {
    user,
    setUser
  } = useAuth();
  if (!user) return null;
  const [editing, setEditing] = reactExports.useState(false);
  const [changingPw, setChangingPw] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    license: user.license ?? "",
    city: user.city ?? ""
  });
  const [pwForm, setPwForm] = reactExports.useState({
    currentPassword: "",
    newPassword: ""
  });
  const {
    mutate: saveProfile,
    isPending: saving
  } = useMutation({
    mutationFn: () => updateProfile(form),
    onSuccess: (res) => {
      setUser({
        ...user,
        ...res.data
      });
      setEditing(false);
      toast.success("Profile updated successfully!");
    },
    onError: () => toast.error("Failed to update profile")
  });
  const {
    mutate: savePw,
    isPending: savingPw
  } = useMutation({
    mutationFn: () => changePassword(pwForm.currentPassword, pwForm.newPassword),
    onSuccess: () => {
      setChangingPw(false);
      setPwForm({
        currentPassword: "",
        newPassword: ""
      });
      toast.success("Password changed successfully.");
    },
    onError: (err) => toast.error(err.message)
  });
  const {
    mutate: saveAvatar,
    isPending: savingAvatar
  } = useMutation({
    mutationFn: (file) => uploadAvatar(file),
    onSuccess: (res) => {
      setUser({
        ...user,
        ...res.data
      });
      toast.success("Profile picture updated!");
    },
    onError: (err) => toast.error(err.message)
  });
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      saveAvatar(e.target.files[0]);
    }
  };
  const fields = [{
    label: "Full name",
    key: "name"
  }, {
    label: "Email",
    key: "email"
  }, {
    label: "Phone",
    key: "phone"
  }, {
    label: "License #",
    key: "license"
  }, {
    label: "City",
    key: "city"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-ink mb-6", children: "Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pb-6 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative group h-20 w-20 rounded-full font-bold text-2xl inline-flex items-center justify-center overflow-hidden shrink-0", user.avatar ? "bg-background" : "gradient-brand text-white"), children: [
          user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: user.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: cn("absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity", savingAvatar ? "opacity-100" : "opacity-0 group-hover:opacity-100"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleAvatarChange, disabled: savingAvatar }),
            savingAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6 text-white" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-semibold text-ink", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5 capitalize", children: [
            user.role,
            " · Member since ",
            user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric"
            }) : "N/A"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing((s) => !s), className: "ml-auto h-10 px-5 rounded-full text-sm font-medium gradient-brand text-white flex items-center gap-2", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
          " Cancel"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }),
          " Edit"
        ] }) })
      ] }),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-x-8 gap-y-4 pt-6", children: [
        fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form[f.key], onChange: (e) => setForm((d) => ({
            ...d,
            [f.key]: e.target.value
          })), className: "mt-1 w-full h-11 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" })
        ] }, f.key)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => saveProfile(), disabled: saving, className: "h-10 px-6 rounded-full gradient-brand text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          " ",
          saving ? "Saving…" : "Save changes"
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-x-8 gap-y-5 pt-6", children: fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium text-ink", children: form[f.key] || "—" })
      ] }, f.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-semibold text-ink flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
          " Security"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setChangingPw((s) => !s), className: "text-sm text-primary font-medium", children: changingPw ? "Cancel" : "Change password" })
      ] }),
      changingPw && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Current password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: pwForm.currentPassword, onChange: (e) => setPwForm((d) => ({
            ...d,
            currentPassword: e.target.value
          })), className: "mt-1 w-full h-11 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "New password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: pwForm.newPassword, onChange: (e) => setPwForm((d) => ({
            ...d,
            newPassword: e.target.value
          })), className: "mt-1 w-full h-11 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => savePw(), disabled: savingPw, className: "h-10 px-6 rounded-full gradient-brand text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60", children: savingPw ? "Saving…" : "Update password" }) })
      ] }),
      !changingPw && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrefRow, { label: "Email notifications", enabled: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrefRow, { label: "SMS updates", enabled: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrefRow, { label: "Marketing emails" })
      ] })
    ] })
  ] });
}
function PrefRow({
  label,
  enabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: label }),
    enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 text-muted-foreground/50" })
  ] });
}
export {
  ProfileTab as component
};
