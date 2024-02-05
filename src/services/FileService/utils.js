import fsPromises from 'node:fs/promises';
import path from 'node:path';


export async function getAbsolutePath(filePath, location) {
  let absoluteFilePath;

  if (path.isAbsolute(filePath)) {
    await fsPromises.access(filePath);
    absoluteFilePath = filePath;
  } else {
    absoluteFilePath = path.join(location, filePath);
  }

  return absoluteFilePath;
}
