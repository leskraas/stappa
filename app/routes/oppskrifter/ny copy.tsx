import type { ActionFunction } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData, useCatch } from "@remix-run/react";
import sharp from "sharp";
import invariant from "tiny-invariant";
import { RecipeField } from "~/components/RecipeField";
import { requireUserId } from "~/utils/session.server";
import { uploadImage } from "~/utils/uploadImage.server";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  //   const uploadHandler = unstable_composeUploadHandlers(
  //     async ({ name, contentType, data, filename }) => {
  //       return;
  //       if (name !== "img") {
  //         return undefined;
  //       }
  //       const uploadedImage = await uploadImage(data, userId, userId);
  //       invariant(uploadedImage, "vi klarte ikke laste opp bildet");
  //       return uploadedImage.secure_url;
  //     },
  //     unstable_createMemoryUploadHandler()
  //   );
  //   const formData = await unstable_parseMultipartFormData(
  //     request,
  //     uploadHandler
  //   );
  const formData = await request.formData();
  console.log({ request });
  console.log({ formData });

  //   const imgSrc = formData.get("img");
  //   invariant(imgSrc, "vi klarte ikke finne bildet");
  //   return json({
  //     imgSrc,
  //   });
  return null;
};

export default function Index() {
  const data = useActionData<ActionData>();
  return (
    <>
      {/* <Form method="post" encType="multipart/form-data">
        <label htmlFor="img-field">Image to upload</label>
        <input id="img-field" type="file" name="img" accept="image/*" />
        <button type="submit">upload to cloudinary</button>
      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          <img src={data.imgSrc} alt={"Upload result"} />
        </>
      )} */}
      <Form method="post">
        <RecipeField isEditMode label="Tittle" name="title" />
      </Form>
    </>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//     console.error(error);

//     return <div>En uventet feil oppstod: {error.message}</div>;
// }

// export function CatchBoundary() {
//     const caught = useCatch();

//     if (caught.status === 404) {
//         return <div>Beklager, vi fant ikke oppskriften</div>;
//     }

//     throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }
