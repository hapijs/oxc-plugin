import * as Path from 'node:path';

export default function (options = {}) {
    const { oxlint = true, oxfmt = true, cwd } = options;

    return {
        name: '@hapi/oxc-plugin:vitest',
        async configureVitest({ project, injectTestProjects }) {
            await injectTestProjects({
                // Vitest 5 makes inline projects extend the declaring config by default, which
                // would run the host's own tests a 2nd time under this project.
                extends: false,
                define: {
                    __HAPI_OXC_OXLINT__: oxlint,
                    __HAPI_OXC_OXFMT__: oxfmt,
                    __HAPI_OXC_CWD__: JSON.stringify(cwd ?? null),
                },
                test: {
                    name: '@hapi/oxc-plugin',
                    include: [Path.join(import.meta.dirname, 'vitest.test.js')],
                    exclude: [],
                    // Without extending, our maxWorkers default ignores `vitest run` and follows the TTY,
                    // vitest 5 then refuses to group it with the host project.
                    maxWorkers: project.config.maxWorkers,
                },
            });
        },
    };
}
