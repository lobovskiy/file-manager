import * as readline from 'node:readline';
import { EOL } from 'node:os';

import { MESSAGES, USER_INTERFACE_PROMPT } from '../consts.js';


export default class FileManager {
  /**
   * File Manager constructor
   * @param {string[]} args - app execution arguments
   * @param {Readable} input - readable stream of user input
   * @param {Writable} output - writable stream to print output in console
   */
  constructor(args, input, output) {
    this.userInterface = readline.createInterface({ input, output });
    this.appUserName = this.#parseUserNameFromArgs(args);

    this.#configureUserInterface(this.userInterface);
  }

  welcome() {
    this.userInterface.question(
      `${MESSAGES.Welcome}${EOL}${USER_INTERFACE_PROMPT}`,
      this.#handleUserInput.bind(this),
    );
  }

  #parseUserNameFromArgs(args) {
    console.log('args: >> ', args);

    return 'userName';
  }

  /**
   * Configure readline interface
   * @param {Interface} userInterface - app execution arguments
   */
  #configureUserInterface(userInterface) {
    userInterface.on('line', this.#handleUserInput.bind(this));

    this.#addTerminationSignalListeners(userInterface);
  }

  /**
   * Add listeners for OS termination signals
   * @param {Interface} userInterface - app execution arguments
   */
  #addTerminationSignalListeners(userInterface) {
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) =>
      userInterface.on(signal, this.userInterface.close));
  }

  #handleUserInput(command) {
    if (command === '.exit') {
      this.userInterface.close();
    } else {
      console.log(command);
    }

    this.userInterface.prompt();
  }
}
