import { MESSAGES } from '../../consts.js';
import { COMMAND_ARG_PARAMS, COMMAND_MESSAGES, COMMANDS, COMMANDS_PARAMS_BY_COMMAND, EXIT_COMMAND } from './consts.js';


export default class FileService {
  /**
   * File Service constructor
   * @param {Interface} userInterface - IO user interface
   * @param {LocationService} locationService - service to operate with current location
   * @param {UserService} userService - service to operate with current location
   */
  constructor(userInterface, locationService, userService) {
    this.userInterface = userInterface;
    this.locationService = locationService;
    this.userService = userService;
  }

  /**
   * Command handler
   * @param {string} input - user input
   */
  handleCommand(input) {
    const [command, ...args] = input.trimStart().trimEnd().split(COMMAND_ARG_PARAMS.Separator);

    if (command === EXIT_COMMAND) {
      this.#checkExitCommandArgs(args);
    } else {
      if (COMMANDS_PARAMS_BY_COMMAND[command]) {
        this.#executeCommand(command, args);
      } else {
        console.log(COMMAND_MESSAGES.CommandNotFound);
        this.userInterface.prompt();
      }
    }
  }

  #checkExitCommandArgs(args) {
    if (args.length > 0) {
      this.#printMessageInvalidNumberOfArgs(EXIT_COMMAND);
    } else {
      console.log(COMMAND_MESSAGES.getExitMessageByUsername(this.userService.getUsername()));
      this.userInterface.close();
    }
  }

  #executeCommand(command, args) {
    console.log(123);
    // console.log(COMMAND_MESSAGES.getInvalidNumberOfArgsMessageByCommand(command));
    this.userInterface.prompt();
  }

  #printMessageInvalidNumberOfArgs(command) {
    console.log(COMMAND_MESSAGES.getInvalidNumberOfArgsMessageByCommand(command));
    this.userInterface.prompt();
  }

  #printCurrentLocation() {
    const currentLocation = `${MESSAGES.CurrentLocation} ${this.locationService.getCurrentLocation()}`;

    console.log(currentLocation);
    this.userInterface.prompt();
  }
}
