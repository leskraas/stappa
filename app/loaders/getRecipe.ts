import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getRecipe } from "~/utils/recipes.server";

export async function getRecipeLoader({ params }: LoaderArgs) {
  invariant(params.recipeId, "fant ikke denne oppskrift");
  const recipe = await getRecipe({ id: params.recipeId });
  if (!recipe) {
    throw new Response("Not Found", { status: 404 });
  }
  //   const { createdAt, id, media, userId, updatedAt, ...rest } = recipe;
  return json(recipe);
}

export const useGetRecipeLoader = useLoaderData<typeof getRecipeLoader>;
