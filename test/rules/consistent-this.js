import { RuleTester } from 'oxlint/plugins-dev';
import { describe, it } from 'vitest';

import HapiRecommended from '../../src/configs/recommended.js';
import Rule from '../../src/rules/consistent-this';

const ruleTester = new RuleTester(HapiRecommended);

describe('consistent-this rule', () => {
    it('reports a non-this value assigned to the designated alias', () => {
        ruleTester.run('test', Rule, {
            valid: [],
            invalid: [
                {
                    code: 'const self = 5;',
                    options: ['self'],
                    errors: [{ message: "Designated alias 'self' is not assigned to 'this'." }],
                },
                {
                    code: 'let self; self = 5;',
                    options: ['self'],
                    errors: [{ message: "Designated alias 'self' is not assigned to 'this'." }],
                },
                {
                    code: 'let self; self += this;',
                    options: ['self'],
                    errors: [{ message: "Designated alias 'self' is not assigned to 'this'." }],
                },
            ],
        });
    });

    it('reports this captured under an unexpected alias', () => {
        ruleTester.run('test', Rule, {
            valid: [],
            invalid: [
                {
                    code: 'const that = this;',
                    options: ['self'],
                    errors: [{ message: "Unexpected alias 'that' for 'this'." }],
                },
            ],
        });
    });

    it('allows this captured as the designated alias and unrelated assignments', () => {
        ruleTester.run('test', Rule, {
            valid: [
                { code: 'const self = this;', options: ['self'] },
                { code: 'let self; self = this;', options: ['self'] },
                { code: 'const value = 5;', options: ['self'] },
                { code: 'const node = this.node;', options: ['self'] },
                { code: 'const { x } = this;', options: ['self'] },
                { code: 'this.context = this;', options: ['self'] },
            ],
            invalid: [],
        });
    });
});
