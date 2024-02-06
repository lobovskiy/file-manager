export default class UserService {
  /**
   * User Service constructor
   * @param {string} username - name of the app user
   */
  constructor(username) {
    this.username = username;
  }

  /**
   * Set name of the current app user
   * @param {string} username
   */
  setUsername(username) {
    this.username = username;
  }

  /**
   * Get name of the current app user
   * @returns {string}
   */
  getUsername() {
    return this.username;
  }
}
