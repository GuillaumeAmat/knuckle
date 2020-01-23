// Adapted from https://gist.github.com/rondymesquita/72dcfeb9eae25e59b86f59e7f77e9f08

/**
 * Integration test helper
 * Author: Andrés Zorro <zorrodg@gmail.com>,
 *         Guillaume Amat <guillaume@amat.io>
 */

import { ChildProcess } from 'child_process';
import concat from 'concat-stream';
import spawn from 'cross-spawn';
import { constants } from 'os';

import { printErrorAndExit } from '../../utils/printErrorAndExit';
import { printMessage } from '../../utils/printMessage';
import { projectPath } from './projectPath';

export const DOWN = '\x1B\x5B\x42';
export const UP = '\x1B\x5B\x41';
export const ENTER = '\x0D';
export const SPACE = '\x20';

const PATH = process.env.PATH;

interface Options {
  env?: NodeJS.ProcessEnv;
  maxTimeout?: number;
  timeout?: number;
}

interface ProcessPromise<T> extends Promise<T> {
  attachedProcess?: ChildProcess;
}

/**
 * Creates a child process
 *
 * @param {string} command Command to execute
 * @param {Array} args Arguments to the command
 * @param {Object} env (optional) Environment variables
 */
function createProcess(command: string, args: Array<any> = [], env?: NodeJS.ProcessEnv) {
  if (!command) {
    throw new Error('Missing command');
  }

  // This works for node based CLIs, but can easily be adjusted to
  // any other process installed in the system
  return spawn(command, args, {
    env: Object.assign(
      {
        NODE_ENV: 'test',
        PATH, // This is needed in order to get all the binaries in your current terminal
      },
      env,
    ),
    stdio: [null, null, null, 'ipc'], // This enables interprocess communication (IPC)
  });
}

/**
 * Creates a command and executes inputs (user responses) to the stdin
 * Returns a promise that resolves when all inputs are sent
 * Rejects the promise if any error
 *
 * @param {string} command Command to execute
 * @param {Array} args Arguments to the command
 * @param {Array} inputs (Optional) Array of inputs (user responses)
 * @param {Object} opts (optional) Environment variables
 */
function executeWithInput(
  command: string,
  args: Array<any> = [],
  inputs: Array<any> = [],
  opts: Options = {},
) {
  if (!Array.isArray(inputs)) {
    opts = inputs;
    inputs = [];
  }

  const { env, timeout = 100, maxTimeout = 10000 } = opts;
  let childProcess: ChildProcess;

  try {
    childProcess = createProcess(command, args, env);

    if (!childProcess || !childProcess.stdin || !childProcess.stdout || !childProcess.stderr) {
      return printErrorAndExit('Child process creation failed');
    }
  } catch (error) {
    return printErrorAndExit(error);
  }

  let currentInputTimeout: NodeJS.Timeout;
  let killIOTimeout: NodeJS.Timeout;

  // Creates a loop to feed user inputs to the child process in order to get results from the tool
  // This code is heavily inspired (if not blantantly copied) from inquirer-test:
  // https://github.com/ewnd9/inquirer-test/blob/6e2c40bbd39a061d3e52a8b1ee52cdac88f8d7f7/index.js#L14
  const loop = (inputs: Array<any>) => {
    if (killIOTimeout) {
      clearTimeout(killIOTimeout);
    }

    if (!childProcess.stdin) {
      return;
    }

    if (!inputs.length) {
      childProcess.stdin.end();

      // Set a timeout to wait for CLI response. If CLI takes longer than
      // maxTimeout to respond, kill the childProcess and notify user
      killIOTimeout = setTimeout(() => {
        console.error('Error: Reached I/O timeout');
        childProcess.kill(constants.signals.SIGTERM);
      }, maxTimeout);

      return;
    }

    currentInputTimeout = setTimeout(() => {
      if (!childProcess.stdin) {
        return;
      }

      childProcess.stdin.write(inputs[0]);
      // Log debug I/O statements on tests
      if (env && env.DEBUG) {
        console.log('input:', inputs[0]);
      }
      loop(inputs.slice(1));
    }, timeout);
  };

  const promise: ProcessPromise<string> = new Promise((resolve, reject) => {
    if (!childProcess.stdin || !childProcess.stdout || !childProcess.stderr) {
      return;
    }

    // Get errors from CLI
    childProcess.stderr.on('data', (data: any) => {
      // Log debug I/O statements on tests
      if (env && env.DEBUG) {
        console.log('error:', data.toString());
      }
    });

    // Get output from CLI
    childProcess.stdout.on('data', (data: any) => {
      // Log debug I/O statements on tests
      if (env && env.DEBUG) {
        console.log('output:', data.toString());
      }
    });

    childProcess.stderr.once('data', (err: any) => {
      if (!childProcess.stdin) {
        return;
      }

      childProcess.stdin.end();

      if (currentInputTimeout) {
        clearTimeout(currentInputTimeout);
        inputs = [];
      }
      reject(err.toString());
    });

    childProcess.on('error', reject);

    // Kick off the process
    loop(inputs);

    childProcess.stdout.pipe(
      concat(result => {
        if (killIOTimeout) {
          clearTimeout(killIOTimeout);
        }

        resolve(result.toString());
      }),
    );
  });

  // Appending the process to the promise, in order to
  // add additional parameters or behavior (such as IPC communication)
  promise.attachedProcess = childProcess;

  return promise;
}

/**
 * Main entry point to use this helper
 * Wraps the `command` with `nyc` to collect the coverage
 * @param {string} command Command to execute
 * @param {Array} args Arguments to the command
 * @param {Array} inputs (Optional) Array of inputs (user responses)
 * @param {Object} opts (optional) Environment variables
 */
export function run(
  command: string,
  args: Array<any> = [],
  inputs: Array<any> = [],
  opts: object = {},
) {
  const nycArgs = ['--reporter=lcov', '--no-clean', `--cwd=${projectPath}`];

  return executeWithInput('nyc', [...nycArgs, command === 'node' ? 'ts-node' : command, ...args], inputs, opts);
  // return executeWithInput('nyc', [...nycArgs, command, ...args], inputs, opts);
}

/**
 * Same as `run`, without the `nyc` watch
 *
 * @param {string} command Command to execute
 * @param {Array} args Arguments to the command
 * @param {Array} inputs (Optional) Array of inputs (user responses)
 * @param {Object} opts (optional) Environment variables
 */
export function runWithoutNyc(
  command: string,
  args: Array<any> = [],
  inputs: Array<any> = [],
  opts: object = {},
) {
  return executeWithInput(command === 'node' ? 'ts-node' : command, args, inputs, opts);
  // return executeWithInput(command, args, inputs, opts);
}
