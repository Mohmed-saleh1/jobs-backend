import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  dest: './uploads',
};

export const multerOptions = {
  storage: diskStorage({
    destination: multerConfig.dest,
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(pdf|jpg|jpeg|png)$/)) {
      return callback(
        new Error('Only PDF and image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
};
