import upload from '../config/multer.js'
export const loadAvatar = (upload.single('photo'), (req, res) => {
    const foto = req.file;
    const ruta = path.join(__dirname, 'fotos', foto.filename);
  
    fs.rename(foto.path, ruta, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send('Archivo cargado exitosamente');
      }
    });
  })