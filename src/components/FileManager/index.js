import * as readline from 'node:readline';
import { EOL } from 'node:os';

import LocationService from '../../services/LocationSevice.js';
import FileService from '../../services/FileService/index.js';
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
   */
  constructor(execArgs, input, output) {
    this.execArgs = parseExecArgs(execArgs, EXEC_ARG_PARAMS.Prefix, EXEC_ARG_PARAMS.Separator);
    this.userInterface = readline.createInterface({ input, output, prompt: INPUT_PROMPT_STRING });
    this.locationService = new LocationService();
    this.fileService = new FileService(this.userInterface, this.locationService);

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
      const questionUsername = `${MESSAGES.UsernameRequired}${EOL}${INPUT_PROMPT_STRING}`;

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
    this.userInterface.question(questionWelcome, this.fileService.handleCommand.bind(this));
  }

  /**
   * Add listeners for OS termination signals
   * @param {Interface} userInterface - app execution arguments
   */
  #addTerminationSignalListeners(userInterface) {
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) => userInterface.on(signal, this.userInterface.close));
  }

  /**
   * Configure readline interface
   * @param {Interface} userInterface - app execution arguments
   */
  #configureUserInterface(userInterface) {
    userInterface.on('line', this.fileService.handleCommand.bind(this));
  }
}
