import { EOL } from 'node:os';
import { MESSAGES } from '../../consts.js';
import {
  COMMAND_ARG_PARAMS,
  COMMAND_FUNCTIONS_BY_COMMAND,
  COMMAND_MESSAGES,
  EXIT_COMMAND,
} from './consts.js';


export default class FileService {
  /**
   * File Service constructor
   * @param {Writable} output user interface output writable stream
   * @param {Interface} userInterface - IO user interface
   * @param {LocationService} locationService - service to operate with current location
   * @param {UserService} userService - service to operate with current location
   */
  constructor(output, userInterface, locationService, userService) {
    this.output = output;
    this.userInterface = userInterface;
    this.locationService = locationService;
    this.userService = userService;
  }

  /**
   * Command handler
   * @param {string} input - user input
   */
  handleCommandInput(input) {
    const [command, ...args] = input.trimStart().trimEnd().split(COMMAND_ARG_PARAMS.Separator);

    if (command === EXIT_COMMAND) {
      this.#checkExitCommandArgs(args);
    } else {
      const commandFunction = COMMAND_FUNCTIONS_BY_COMMAND[command];

      if (commandFunction) {
        const onInvalidArgs = () => this.#printMessageInvalidNumberOfArgs(command);
        const params = {
          output: this.output,
          locationService: this.locationService,
          onInvalidArgs: onInvalidArgs.bind(this),
          onFinish: this.#printResult.bind(this),
        };

        commandFunction(params, ...args);
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

  #printResult(result) {
    console.log(result ? `${EOL}${result}${EOL}` : EOL);

    this.#printCurrentLocation();
    this.userInterface.prompt();
  }

  #printMessageInvalidNumberOfArgs(command) {
    console.log(COMMAND_MESSAGES.getInvalidNumberOfArgsMessageByCommand(command));
    this.#printCurrentLocation();
    this.userInterface.prompt();
  }

  #printCurrentLocation() {
    const currentLocation = `${MESSAGES.CurrentLocation} ${this.locationService.getCurrentLocation()}`;

    console.log(currentLocation);
    this.userInterface.prompt();
  }
}
