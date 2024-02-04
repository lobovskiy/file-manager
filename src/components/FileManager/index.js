import * as readline from 'node:readline';
import { EOL } from 'node:os';

import { parseExecArgs } from './utils.js';
import {
  EXEC_ARG_PARAMS,
  EXEC_ARGS,
  MESSAGES, USER_INTERFACE_PROMPT,
} from '../../consts.js';


export default class FileManager {
  /**
   * File Manager constructor
   * @param {string[]} execArgs - app execution arguments
   * @param {Readable} input - readable stream of user input
   * @param {Writable} output - writable stream to print output in console
   */
  constructor(execArgs, input, output) {
    this.userInterface = readline.createInterface(
      { input, output, prompt: USER_INTERFACE_PROMPT });
    this.execArgs = parseExecArgs(
      execArgs,
      EXEC_ARG_PARAMS.Prefix,
      EXEC_ARG_PARAMS.Separator,
    );

    this.#addTerminationSignalListeners(this.userInterface);
  }

  /**
   * Starting app
   */
  start() {
    const username = this.execArgs[EXEC_ARGS.Username];

    if (username) {
      this.#welcome(username);
    } else {
      const questionUsername = `${MESSAGES.UsernameRequired}${EOL}${USER_INTERFACE_PROMPT}`;

      this.userInterface.question(questionUsername, (username) => {
        this.execArgs[EXEC_ARGS.Username] = username;
        this.#welcome(username);
      });
    }
  }

  /**
   * Welcome user
   * @param {string} username - app username
   */
  #welcome(username) {
    const welcomeMessage = `Welcome to the File Manager, ${username}!`;
    const questionWelcome = `${welcomeMessage}${EOL}${MESSAGES.WelcomeInstructions}${EOL}${USER_INTERFACE_PROMPT}`;

    this.#configureUserInterface(this.userInterface);
    this.userInterface.question(questionWelcome,
      this.#handleUserCommand.bind(this));
  }

  /**
   * Add listeners for OS termination signals
   * @param {Interface} userInterface - app execution arguments
   */
  #addTerminationSignalListeners(userInterface) {
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) =>
      userInterface.on(signal, this.userInterface.close));
  }

  /**
   * Configure readline interface
   * @param {Interface} userInterface - app execution arguments
   */
  #configureUserInterface(userInterface) {
    userInterface.on('line', this.#handleUserCommand.bind(this));
  }

  #handleUserCommand(command) {
    if (command === '.exit') {
      this.userInterface.close();
    } else {
      console.log(command);
      this.userInterface.prompt();
    }
  }
}
