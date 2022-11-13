import type { ActionArgs, LoaderArgs, TypedResponse } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { getUserId, requireUserId } from "~/utils/session.server";
import type { Prisma } from "@prisma/client";
import { Difficulty, Status } from "@prisma/client";
import {
  createRecipe,
  deleteRecipeIngredient,
  getRecipe,
  getRecipeIngredientIds,
  updateRecipe,
  upsertRecipeIngredients,
  upsertRecipeIngredientTitle,
} from "~/utils/recipes.server";
import { Form } from "~/components/RecipeForm";
import invariant from "tiny-invariant";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zfd } from "zod-form-data";

export type Recipe = Prisma.PromiseReturnType<typeof getRecipe>;
const ingredientsZod = z.object({
  id: z.string().optional(),
  amount: zfd.numeric(
    z.number({
      required_error: "Påkrevd",
      invalid_type_error: "Kun tall er gyldig",
    })
  ),
  comment: z.union([zfd.text(z.string().optional()), z.null()]),
  ingredientName: zfd.text(z.string({ required_error: "Påkrevd" })),
  unitName: zfd.text(z.string({ required_error: "Påkrevd" })),
  listOrder: z.union([zfd.numeric(z.number().optional()), z.null()]),
});

const ingredientTitlesZod = z.object({
  id: z.string().optional(),
  name: zfd.text(z.string({ required_error: "Påkrevd" })),
  listOrder: z.union([zfd.numeric(z.number().optional()), z.null()]),
});

const jsonZod = {
  title: zfd.text(z.string()),
  description: zfd.text(z.union([z.string().optional(), z.null()])),
  minutes: zfd.numeric(z.union([z.number().optional(), z.null()])),
  servings: zfd.numeric(z.union([z.number().optional(), z.null()])),
  blocked: z.union([zfd.checkbox({ trueValue: "true" }).optional(), z.null()]),
  difficulty: zfd.text(
    z.union([z.nativeEnum(Difficulty).optional(), z.null()])
  ),
  status: zfd.text(z.union([z.nativeEnum(Status).optional(), z.null()])),
  ingredients: z.union([zfd.repeatableOfType(ingredientsZod), z.null()]),
  ingredientTitles: z.union([
    zfd.repeatableOfType(ingredientTitlesZod),
    z.null(),
  ]),
};
const recipeZodSchema = z.object(jsonZod);
export const recipeValidator = withZod(zfd.formData(jsonZod));

export type RecipeForm = z.infer<typeof recipeZodSchema>;
export type RecipeFormIngredient = z.infer<typeof ingredientsZod>;
export type RecipeFormIngredientTitle = z.infer<typeof ingredientTitlesZod>;
type PageAction = "new" | "edit" | "view";
type PageActionOutput =
  | {
      action: PageAction | "unknown";
      recipeId: string | null;
    }
  | undefined;

function getPageAction(slug?: string): PageActionOutput {
  if (!slug) return;
  const [actionOrRecipeId, recipeId] = slug.split("/");
  if (actionOrRecipeId === "ny") {
    return { action: "new", recipeId: recipeId || null };
  }
  if (actionOrRecipeId === "endre" && recipeId) {
    return { action: "edit", recipeId };
  }
  if (actionOrRecipeId && recipeId) {
    return { action: "unknown", recipeId };
  }
  return { action: "view", recipeId: actionOrRecipeId };
}

export async function action({ request, params }: ActionArgs) {
  const viewerUserId = await requireUserId(request);
  const pageAction = getPageAction(params["*"]);
  const recipeId = pageAction?.recipeId;
  const formData = await request.formData();
  const { data, error } = await recipeValidator.validate(formData);

  if (error) return json({ recipe: data, error: validationError(error) });
  const { ingredients, ingredientTitles, ...recipe } = data;
  invariant(recipeId, "mangler id");
  const existingRecipeIngredients = await getRecipeIngredientIds({ recipeId });
  const ingredientsToDelete = existingRecipeIngredients.filter(
    (e) => !ingredients?.find((t) => t.id === e.id)
  );

  ingredientTitles?.forEach(async (title) => {
    await upsertRecipeIngredientTitle({
      ...title,
      recipeId,
    });
  });
  ingredients?.forEach(async (ingredient) => {
    await upsertRecipeIngredients({
      ...ingredient,
      recipeId,
    });
  });
  ingredientsToDelete.forEach(async ({ id }) => {
    await deleteRecipeIngredient({ id });
  });

  const updatedRecipe = await updateRecipe({
    ...recipe,
    userId: viewerUserId,
    id: recipeId,
  });

  return json({ recipe: updatedRecipe, error: null });
}

type LoaderData = {
  pageAction: PageAction;
  recipe: Exclude<Recipe, null>;
};

export async function loader({
  params,
  request,
}: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const pageAction = getPageAction(params["*"]);
  invariant(pageAction, "en slug er påkrevd");

  if (pageAction.action === "unknown") {
    return redirect(`/oppskrifter/${pageAction.recipeId}`);
  }

  const shouldCreateRecipe =
    pageAction.action === "new" && !pageAction.recipeId;

  if (shouldCreateRecipe) {
    const viewerUserId = await requireUserId(request);
    const recipe = await createRecipe({
      title: "Uten tittel!!",
      userId: viewerUserId,
    });
    return redirect(`/oppskrifter/ny/${recipe.id}`);
  }

  invariant(pageAction.recipeId, "mangler en oppskrift id");
  const recipe = await getRecipe({ id: pageAction.recipeId });

  if (!recipe) {
    throw json("Vi klarte ikke finne denne oppskriften", { status: 404 });
  }

  const viewerUserId = await getUserId(request);
  const isEditOrCreatePage =
    pageAction.action === "edit" || pageAction.action === "new";
  const isOwnRecipe = recipe.userId === viewerUserId;

  if (isEditOrCreatePage && !isOwnRecipe) {
    return redirect(`/oppskrifter/${pageAction.recipeId}`);
  }
  return json<LoaderData>({ pageAction: pageAction.action, recipe });
}

export default function Splat() {
  const params = useParams();
  const data = useActionData<typeof action>();
  const { pageAction, recipe } = useLoaderData<typeof loader>();

  if (pageAction === "view") {
    return (
      <div>
        <Link to={`/oppskrifter/endre/${recipe.id}`}>Endre</Link>
        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <p className="py-6">{recipe.description}</p>
        <p className="py-6">{recipe.minutes}</p>
        <p className="py-6">{recipe.servings}</p>
        <p className="py-6">{recipe.difficulty}</p>
        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            <p className="py-6">{ingredient.amount}</p>
          </div>
        ))}
        <hr className="my-4" />
      </div>
    );
  }
  const actionRecipe = !!data && !data.error ? data.recipe : null;
  const defaultValues = { ...recipe, ...actionRecipe };

  return (
    <Form
      defaultValues={defaultValues}
      actionPath={`/oppskrifter/${params["*"]}`}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>En uventet feil oppstod: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      Feil, caught.status: {caught.status}, caught.data:{caught.data},
      caught.statustext:{caught.statusText}
    </div>
  );
}

export const unstable_shouldReload = () => false;
