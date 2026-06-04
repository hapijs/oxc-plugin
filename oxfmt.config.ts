import { defineConfig } from 'oxfmt';

import DefaultOxfmtConfig from './src/configs/oxfmt.config.js';

export default defineConfig({
    ...DefaultOxfmtConfig,
    ignorePatterns: [...DefaultOxfmtConfig.ignorePatterns, 'test/configs/fixtures/**'],
});
