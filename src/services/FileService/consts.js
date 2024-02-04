export const COMMAND_ARG_PARAMS = {
  Separator: ' ',
  Prefix: '--',
};

export const EXIT_COMMAND = '.exit';

export const COMMANDS = {
  Up: 'up',
};

export const COMMANDS_PARAMS_BY_COMMAND = {
  [COMMANDS.Up]: {
    argsNumber: 0,
    commandFn: () => {},
  },
};

export const COMMAND_MESSAGES = {
  getExitMessageByUsername: (username) => `Thank you for using File Manager, ${username}, goodbye!`,
  getInvalidNumberOfArgsMessageByCommand: (command) => `Invalid number of arguments for the "${command}" command. Try again`,
  CommandNotFound: 'Invalid input: Command not found. Try again',
};
