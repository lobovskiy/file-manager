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
export async function rn(params, ...args) {
  if (args.length !== 2) {
    params.onInvalidArgs();

    return;
  }

  const { locationService, onFinish } = params;
  const oldFilePath = await getAbsolutePath(args[0], locationService.getCurrentLocation());
  const newFilePath = await getAbsolutePath(args[1], locationService.getCurrentLocation());

  const isFileExists = async (filePath) =>
    await fsPromises.access(filePath).then(() => true).catch(() => false);

  const isOldFileExists = await isFileExists(oldFilePath);
  const isNewFileExists = await isFileExists(newFilePath);

  if (!isOldFileExists) {
    onFinish('Error: Couldn\'t find file');

    return;
  }

  if (isNewFileExists) {
    onFinish('Error: File with this new name already exists');

    return;
  }

  await fsPromises.rename(oldFilePath, newFilePath).then(() => {
    onFinish('File renamed');
  }).catch(() => {
    onFinish('Error: Something went wrong. Operation failed.');
  });
}
