module.exports = {
	env: {
		node: true,
	},
	extends: [
		'plugin:@wordpress/eslint-plugin/custom',
		'plugin:@wordpress/eslint-plugin/es5',
		'plugin:@wordpress/eslint-plugin/esnext',
		'plugin:@wordpress/eslint-plugin/jsdoc',
		'plugin:@wordpress/eslint-plugin/i18n',
		'plugin:@wordpress/eslint-plugin/test-e2e',
		'plugin:@wordpress/eslint-plugin/test-unit',
	],
};
