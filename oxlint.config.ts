import HapiRecommended from '@hapi/oxc-plugin/oxlint';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [HapiRecommended],
    env: {
        ...HapiRecommended.env,
    },
    globals: {
        __HAPI_OXC_OXLINT__: 'readonly',
        __HAPI_OXC_OXFMT__: 'readonly',
        __HAPI_OXC_CWD__: 'readonly',
    },
    ignorePatterns: ['test/configs/fixtures/**'],
});
