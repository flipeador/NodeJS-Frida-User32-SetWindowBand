// ESLint Flat Configuration File.
// https://eslint.org/docs/latest/use/configure/configuration-files

// Tool for inspecting ESLint flat configs.
// https://github.com/eslint/config-inspector
// pnpm dlx @eslint/config-inspector

// Global identifiers from different JavaScript environments.
// https://github.com/sindresorhus/globals
import globals from 'globals';

// Stylistic Formatting for ESLint.
// https://eslint.style/packages/default
import stylistic from '@stylistic/eslint-plugin';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            globals: globals.node
        },
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            'constructor-super': 'error',
            'for-direction': 'error',
            'getter-return': 'error',
            'no-case-declarations': 'error',
            'no-class-assign': 'error',
            'no-compare-neg-zero': 'error',
            'no-const-assign': 'error',
            'no-constant-binary-expression': 'error',
            'no-constant-condition': 'error',
            'no-delete-var': 'error',
            'no-dupe-args': 'error',
            'no-dupe-class-members': 'error',
            'no-dupe-else-if': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-empty': 'error',
            'no-empty-character-class': 'error',
            'no-empty-pattern': 'error',
            'no-empty-static-block': 'error',
            'no-extra-boolean-cast': 'error',
            'no-global-assign': 'error',
            'no-invalid-regexp': 'error',
            'no-irregular-whitespace': 'error',
            'no-loss-of-precision': 'error',
            'no-misleading-character-class': 'error',
            'no-new-native-nonconstructor': 'error',
            'no-nonoctal-decimal-escape': 'error',
            'no-obj-calls': 'error',
            'no-octal': 'error',
            'no-redeclare': 'error',
            'no-regex-spaces': 'error',
            'no-self-assign': 'error',
            'no-setter-return': 'error',
            'no-this-before-super': 'error',
            'no-undef': 'error',
            'no-unexpected-multiline': 'error',
            'no-unreachable': 'error',
            'no-unsafe-finally': 'error',
            'no-unsafe-negation': 'error',
            'no-unsafe-optional-chaining': 'error',
            'no-unused-labels': 'warn',
            'no-unused-private-class-members': 'warn',
            'no-unused-vars': 'warn',
            'no-useless-backreference': 'error',
            'no-useless-catch': 'error',
            'no-useless-constructor': 'error',
            'no-useless-escape': 'error',
            'no-var': 'error',
            'no-with': 'error',
            'require-yield': 'error',
            'use-isnan': 'error',
            'valid-typeof': 'error',
            // ESLint Stylistic
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-floating-decimal': 'error',
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/no-tabs': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/no-whitespace-before-property': 'error',
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/semi-spacing': 'error',
            '@stylistic/semi-style': ['error', 'last'],
            '@stylistic/switch-colon-spacing': 'error'
        }
    },
    {
        files: ['src/scripts/**/*.js'],
        languageOptions: {
            globals: {
                ptr: 'readonly',
                send: 'readonly',
                recv: 'readonly',
                Memory: 'readonly',
                Module: 'readonly',
                Interceptor: 'readonly',
                SystemFunction: 'readonly'
            }
        },
    }
];
