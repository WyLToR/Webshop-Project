import multer from 'multer';

const uploadMiddleware = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

export default uploadMiddleware;
