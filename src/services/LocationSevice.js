import { homedir } from 'node:os';


export default class LocationService {
  constructor() {
    this.location = homedir();
  }

  getCurrentLocation() {
    return this.location;
  }

  goUp() {
  }
}
