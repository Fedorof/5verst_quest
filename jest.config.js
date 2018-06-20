module.exports = {
    // collectCoverageFrom: [
    //     'src/**/*.{js,jsx}'
    // ],
    setupFiles: [
        '<rootDir>/node_modules/react-scripts/config/polyfills.js'
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.js?(x)',
        '<rootDir>/src/**/?(*.)(spec|test).js'
    ],
    // testEnvironment: 'node',
    // testURL: 'http://localhost',
    transform: {
        '^.+es6-store/src/Store\\.js$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/node_modules/react-scripts/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/node_modules/react-scripts/config/jest/fileTransform.js'
    },
    // transformIgnorePatterns: [
    //     '<rootDir>/node_modules/(?!es6-store).+(js|jsx)$',
    //     '<rootDir>/src/.+test\\.(js|jsx)$'
    // ],
    // moduleFileExtensions: [
    //     'web.js',
    //     'js',
    //     'json',
    //     'web.jsx',
    //     'jsx',
    //     'node'
    // ],
    modulePaths: [
        '<rootDir>/node_modules'
    ]
};
