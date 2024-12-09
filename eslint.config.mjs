import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import reacthooks from "eslint-plugin-react-hooks";
import tailwind from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config({
	files: ['**/*.{js,cjs,jsx,ts,tsx}'],
	extends: [
		eslint.configs.recommended,
		tseslint.configs.stylisticTypeChecked,
		tseslint.configs.recommendedTypeChecked,
		jsxA11y.flatConfigs.recommended,
		tailwind.configs["flat/recommended"],
		prettier,
	],
		ignores: ["node_modules", ".react-router"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
    plugins: { "react-hooks": reacthooks,
      "react-compiler": reactCompiler,
    },
		rules: {
			"no-throw-literal": "off",
			"@typescript-eslint/only-throw-error": "off",
      ...reacthooks.configs.recommended.rules,
        "react-compiler/react-compiler": "error",
			"tailwindcss/no-custom-classname": "off",
		},

});
