import fs from 'node:fs';
import path from 'node:path';
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
export async function cp(params, ...args) {
  if (args.length !== 2) {
    params.onInvalidArgs();

    return;
  }

  const { output, locationService, onFinish } = params;
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

  readStream.on('end', () => {
    writeStream.close();
    onFinish('File copied');
  }).on('error', () => {
    onFinish('Error while copying file');
  });

  writeStream.on('error', () => {
    onFinish('Error while copying file');
  });

  readStream.pipe(writeStream);
}
