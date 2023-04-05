
import multer from 'multer';
import { join } from 'path';
import { rename } from 'fs/promises';



// Configurar el middleware de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  }
});

const upload = multer({ storage });



export default upload