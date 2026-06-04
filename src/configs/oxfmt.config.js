import { defineConfig } from 'oxfmt';

export default defineConfig({
    // Non-source files that should not be reformatted in consumer repos. oxfmt
    // otherwise rewrites LICENSE.md and CI workflow YAML on first adoption.
    ignorePatterns: ['LICENSE.md', '.github/**'],
    singleQuote: true,
    tabWidth: 4,
    printWidth: 120,
    jsdoc: {},
    sortImports: {
        ignoreCase: true,
        newlinesBetween: false,
        sortSideEffects: true,
        groups: [
            'side_effect',
            { newlinesBetween: true },
            'value-builtin',
            { newlinesBetween: true },
            'external',
            { newlinesBetween: true },
            'internal',
            { newlinesBetween: true },
            'value-index',
            'sibling',
            'parent',
            { newlinesBetween: true },
            'type-builtin',
            'type-external',
            'type-internal',
            'type-index',
            'type-sibling',
            'type-parent',
            'type-import',
            'unknown',
        ],
    },
    sortPackageJson: true,
});
