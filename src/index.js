import { definePlugin } from '@oxlint/plugins';

import CapitalizeModules from './rules/capitalize-modules.js';
import ForLoop from './rules/for-loop.js';
import NoArrowception from './rules/no-arrowception.js';
import NoVar from './rules/no-var.js';

export default definePlugin({
    meta: {
        name: '@hapi',
    },
    rules: {
        'capitalize-modules': CapitalizeModules,
        'for-loop': ForLoop,
        'no-var': NoVar,
        'no-arrowception': NoArrowception,
    },
});
