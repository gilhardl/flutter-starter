import { CreateDependencies } from '@nx/devkit';

import projectsGraph from './projects-graph';

import appNxGenerator from './generators/app/generator';
import moduleNxGenerator from './generators/module/generator';
import packageNxGenerator from './generators/package/generator';
import pluginNxGenerator from './generators/plugin/generator';

import runNxExecutor from './executors/run/executor';

export const createDependencies: CreateDependencies = projectsGraph;

export const appGenerator = appNxGenerator;
export const moduleGenerator = moduleNxGenerator;
export const packageGenerator = packageNxGenerator;
export const pluginGenerator = pluginNxGenerator;

export const runExecutor = runNxExecutor;
