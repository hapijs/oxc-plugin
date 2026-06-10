import type { Plugin } from 'vitest/config';

export interface Options {
    /**
     * Run the oxlint checks.
     *
     * @default true
     */
    oxlint?: boolean;
    /**
     * Run the oxfmt checks.
     *
     * @default true
     */
    oxfmt?: boolean;
    /**
     * Working directory the checks run against.
     *
     * @default process.cwd()
     */
    cwd?: string;
}

/** Vitest plugin that runs the hapi oxlint and oxfmt checks as a test project. */
declare function plugin(options?: Options): Plugin;

export default plugin;
