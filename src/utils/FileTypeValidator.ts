import { extname } from 'path';

export class FileTypeValidator {
  public fileFilter(req, file, cb) {
    if (!file?.originalname) {
      req.fileValidationError = 'Invalid file!';
      cb(null, false);
      return;
    }

    const fileExt = extname(file.originalname).substring(1);
    console.log('fileExt', fileExt);
    if (['jpg', 'jpeg', 'png', 'gif'].some((ext) => ext === fileExt)) {
      cb(null, true);
      return;
    }

    req.fileValidationError = 'File extension must be jpeg, jpg, png or gif!';
    cb(null, false);
  }
}
