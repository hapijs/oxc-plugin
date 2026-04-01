/* global __HAPI_OXC_OXLINT__, __HAPI_OXC_OXFMT__, __HAPI_OXC_CWD__ */

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, join, resolve } from 'node:path';
import { promisify } from 'node:util';

import { describe, it } from 'vitest';

const internals = {};

internals.execFile = promisify(execFile);

internals.cwd = __HAPI_OXC_CWD__ ?? process.cwd();

internals.oxlintConfigs = ['oxlint.config.ts', 'oxlint.config.js', 'oxlint.config.json', '.oxlintrc.json'];
internals.oxfmtConfigs = ['oxfmt.config.ts', 'oxfmt.config.js', 'oxfmt.config.json'];

internals.hasConfig = function (files) {
    for (const file of files) {
        if (existsSync(resolve(internals.cwd, file))) {
            return true;
        }
    }

    return false;
};

internals.exec = function (command, args) {
    const env = { ...process.env };
    env.PATH = `${resolve(internals.cwd, 'node_modules/.bin')}${delimiter}${env.PATH}`;

    return internals.execFile(command, args, { encoding: 'utf8', cwd: internals.cwd, env });
};

describe('@hapi/oxc-plugin', () => {
    it.skipIf(!__HAPI_OXC_OXLINT__)('oxlint', async () => {
        const args = [];
        if (!internals.hasConfig(internals.oxlintConfigs)) {
            args.push('-c', join(import.meta.dirname, 'configs', 'recommended.js'));
        }

        try {
            await internals.exec('oxlint', args);
        } catch (err) {
            throw new Error(`oxlint check failed:\n${err.stdout + err.stderr}`);
        }
    });

    it.skipIf(!__HAPI_OXC_OXFMT__)('oxfmt', async () => {
        const args = ['--check'];
        if (!internals.hasConfig(internals.oxfmtConfigs)) {
            args.push('-c', join(import.meta.dirname, 'configs', 'oxfmt.config.js'));
        }

        args.push('.');

        try {
            await internals.exec('oxfmt', args);
        } catch (err) {
            throw new Error(`oxfmt check failed:\n${err.stdout + err.stderr}`);
        }
    });
});
