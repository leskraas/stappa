import type {
  User,
  Recipe,
  Prisma,
  Ingredient,
  Unit,
  RecipeIngredient,
} from "@prisma/client";
import { prisma } from "~/db.server";

export function getRecipe({ id }: Pick<Recipe, "id">) {
  const recipe = prisma.recipe.findFirst({
    where: { id },
    include: {
      ingredients: {
        orderBy: {
          listOrder: "asc",
        },
      },
      ingredientTitles: true,
    },
  });
  return recipe;
}

export function getRecipeIngredientIds({
  recipeId,
}: Pick<RecipeIngredient, "recipeId">) {
  const recipe = prisma.recipeIngredient.findMany({
    where: { recipeId },
    select: {
      id: true,
    },
  });
  return recipe;
}

export function getDiscoveryRecipes() {
  return prisma.recipe.findMany({
    select: { id: true, title: true, media: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createRecipeIngredient({
  recipeId,
  ingredient,
  unit,
  ...args
}: Omit<
  Prisma.RecipeIngredientCreateWithoutRecipeInput,
  "id" | "ingredient" | "unit"
> & {
  recipeId: Recipe["id"];
  ingredient: Ingredient["name"];
  unit: Unit["name"];
}) {
  return prisma.recipe.update({
    data: {
      ingredients: {
        create: {
          ...args,
          unit: {
            connectOrCreate: {
              create: {
                name: unit,
              },
              where: {
                name: unit,
              },
            },
          },
          ingredient: {
            connectOrCreate: {
              create: {
                name: ingredient,
              },
              where: {
                name: ingredient,
              },
            },
          },
        },
      },
    },
    where: {
      id: recipeId,
    },
  });
}

export function createRecipe({
  userId,
  ...args
}: Pick<
  Prisma.RecipeCreateArgs["data"],
  | "title"
  | "description"
  | "media"
  | "minutes"
  | "difficulty"
  | "servings"
  | "status"
> & { userId: User["id"] }) {
  return prisma.recipe.create({
    data: {
      ...args,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
type UpsertRecipeIngredients = Pick<
  Prisma.RecipeIngredientUncheckedCreateInput,
  "id" | "amount" | "comment" | "recipeId" | "ingredientName" | "unitName"
>;
function recipeIngredientCreateUpdateInput({
  ingredientName,
  unitName,
  recipeId,
  ...args
}: Omit<UpsertRecipeIngredients, "id">): Prisma.RecipeIngredientCreateInput {
  return {
    ...args,
    unit: {
      connectOrCreate: {
        create: {
          name: unitName,
        },
        where: {
          name: unitName,
        },
      },
    },
    ingredient: {
      connectOrCreate: {
        create: {
          name: ingredientName,
        },
        where: {
          name: ingredientName,
        },
      },
    },

    recipe: {
      connect: {
        id: recipeId,
      },
    },
  };
}

export function upsertRecipeIngredients({
  id,
  ...args
}: UpsertRecipeIngredients) {
  return prisma.recipeIngredient.upsert({
    create: recipeIngredientCreateUpdateInput(args),
    update: recipeIngredientCreateUpdateInput(args),
    where: {
      id,
    },
  });
}

type UpsertRecipeIngredientTitle = Pick<
  Prisma.RecipeIngredientTitleUncheckedCreateInput,
  "id" | "recipeId" | "listOrder" | "name"
>;

function recipeIngredientTitleCreateUpdateInput({
  recipeId,
  ...args
}: Omit<
  UpsertRecipeIngredientTitle,
  "id"
>): Prisma.RecipeIngredientTitleCreateInput {
  return {
    ...args,
    recipe: {
      connect: {
        id: recipeId,
      },
    },
  };
}

export function upsertRecipeIngredientTitle({
  id,
  ...args
}: UpsertRecipeIngredientTitle) {
  return prisma.recipeIngredientTitle.upsert({
    create: recipeIngredientTitleCreateUpdateInput(args),
    update: recipeIngredientTitleCreateUpdateInput(args),
    where: {
      id,
    },
  });
}

export function updateRecipe({
  userId,
  id,
  ...args
}: Pick<
  Prisma.RecipeUpdateArgs["data"],
  | "title"
  | "description"
  | "media"
  | "minutes"
  | "difficulty"
  | "servings"
  | "blocked"
  | "status"
> & { userId: User["id"]; id: Recipe["id"] }) {
  return prisma.recipe.update({
    data: {
      ...args,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    where: {
      id,
    },
    include: {
      ingredients: true,
      ingredientTitles: true,
    },
  });
}

// export function deleteNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   return prisma.note.deleteMany({
//     where: { id, userId },
//   });
// }

export function deleteRecipeIngredient({ id }: Pick<RecipeIngredient, "id">) {
  const recipe = prisma.recipeIngredient.delete({
    where: { id },
  });
  return recipe;
}
