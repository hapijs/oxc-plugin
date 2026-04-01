import { defineConfig } from 'vitest/config';

import Oxc from './src/vitest.js';

export default defineConfig({
    plugins: [Oxc()],
    test: {
        environment: 'node',
        include: ['test/**/*.js'],
        exclude: ['test/configs/fixtures/**', 'test/configs/common.js'],
        coverage: {
            enabled: true,
            provider: 'v8',
            all: true,
            thresholds: {
                functions: 100,
                lines: 100,
                branches: 100,
                statements: 100,
            },
            reportsDirectory: './coverage',
            reporter: ['text', 'lcov'],
            exclude: ['test/**', 'dist/**', '**/*.d.ts'],
        },
    },
});
