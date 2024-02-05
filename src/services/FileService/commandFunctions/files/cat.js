import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { EOL } from 'node:os';
import path from 'node:path';


async function getFilePath(filePath, location) {
  let absoluteFilePath;

  if (path.isAbsolute(filePath)) {
    await fsPromises.access(filePath);
    absoluteFilePath = filePath;
  } else {
    absoluteFilePath = path.join(location, filePath);
  }

  return absoluteFilePath;
}

/**
 * @param {Object} params Params of function call
 * @param {Writable} params.output user interface output writable stream
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export async function cat(params, ...args) {
  if (args.length !== 1) {
    params.onInvalidArgs();

    return;
  }

  const { output, locationService, onFinish } = params;
  const filePath = await getFilePath(args[0], locationService.getCurrentLocation());

  try {
    const stat = await fsPromises.lstat(filePath);

    if (!stat.isFile()) {
      throw new Error();
    }
  } catch {
    onFinish('Error: Couldn\'t find this file');

    return;
  }

  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  readStream.on('end', () => {
    onFinish();
  }).on('error', () => {
    onFinish('Error while reading file');
  });

  readStream.pipe(output);
}
