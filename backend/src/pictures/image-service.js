import { v2 as cloudinary } from 'cloudinary';
import productsModel from '../product/product-model';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from '../constants/constants';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

const handleProductPicture = async (image, productId) => {
  try {
    const result = await cloudinary.uploader.upload(image, options);
    const dbUpdate = await productsModel.addPicutre(productId, result.secure_url);
    return dbUpdate;
  } catch (error) {
    console.error(error);
  }
  throw new Error('Image upload error');
};

const deleteProductPicture = async (url) => {
  if (!url) return;
  const publicId = url.slice(url.lastIndexOf('.') - 32, url.lastIndexOf('.'));
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.log(err);
  }
};

const updateProductPicture = async (url, imgFile, productId) => {
  try {
    if (url !== null) {
      const publicId = url.slice(url.lastIndexOf('.') - 32, url.lastIndexOf('.'));
      await cloudinary.uploader.destroy(publicId);
    }
    const newData = await handleProductPicture(imgFile.path, productId);
    return newData;
  } catch (err) {
    console.log(err);
    throw new Error('Image update error');
  }
};

export { handleProductPicture, deleteProductPicture, updateProductPicture };
