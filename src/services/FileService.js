import { MESSAGES } from '../consts.js';


export default class FileService {
  /**
   * File Service constructor
   * @param {Interface} userInterface - writable stream to print output in console
   * @param {LocationService} locationService - writable stream to print output in console
   */
  constructor(userInterface, locationService) {
    this.userInterface = userInterface;
    this.locationService = locationService;
  }

  handleCommand(command) {
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
