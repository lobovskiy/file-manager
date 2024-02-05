import { homedir } from 'node:os';
import * as path from 'node:path';


export default class LocationService {
  constructor() {
    this.location = homedir();
  }

  getCurrentLocation() {
    return this.location;
  }

  goUp() {
    const locationPathLevels = this.location.split(path.sep);

    if (locationPathLevels.length > 1) {
      locationPathLevels.pop();
      this.location = locationPathLevels.join(path.sep);
    }
  }
}
