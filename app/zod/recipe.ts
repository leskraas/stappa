// import { Prisma, prisma, Difficulty, Status } from "@prisma/client";
// import { withZod } from "@remix-validated-form/with-zod";
// import { validationError } from "remix-validated-form";
// import { z, ZodTypeAny } from "zod";
// import { zfd } from "zod-form-data";
// import { getRecipe } from "~/utils/recipes.server";

// type Recipe = Prisma.PromiseReturnType<typeof getRecipe>;

// const jsonZod = {
//   title: zfd.text(z.string()),
//   description: zfd.text(z.union([z.string().optional(), z.null()])),
//   minutes: zfd.numeric(z.union([z.number().optional(), z.null()])),
//   servings: zfd.numeric(z.union([z.number().optional(), z.null()])),
//   blocked: z.union([zfd.checkbox({ trueValue: "true" }).optional(), z.null()]),
//   difficulty: zfd.text(
//     z.union([z.nativeEnum(Difficulty).optional(), z.null()])
//   ),
//   status: zfd.text(z.union([z.nativeEnum(Status).optional(), z.null()])),
//   ingredients: zfd.repeatableOfType(z.union([z.string().optional(), z.null()])),
// };

// const recipeValidator = withZod(zfd.formData(jsonZod));

// // const recipeKeys = jsonZzod.keyof().Enum;
// // const recipeTypes = jsonZzod._type;

// // type RecipeForm = z.infer<typeof zodSchema>;

// // async function validateRecipeRequest(request: Request) {
// //     return;
// //     console.log({ data });
// //     if (data.error) return validationError(data.error);
// //     return data.data;
// // }

// export { recipeValidator };
// // export type { RecipeForm };
