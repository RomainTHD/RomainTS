module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb-base",
		"airbnb-typescript/base",
		"plugin:@typescript-eslint/recommended",
		"standard-with-typescript",
		"plugin:prettier/recommended",
		"plugin:json/recommended",
	],
	overrides: [],
	parserOptions: {
		project: ["./tsconfig.json"],
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "import"],
	rules: {
		eqeqeq: 2, // error
		"newline-per-chained-call": "error",
		"@typescript-eslint/space-before-function-paren": "off",
		"@typescript-eslint/comma-dangle": "off",
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/no-empty-interface": [
			"error",
			{
				allowSingleExtends: true,
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_", // https://github.com/typescript-eslint/typescript-eslint/issues/1054
			},
		],
		"@typescript-eslint/no-explicit-any": ["error"],
		"@typescript-eslint/no-useless-constructor": "error",
		"@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: true }],
		"@typescript-eslint/no-shadow": ["warn"],
		"no-throw-literal": "off",
		"@typescript-eslint/no-throw-literal": ["error"],
		"@typescript-eslint/no-namespace": ["error"],
		"@typescript-eslint/consistent-type-assertions": [
			"error",
			{ assertionStyle: "as", objectLiteralTypeAssertions: "never" },
		],
	},
};
