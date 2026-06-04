import CapitalizeModules from './rules/capitalize-modules.js';
import ConsistentThis from './rules/consistent-this.js';
import ForLoop from './rules/for-loop.js';
import NoArrowception from './rules/no-arrowception.js';
import NoVar from './rules/no-var.js';
import OneVar from './rules/one-var.js';

export default {
    meta: {
        name: '@hapi',
    },
    rules: {
        'capitalize-modules': CapitalizeModules,
        'for-loop': ForLoop,
        'no-var': NoVar,
        'no-arrowception': NoArrowception,
        'consistent-this': ConsistentThis,
        'one-var': OneVar,
    },
};
