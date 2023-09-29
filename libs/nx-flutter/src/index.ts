import { CreateDependencies } from '@nx/devkit';

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

export const appGenerator = appNxGenerator;
export const moduleGenerator = moduleNxGenerator;
export const packageGenerator = packageNxGenerator;
export const pluginGenerator = pluginNxGenerator;

export const analyzeExecutor = analyzeNxExecutor;
export const attachExecutor = attachNxExecutor;
export const cleanExecutor = cleanNxExecutor;
export const genL10nExecutor = genL10nNxExecutor;
export const installExecutor = installNxExecutor;
export const runExecutor = runNxExecutor;
export const testExecutor = testNxExecutor;
