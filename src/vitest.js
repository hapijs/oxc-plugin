import * as Path from 'node:path';

export default function (options = {}) {
    const { oxlint = true, oxfmt = true, cwd } = options;

    return {
        name: '@hapi/oxc-plugin:vitest',
        async configureVitest({ injectTestProjects }) {
            await injectTestProjects({
                define: {
                    __HAPI_OXC_OXLINT__: oxlint,
                    __HAPI_OXC_OXFMT__: oxfmt,
                    __HAPI_OXC_CWD__: JSON.stringify(cwd ?? null),
                },
                test: {
                    name: '@hapi/oxc-plugin',
                    include: [Path.join(import.meta.dirname, 'vitest.test.js')],
                },
            });
        },
    };
}
