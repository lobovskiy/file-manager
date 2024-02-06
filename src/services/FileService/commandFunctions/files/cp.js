import fs from 'node:fs';
import path from 'node:path';
import fsPromises from 'node:fs/promises';
import { getAbsolutePath } from '../../utils.js';


/**
 * @param {Object} params Params of function call
 * @param {string} params.operation type of operation
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export async function cp(params, ...args) {
  if (args.length !== 2) {
    params.onInvalidArgs();

    return;
  }

  const { operation, locationService, onFinish } = params;
  const filePath = await getAbsolutePath(args[0], locationService.getCurrentLocation());
  const dirPath = await getAbsolutePath(args[1], locationService.getCurrentLocation());

  try {
    const fileStat = await fsPromises.lstat(filePath);
    const dirStat = await fsPromises.lstat(dirPath);

    if (!fileStat.isFile() || !dirStat.isDirectory()) {
      throw new Error();
    }
  } catch {
    onFinish('Error: Couldn\'t find file or directory');

    return;
  }

  const fileName = path.basename(filePath);
  const isFileExists = async (filePath) =>
    await fsPromises.access(filePath).then(() => true).catch(() => false);
  const newFilePath = path.join(dirPath, fileName);
  const isNewFileExists = await isFileExists(newFilePath);

  if (isNewFileExists) {
    onFinish('Error: File with this name already exists in destination directory');

    return;
  }

  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const writeStream = fs.createWriteStream(newFilePath, { encoding: 'utf8' });
  const successMessage = (operation === 'move') ? 'File moved' : 'File copied';
  const errorMessage = (operation === 'move') ? 'Error while moving file' : 'Error while copying file';

  const checkMovingFile = async () => {
    if (operation === 'move') {
      await fsPromises.rm(filePath);
    }
    onFinish(successMessage);
  };

  readStream.on('end', () => {
    writeStream.close();
    checkMovingFile();
  }).on('error', () => {
    onFinish(errorMessage);
  });

  writeStream.on('error', () => {
    onFinish(errorMessage);
  });

  readStream.pipe(writeStream);
}
