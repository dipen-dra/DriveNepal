import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as CircleCheck, q as CircleAlert } from "../_libs/lucide-react.mjs";
function validatePasswordStrength(password) {
  const feedback = [];
  let strengthScore = 0;
  if (password.length < 10) {
    feedback.push("At least 10 characters");
  } else {
    strengthScore++;
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("At least one uppercase letter (A-Z)");
  } else {
    strengthScore++;
  }
  if (!/[a-z]/.test(password)) {
    feedback.push("At least one lowercase letter (a-z)");
  } else {
    strengthScore++;
  }
  if (!/[0-9]/.test(password)) {
    feedback.push("At least one number (0-9)");
  } else {
    strengthScore++;
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    feedback.push("At least one special character (!@#$%...)");
  } else {
    strengthScore++;
  }
  const isValid = feedback.length === 0;
  let strength = "weak";
  if (strengthScore >= 4) strength = "medium";
  if (strengthScore === 5) strength = "strong";
  return {
    isValid,
    strength,
    message: isValid ? "Password is strong ✓" : "Password needs improvements",
    feedback
  };
}
function PasswordStrength({ password, showRequirements = false }) {
  const validation = reactExports.useMemo(() => validatePasswordStrength(password), [password]);
  if (!password && !showRequirements) return null;
  const strengthColors = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500"
  };
  const strengthLabels = {
    weak: "Weak",
    medium: "Medium",
    strong: "Strong"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full transition-all ${strengthColors[validation.strength]}`,
          style: {
            width: validation.strength === "weak" ? "33%" : validation.strength === "medium" ? "66%" : "100%"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: strengthLabels[validation.strength] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 text-xs ${validation.isValid ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`, children: [
      validation.isValid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: validation.message })
    ] }),
    showRequirements && validation.feedback.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 border border-border rounded-lg p-3 space-y-2", children: validation.feedback.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-1 rounded-full bg-muted-foreground" }),
      req
    ] }, i)) })
  ] });
}
export {
  PasswordStrength as P,
  validatePasswordStrength as v
};
