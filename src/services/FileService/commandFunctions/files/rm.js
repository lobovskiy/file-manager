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
export async function rm(params, ...args) {
  if (args.length !== 1) {
    params.onInvalidArgs();

    return;
  }

  const { locationService, onFinish } = params;
  const filePath = await getAbsolutePath(args[0], locationService.getCurrentLocation());

  await fsPromises.rm(filePath).then(() => {
    onFinish('File deleted');
  }).catch(() => {
    onFinish('Error: Couldn\'t delete file by this path');
  });
}
