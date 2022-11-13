import { Prisma } from "@prisma/client";
import type { RecipeFormIngredientTitle } from "~/routes/oppskrifter/$";
import { HiddenField } from "../HiddenField";
import { RecipeListItemField } from "../RecipeListItemField";

type Props = {
  ingredientTitles: RecipeFormIngredientTitle[];
  item: RecipeFormIngredientTitle;
  index: number;
};

export function IngredientTitleItems({
  ingredientTitles,
  item,
  index,
}: Props): JSX.Element {
  const currentPositionIndex = ingredientTitles.findIndex(
    (ingredientTitle) => ingredientTitle.id === item.id
  );
  return (
    <>
      <HiddenField
        name={`ingredientTitles[${currentPositionIndex}].${Prisma.RecipeIngredientTitleScalarFieldEnum.id}`}
      />
      <HiddenField
        name={`ingredientTitles[${currentPositionIndex}].${Prisma.RecipeIngredientTitleScalarFieldEnum.listOrder}`}
        value={index}
      />
      <RecipeListItemField
        label="Tittel"
        name={`ingredientTitles[${currentPositionIndex}].${Prisma.RecipeIngredientTitleScalarFieldEnum.name}`}
        className="text-md font-bold"
      />
    </>
  );
}
