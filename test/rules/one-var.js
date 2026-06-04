import { RuleTester } from 'oxlint/plugins-dev';
import { describe, it } from 'vitest';

import HapiRecommended from '../../src/configs/recommended.js';
import Rule from '../../src/rules/one-var';

const ruleTester = new RuleTester(HapiRecommended);

describe('one-var rule', () => {
    it('reports declarations that combine multiple variables', () => {
        ruleTester.run('test', Rule, {
            valid: [],
            invalid: [
                { code: 'let a, b;', errors: [{ message: "Split 'let' declarations into multiple statements." }] },
                {
                    code: 'const a = 1, b = 2;',
                    errors: [{ message: "Split 'const' declarations into multiple statements." }],
                },
                { code: 'var a, b, c;', errors: [{ message: "Split 'var' declarations into multiple statements." }] },
            ],
        });
    });

    it('allows one variable per declaration', () => {
        ruleTester.run('test', Rule, {
            valid: [
                { code: 'const a = 1;' },
                { code: 'let b;' },
                { code: 'let c; let d;' },
                { code: 'const e = 1; const f = 2;' },
            ],
            invalid: [],
        });
    });
});
