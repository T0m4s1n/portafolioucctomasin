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
      // Fix colors that might have failed to transform correctly or are using non-standard notation
      if (decl.value.includes("color(display-p3")) {
        // If postcss-preset-env didn't catch it, it might be in a place it doesn't look.
        // But preset-env should have handled it.
      }
    },
    Rule(rule) {
      // Fix specificity hacks: remove :not(#\#)
      // Tailwind v4 uses this to ensure its utilities override base styles
      if (rule.selector.includes(":not(#\\#)")) {
        rule.selector = rule.selector.replace(/:not\(#\\#\)/g, "");
      }
    },
    AtRule(atRule) {
      // Ensure @property is gone (redundant if postcss-remove-at-rules is used, but safe)
      if (atRule.name === "property") {
        atRule.remove();
      }
    },
  };
};
module.exports.postcss = true;
