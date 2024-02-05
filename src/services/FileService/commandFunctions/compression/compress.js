import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { getAbsolutePath } from '../../utils.js';


/**
 * @param {Object} params Params of function call
 * @param {string} params.operation type of operation
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export async function compress(params, ...args) {
  if (args.length !== 2) {
    params.onInvalidArgs();

    return;
  }

  const { operation: operationType, locationService, onFinish } = params;
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
  const newFileName = (operationType === 'decompress') ? fileName.slice(0, -3) : `${fileName}.br`;
  const newFilePath = path.join(dirPath, newFileName);
  const isNewFileExists = await isFileExists(newFilePath);

  if (isNewFileExists) {
    onFinish('Error: File with this new name already exists');

    return;
  }

  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const writeStream = fs.createWriteStream(newFilePath, { encoding: 'utf8' });
  const operation = (operationType === 'decompress') ? createBrotliDecompress() : createBrotliCompress();
  const successMessage = (operationType === 'decompress') ? 'File decompressed' : 'File compressed';
  const errorMessage = (operationType === 'decompress')
    ? 'Error while decompressing file'
    : 'Error while compressing file';

  // readStream.on('end', () => {
  //   onFinish(successMessage);
  // }).on('error', () => {
  //   onFinish(errorMessage);
  // });
  //
  // writeStream.on('error', () => {
  //   onFinish(errorMessage);
  // });

  const stream = readStream.pipe(operation).pipe(writeStream);

  stream.on('finish', () => {
    onFinish(successMessage);
  }).on('error', () => {
    onFinish(errorMessage);
  });
}
