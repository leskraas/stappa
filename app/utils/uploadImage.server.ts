import type { UploadApiResponse } from "cloudinary";
import cloudinary from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import type { Recipe, User } from "@prisma/client";
// import sharp from "sharp";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadImage(
  data: AsyncIterable<Uint8Array>,
  userId: User["id"],
  recipeId: Recipe["id"]
) {
  const uploadPromise = new Promise<UploadApiResponse | undefined>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: `${process.env.NODE_ENV}/${userId}`,
          public_id: recipeId,
          sign_url: true,
          type: "authenticated",
          format: "webp",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );

      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );
  return uploadPromise;
}

export { uploadImage };
