import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
export class Multer {
  public static multer() {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        const fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
        cb(null, fileName + '-' + Date.now() + path.extname(file.originalname));
      },
    });
    const maxSize = 10 * 1024 * 1024;

    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only excel files are added'));
        }
      },
      limits: { fileSize: maxSize },
    }).single('file');

    return upload;
  }
}
