import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: { ...globals.node, ...globals.jest } } },
    pluginJs.configs.recommended,
    {
        rules: {
            camelcase: ["warn", { properties: "never", ignoreDestructuring: false }],
            "max-len": ["warn", { code: 140 }],
        },
    },
];