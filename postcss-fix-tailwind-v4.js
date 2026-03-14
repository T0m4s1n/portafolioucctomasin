module.exports = (opts = {}) => {
  return {
    postcssPlugin: "postcss-fix-tailwind-v4",
    Declaration(decl) {
      // Fix transition-property: remove --tw-* variables which W3C validator hates
      if (decl.prop === "transition-property" || decl.prop === "transition") {
        if (decl.value.includes("--tw-")) {
          decl.value = decl.value
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v && !v.startsWith("--tw-"))
            .join(", ");
        }
      }
      // Fix colors: manually handle remaining color-mix and display-p3 if needed
      if (decl.value.includes("color(display-p3") || decl.value.includes("color-mix(")) {
        // Fix display-p3
        decl.value = decl.value.replace(/color\(display-p3\s+([^)]+)\)/g, (match, p1) => {
          const parts = p1.trim().split(/\s+/);
          if (parts.length >= 3) {
            return `rgb(${parts.slice(0, 3).join(", ")})`;
          }
          return "currentColor";
        });
        
        // Fix color-mix for the validator
        // We look for the first color argument after 'in <colorspace>,'
        decl.value = decl.value.replace(/color-mix\(\s*in\s+[^,]+,\s*([^,/%]+)(?:\s+[\d.]+%|var\([^)]+\))?\s*,[^)]+\)/g, "$1");
      }
    },
    Rule(rule) {
      // Fix specificity hacks: remove :not(#\#)
      if (rule.selector.includes(":not(#")) {
        rule.selector = rule.selector.replace(/:not\(#[^)]+\)/g, "");
      }
    },
    AtRule(atRule) {
      // Ensure @property and @layer are gone
      if (atRule.name === "property" || atRule.name === "layer") {
        atRule.remove();
      }
    },
  };
};
module.exports.postcss = true;
