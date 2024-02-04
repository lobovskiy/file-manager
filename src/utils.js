/**
 * Parse app execution arguments
 * @param {string[]} args - app execution arguments
 * @param {string} prefix - string argument prefix
 * @param {string} separator - string argument separator of key and value
 * @returns {Record<string, string>}
 */
export function parseExecArgs(args, prefix, separator) {
  const execArgs = {};

  args.forEach((argString) => {
    if (argString.startsWith(prefix)) {
      const indexOfSeparator = argString.indexOf(separator);

      if (indexOfSeparator) {
        const argName = argString.slice(prefix.length,
          indexOfSeparator);

        if (argName) {
          execArgs[argName] = argString.slice(indexOfSeparator + 1);
        }
      }
    }
  });

  return execArgs;
}
