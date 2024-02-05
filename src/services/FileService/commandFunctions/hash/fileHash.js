import { createHash } from 'node:crypto';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { getAbsolutePath } from '../../utils.js';


/**
 * @param {Object} params Params of function call
 * @param {Writable} params.output user interface output writable stream
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export async function hash(params, ...args) {
  if (args.length !== 1) {
    params.onInvalidArgs();

    return;
  }

  const { locationService, onFinish } = params;
  const filePath = await getAbsolutePath(args[0], locationService.getCurrentLocation());

  try {
    const stat = await fsPromises.lstat(filePath);

    if (!stat.isFile()) {
      throw new Error();
    }
  } catch {
    onFinish('Error: Couldn\'t find this file');

    return;
  }

  const updateHashWithData = (hash, data) => {
    typeof data === 'string'
      ? hash.update(data, 'utf8')
      : hash.update(data);
  };

  const hash = createHash('sha256');
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  readStream.on('data', (chunk) => {
    updateHashWithData(hash, chunk);
  });
  readStream.on('end', () => {
    console.log(hash.digest('hex'));
    onFinish();
  });
  readStream.on('error', () => {
    onFinish('Error: Something went wrong. Operation failed.');
  });
}
