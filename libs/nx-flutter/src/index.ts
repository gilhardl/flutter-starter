import { CreateDependencies, Executor, Generator } from '@nx/devkit';

import projectsGraph from './projects-graph';

import appNxGenerator from './generators/app/generator';
import moduleNxGenerator from './generators/module/generator';
import packageNxGenerator from './generators/package/generator';
import pluginNxGenerator from './generators/plugin/generator';

import analyzeNxExecutor from './executors/analyze/executor';
import attachNxExecutor from './executors/attach/executor';
import cleanNxExecutor from './executors/clean/executor';
import genL10nNxExecutor from './executors/gen-l10n/executor';
import installNxExecutor from './executors/install/executor';
import runNxExecutor from './executors/run/executor';
import testNxExecutor from './executors/test/executor';

export const createDependencies: CreateDependencies = projectsGraph;

export const appGenerator: Generator = appNxGenerator;
export const moduleGenerator: Generator = moduleNxGenerator;
export const packageGenerator: Generator = packageNxGenerator;
export const pluginGenerator: Generator = pluginNxGenerator;

export const analyzeExecutor: Executor = analyzeNxExecutor;
export const attachExecutor: Executor = attachNxExecutor;
export const cleanExecutor: Executor = cleanNxExecutor;
export const genL10nExecutor: Executor = genL10nNxExecutor;
export const installExecutor: Executor = installNxExecutor;
export const runExecutor: Executor = runNxExecutor;
export const testExecutor: Executor = testNxExecutor;
