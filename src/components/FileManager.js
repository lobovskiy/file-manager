import * as readline from 'node:readline';
import { EOL } from 'node:os';

import LocationService from '../services/LocationSevice.js';
import FileService from '../services/FileService/index.js';
import UserService from '../services/UserService.js';
import { parseExecArgs } from '../utils.js';
import {
  INPUT_PROMPT_STRING,
  EXEC_ARG_PARAMS,
  EXEC_ARGS,
  MESSAGES,
} from '../consts.js';


export default class FileManager {
  /**
   * File Manager constructor
   * @param {Record<string, string>} args - app execution arguments
   * @param {Readable} input - readable stream of user input
   * @param {Writable} output - writable stream to print output in console
   */
  constructor(args, input, output) {
    this.userInterface = readline.createInterface({ input, output, prompt: INPUT_PROMPT_STRING });
    this.locationService = new LocationService();
    this.userService = new UserService(args[EXEC_ARGS.Username]);
    this.fileService = new FileService(this.userInterface, this.locationService, this.userService);

    this.#addTerminationSignalListeners(this.userInterface);
  }

  /**
   * Starting app
   */
  start() {
    const username = this.userService.getUsername();

    if (username) {
      this.#welcome(username);
    } else {
      const questionUsername = `${MESSAGES.UsernameRequired}${EOL}${INPUT_PROMPT_STRING}`;

      this.userInterface.question(questionUsername, (username) => {
        this.userService.setUsername(username);
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
    this.userInterface.question(questionWelcome, this.fileService.handleCommand.bind(this.fileService));
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
    userInterface.on('line', this.fileService.handleCommand.bind(this.fileService));
  }
}
