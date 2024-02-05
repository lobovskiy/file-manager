import { up } from './commandFunctions/navigation/up.js';
import { cd } from './commandFunctions/navigation/cd.js';
import { list } from './commandFunctions/navigation/list.js';
import { cat } from './commandFunctions/files/cat.js';
import { add } from './commandFunctions/files/add.js';
import { rn } from './commandFunctions/files/rn.js';
import { cp } from './commandFunctions/files/cp.js';
import { rm } from './commandFunctions/files/rm.js';
import { os } from './commandFunctions/system/os.js';
import { hash } from './commandFunctions/hash/fileHash.js';
import { compress } from './commandFunctions/compression/compress.js';


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
  Rm: 'rm',
  Os: 'os',
  Hash: 'hash',
  Compress: 'compress',
  Decompress: 'decompress',
};

export const COMMAND_FUNCTIONS_BY_COMMAND = {
  [COMMANDS.Up]: up,
  [COMMANDS.Cd]: cd,
  [COMMANDS.Ls]: list,
  [COMMANDS.Cat]: cat,
  [COMMANDS.Add]: add,
  [COMMANDS.Cp]: cp,
  [COMMANDS.Mv]: (...args) => cp({ operation: 'move', ...args[0] }, ...args.slice(1)),
  [COMMANDS.Rm]: rm,
  [COMMANDS.Os]: os,
  [COMMANDS.Hash]: hash,
  [COMMANDS.Compress]: compress,
  [COMMANDS.Decompress]: (...args) => compress({ operation: 'decompress', ...args[0] }, ...args.slice(1)),
};

export const COMMAND_MESSAGES = {
  getExitMessageByUsername: (username) => `Thank you for using File Manager, ${username}, goodbye!`,
  getInvalidNumberOfArgsMessageByCommand: (command) => `Invalid number of arguments for the "${command}" command. Try again.`,
  CommandNotFound: 'Invalid input: Command not found. Try again',
};
