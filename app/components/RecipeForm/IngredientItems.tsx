import { Prisma } from "@prisma/client";
import type { RecipeFormIngredient } from "~/routes/oppskrifter/$";
import { HiddenField } from "../HiddenField";
import { RecipeListItemField } from "../RecipeListItemField";

type Props = {
  ingredients: RecipeFormIngredient[];
  item: RecipeFormIngredient;
  index: number;
};

export function IngredientItems({
  ingredients,
  item,
  index,
}: Props): JSX.Element {
  const currentPositionIndex = ingredients.findIndex(
    (ingredient) => ingredient.id === item.id
  );
  return (
    <div className="grid w-full grid-cols-[7ch_minmax(4ch,8ch)_minmax(8ch,_2fr)_minmax(7ch,_1fr)] gap-0.5">
      <HiddenField
        name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.id}`}
      />
      <HiddenField
        name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.listOrder}`}
        value={index}
      />

      <RecipeListItemField
        label="Mengde"
        name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.amount}`}
        type="number"
        className="text-end appearance-number-none"
      />
      <RecipeListItemField
        label="Enhet"
        name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.unitName}`}
        className="font-bold"
      />
      <RecipeListItemField
        label="Ingrediens"
        name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.ingredientName}`}
      />
      <RecipeListItemField
        label="Kommentar"
        name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.comment}`}
      />
    </div>
  );
}
