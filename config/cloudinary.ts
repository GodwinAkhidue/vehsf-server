import cloudinary from "cloudinary";

export const cloudinary_upload_local_file_path = async (localFilePath: any) => {
  try {
    const response = await cloudinary.v2.uploader.upload(localFilePath);
    return { response };
  } catch (error) {
    return { error };
  }
};

export const cloudinary_delete_by_public_id = async (public_id: any) => {
  try {
    const response = await cloudinary.v2.uploader.destroy(public_id);
    return { response };
  } catch (error) {
    return { error };
  }
};
