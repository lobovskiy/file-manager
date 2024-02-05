import { up } from './commandFunctions/navigation/up.js';
import { cd } from './commandFunctions/navigation/cd.js';
import { list } from './commandFunctions/navigation/list.js';
import { cat } from './commandFunctions/files/cat.js';


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
};

export const COMMAND_FUNCTIONS_BY_COMMAND = {
  [COMMANDS.Up]: up,
  [COMMANDS.Cd]: cd,
  [COMMANDS.Ls]: list,
  [COMMANDS.Cat]: cat,
};

export const COMMAND_MESSAGES = {
  getExitMessageByUsername: (username) => `Thank you for using File Manager, ${username}, goodbye!`,
  getInvalidNumberOfArgsMessageByCommand: (command) => `Invalid number of arguments for the "${command}" command. Try again.`,
  CommandNotFound: 'Invalid input: Command not found. Try again',
};
