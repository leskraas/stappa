import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { getDiscoveryRecipes } from "~/utils/recipes.server";
import { RecipeCard } from "~/components/RecipeCard";

export async function loader({ request }: LoaderArgs) {
  const discoverRecipes = await getDiscoveryRecipes();
  return json({ discoverRecipes });
}

export default function Index() {
  const { discoverRecipes } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <h1>hei</h1>
      <div className="grid grid-cols-3 items-start gap-4  ">
        {discoverRecipes.map((recipe, i) => (
          <RecipeCard key={recipe.id + i} {...recipe} />
        ))}
      </div>
    </div>
  );
}
