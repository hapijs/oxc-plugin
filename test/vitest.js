import Path from 'node:path';

import { describe, it } from 'vitest';

import OxcVitest from '../src/vitest.js';

const internals = {};

internals.inject = async function (plugin) {
    const injected = [];
    const context = {
        injectTestProjects(config) {
            injected.push(config);
            return Promise.resolve([]);
        },
    };

    await plugin.configureVitest(context);
    return injected;
};

describe('vitest plugin', () => {
    it('returns a valid plugin', ({ expect }) => {
        const plugin = OxcVitest();

        expect(plugin.name).toBe('@hapi/oxc-plugin:vitest');
        expect(plugin.configureVitest).toBeTypeOf('function');
    });

    it('injects a test project with default options', async ({ expect }) => {
        const plugin = OxcVitest();
        const injected = await internals.inject(plugin);

        expect(injected).toHaveLength(1);
        expect(injected[0].test.name).toBe('@hapi/oxc-plugin');
        expect(injected[0].test.include).toHaveLength(1);
        expect(injected[0].test.include[0]).toMatch(/vitest\.test\.js$/);
        expect(injected[0].define.__HAPI_OXC_OXLINT__).toBe(true);
        expect(injected[0].define.__HAPI_OXC_OXFMT__).toBe(true);
        expect(injected[0].define.__HAPI_OXC_CWD__).toBe('null');
    });

    it('passes custom options to the injected project', async ({ expect }) => {
        const plugin = OxcVitest({ oxlint: false, oxfmt: false, cwd: '/custom/path' });
        const injected = await internals.inject(plugin);

        expect(injected[0].define.__HAPI_OXC_OXLINT__).toBe(false);
        expect(injected[0].define.__HAPI_OXC_OXFMT__).toBe(false);
        expect(injected[0].define.__HAPI_OXC_CWD__).toBe('"/custom/path"');
    });

    it('includes the test file from the src directory', async ({ expect }) => {
        const plugin = OxcVitest();
        const injected = await internals.inject(plugin);

        const expectedPath = Path.join(import.meta.dirname, '..', 'src', 'vitest.test.js');
        expect(injected[0].test.include[0]).toBe(expectedPath);
    });
});
