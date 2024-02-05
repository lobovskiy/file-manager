import { up } from './commandFunctions/navigation/up.js';
import { cd } from './commandFunctions/navigation/cd.js';
import { list } from './commandFunctions/navigation/list.js';
import { cat } from './commandFunctions/files/cat.js';
import { add } from './commandFunctions/files/add.js';
import { rn } from './commandFunctions/files/rn.js';
import { cp } from './commandFunctions/files/cp.js';


export const COMMAND_ARG_PARAMS = {
  Separator: ' ',
  Prefix: '--',
};

export const EXIT_COMMAND = '.exit';

export const COMMANDS = {
  Up: 'up',
  Cd: 'cd',
  Ls: 'ls',
  Cat: 'cat',
  Add: 'add',
  Rn: 'rn',
  Cp: 'cp',
  Mv: 'mv',
};

export const COMMAND_FUNCTIONS_BY_COMMAND = {
  [COMMANDS.Up]: up,
  [COMMANDS.Cd]: cd,
  [COMMANDS.Ls]: list,
  [COMMANDS.Cat]: cat,
  [COMMANDS.Add]: add,
  [COMMANDS.Cp]: cp,
  [COMMANDS.Mv]: (...args) => cp({ operation: 'move', ...args[0] }, ...args.slice(1)),
};

export const COMMAND_MESSAGES = {
  getExitMessageByUsername: (username) => `Thank you for using File Manager, ${username}, goodbye!`,
  getInvalidNumberOfArgsMessageByCommand: (command) => `Invalid number of arguments for the "${command}" command. Try again.`,
  CommandNotFound: 'Invalid input: Command not found. Try again',
};
