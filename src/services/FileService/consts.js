export const COMMAND_ARG_PARAMS = {
  Separator: ' ',
  Prefix: '--',
};

export const COMMANDS = {
  Exit: '.exit',
  Up: 'up',
};

export const COMMAND_MESSAGES = {
  getExitMessageByUsername: (username) => `Thank you for using File Manager, ${username}, goodbye!`,
  getInvalidNumberOfArgsMessageByCommand: (command) => `Invalid number of arguments for the "${command}" command. Try again`,
  CommandNotFound: 'Invalid input. Command not found',
};
