module.exports = () => ({
	testFramework: 'jest',

	files: [
		'**/!(*.test).js',
		'!node_modules/**',
	],

	tests: [
		'**/*.test.js',
		'!node_modules/**',
	],

	env: {
		type: 'node',
	},

	filesWithNoCoverageCalculated: [
		'**/*.conf.js',
	],
});