import { MESSAGES } from '../../consts.js';
import { COMMAND_ARG_PARAMS, COMMAND_MESSAGES, COMMANDS } from './consts.js';


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

    switch (command) {
      case COMMANDS.Exit:
        if (args.length > 0) {
          this.printMessageInvalidNumberOfArgs(command);
        } else {
          console.log(COMMAND_MESSAGES.getExitMessageByUsername(this.userService.getUsername()));
          this.userInterface.close();
        }

        break;
      case COMMANDS.Up:
        this.locationService.getCurrentLocation();

        break;

      default:
        console.log(COMMAND_MESSAGES.CommandNotFound);
    }
  }

  printMessageInvalidNumberOfArgs(command) {
    console.log(COMMAND_MESSAGES.getInvalidNumberOfArgsMessageByCommand(command));
    this.userInterface.prompt();
  }

  printCurrentLocation() {
    const currentLocation = `${MESSAGES.CurrentLocation} ${this.locationService.getCurrentLocation()}`;

    console.log(currentLocation);
    this.userInterface.prompt();
  }
}
