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

  async printDirContent() {
    const entries = await fsPromises.readdir(this.location, { encoding: 'utf8' });
    const directories = [];
    const files = [];

    for (const entry of entries) {
      const entryPath = path.join(this.location, entry);
      const entryObj = { Name: entry, Type: undefined };
      const stat = await fsPromises.lstat(entryPath);

      if (stat.isDirectory()) {
        entryObj.Type = 'directory';
        directories.push(entryObj);
      }

      if (stat.isFile()) {
        entryObj.Type = 'file';
        files.push(entryObj);
      }
    }

    directories.sort((a, b) => a.Name - b.Name);
    files.sort((a, b) => a.Name - b.Name);

    console.table(directories.concat(files));
  }

  async goToDirectory(pathToDirectory) {
    if (path.isAbsolute(pathToDirectory)) {
      await fsPromises.access(pathToDirectory);
      this.location = pathToDirectory;
    } else if (pathToDirectory === '..') {
      this.goUp();
    } else {
      const destPath = path.join(this.location, pathToDirectory);
      const stat = await fsPromises.lstat(destPath);

      if (stat.isFile()) {
        throw new Error('Not a directory');
      }

      this.location = destPath;
    }
  }
}
