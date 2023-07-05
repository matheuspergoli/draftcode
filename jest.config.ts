import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: [
		'<rootDir>/src/presentation/components/**/*.(ts|tsx)',
		'<rootDir>/src/hooks/**/*'
	],

	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['/node_modules/', 'index\\.ts'],

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',

	// An array of directory names to be searched recursively up from the requiring module's location
	moduleDirectories: ['node_modules'],

	// An array of file extensions your modules use
	moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],

	// The root directory that Jest should scan for tests and modules within
	rootDir: '.',

	// A list of paths to directories that Jest should use to search for files in
	roots: ['<rootDir>/src'],

	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	// The test environment that will be used for testing
	testEnvironment: 'jsdom',

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)']

	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	// modulePathIgnorePatterns: [],

	// The paths to modules that run some code to configure or set up the testing environment before each test
	// setupFiles: [],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	// testPathIgnorePatterns: [
	//   "/node_modules/"
	// ],

	// The regexp pattern or array of patterns that Jest uses to detect test files
	// testRegex: [],
}

export default createJestConfig(customJestConfig)
