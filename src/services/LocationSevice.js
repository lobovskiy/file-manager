import { homedir } from 'node:os';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';


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

  async goToDirectory(pathToDirectory) {
    if (path.isAbsolute(pathToDirectory)) {
      await fsPromises.access(pathToDirectory);
      this.location = pathToDirectory;
    } else if (pathToDirectory === '..') {
      this.goUp();
    } else {
      const destPath = `${this.location}${path.sep}${pathToDirectory}`;
      const stat = await fsPromises.lstat(destPath);

      if (stat.isFile()) {
        throw new Error('Not a directory');
      }

      this.location = destPath;
    }
  }
}
