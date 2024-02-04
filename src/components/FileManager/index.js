import * as readline from 'node:readline';
import { EOL } from 'node:os';

import { parseExecArgs } from './utils.js';
import {
  INPUT_PROMPT_STRING,
  EXEC_ARG_PARAMS,
  EXEC_ARGS,
  MESSAGES,
} from '../../consts.js';


export default class FileManager {
  /**
   * File Manager constructor
   * @param {string[]} execArgs - app execution arguments
   * @param {Readable} input - readable stream of user input
   * @param {Writable} output - writable stream to print output in console
   * @param {LocationService} locationService - service to operate with directories
   */
  constructor(execArgs, input, output, locationService) {
    this.execArgs = parseExecArgs(
      execArgs,
      EXEC_ARG_PARAMS.Prefix,
      EXEC_ARG_PARAMS.Separator,
    );
    this.userInterface = readline.createInterface({
      input,
      output,
      prompt: INPUT_PROMPT_STRING,
    });
    this.locationService = locationService;

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
      const questionUsername = `${MESSAGES.UsernameRequired}${EOL}${EOL}${INPUT_PROMPT_STRING}`;

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
    const welcomeMessageLine = `Welcome to the File Manager, ${username}!${EOL}`;
    const currentLocationLine = `${MESSAGES.CurrentLocation} ${this.locationService.getCurrentLocation()}${EOL}`;
    const questionWelcome = `${welcomeMessageLine}${currentLocationLine}${INPUT_PROMPT_STRING}`;

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
      const currentLocation = `${MESSAGES.CurrentLocation} ${this.locationService.getCurrentLocation()}`;

      console.log(command);
      console.log(currentLocation);
      this.userInterface.prompt();
    }
  }
}
