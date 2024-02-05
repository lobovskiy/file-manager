import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { getFilePath } from '../../utils.js';


/**
 * @param {Object} params Params of function call
 * @param {Writable} params.output user interface output writable stream
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export async function add(params, ...args) {
  if (args.length !== 1) {
    params.onInvalidArgs();

    return;
  }

  const { locationService, onFinish } = params;
  const filePath = await getFilePath(args[0], locationService.getCurrentLocation());

  await fsPromises.appendFile(filePath, '').then(() => {
    onFinish('File created');
  }).catch(() => {
    onFinish('Error: Couldn\'t create file by this path');
  });
}
