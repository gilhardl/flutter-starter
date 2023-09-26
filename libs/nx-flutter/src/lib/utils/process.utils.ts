import { exec } from 'child_process';

const LARGE_BUFFER = 1024 * 1000000;

/** Utility function to run a command in a child process.
 *
 * @param command the command to run
 * @param cwd directory path in which run the given command
 */
export function runCommand(command: string, cwd?: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, {
      maxBuffer: LARGE_BUFFER,
      env: {
        ...process.env,
        ...{ cwd: cwd ?? process.cwd() },
      },
      cwd,
    });

    const processExitListener = (signal?: number | NodeJS.Signals) => () =>
      childProcess.kill(signal);

    process.on('exit', processExitListener);
    process.on('SIGTERM', processExitListener);
    process.on('SIGINT', processExitListener);
    process.on('SIGQUIT', processExitListener);

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    childProcess.on('error', (err) => {
      process.stderr.write(err.toString());
      reject(err);
    });
    childProcess.on('exit', resolve);
  });
}
