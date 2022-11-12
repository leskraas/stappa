import { Prisma } from "@prisma/client";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import type { RecipeFormIngredient } from "~/routes/oppskrifter/$";
import { HiddenField } from "../HiddenField";
import { ReorderRecipeItem } from "./ReorderRecipeItem";
import { useFieldArray } from "remix-validated-form";
import { RecipeListItemField } from "../RecipeListItemField";
import { Button } from "../Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export type Item = {
  id: string;
  listOrder: number;
};

function sortList(listToSort: RecipeFormIngredient[]) {
  return [...listToSort].sort((current, prev) => {
    return (current.listOrder || 0) - (prev.listOrder || 0);
  });
}

export function IngredientList(): JSX.Element {
  const [ingredients, { remove, insert }] =
    useFieldArray<RecipeFormIngredient>("ingredients");
  const [ingredientsSorted, setIngredientsSorted] = useState(
    sortList(ingredients)
  );

  useEffect(() => {
    setIngredientsSorted((prevList) => {
      if (prevList.length >= ingredients.length) {
        const newList = prevList.filter((item) =>
          ingredients.some((e) => e.id === item.id)
        );
        return newList;
      }
      const newItem = ingredients.filter(
        (item) => !prevList.find((e) => e.id === item.id)
      )[0];
      const indexAfter = (newItem?.listOrder || 0) + 1;
      const beforeInsert = prevList.slice(0, indexAfter);
      const afterInsert = prevList
        .slice(indexAfter)
        .map((item) => ({ ...item, listOrder: (item.listOrder || 0) + 1 }));
      const newArray = [...beforeInsert, ...[newItem], ...afterInsert];

      return newArray;
    });
  }, [ingredients]);

  return (
    <div>
      <Reorder.Group
        axis="y"
        values={ingredientsSorted}
        onReorder={setIngredientsSorted}
      >
        {ingredientsSorted.map((item, i) => {
          const currentPositionIndex = ingredients.findIndex(
            (ingredient) => ingredient.id === item.id
          );
          return (
            <ReorderRecipeItem
              key={`${item.id}`}
              item={item}
              onAddClick={() => {
                insert(i + 1, { id: v4(), listOrder: i });
              }}
              onDeleteClick={() => {
                remove(currentPositionIndex);
              }}
            >
              <HiddenField
                name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.id}`}
              />
              <HiddenField
                name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.listOrder}`}
                value={i}
              />
              <RecipeListItemField
                label="Ingrediens"
                width="8ch"
                name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.ingredientName}`}
              />
              <RecipeListItemField
                label="Mengde"
                name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.amount}`}
                type="number"
                width="4.5ch"
                className="text-end appearance-number-none"
              />
              <RecipeListItemField
                label="Enhet"
                width="5ch"
                name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.unitName}`}
              />
              <RecipeListItemField
                label="Kommentar"
                width="9ch"
                name={`ingredients[${currentPositionIndex}].${Prisma.RecipeIngredientScalarFieldEnum.comment}`}
              />
            </ReorderRecipeItem>
          );
        })}
      </Reorder.Group>
      <Button
        onClick={() => {
          insert(ingredients.length, {
            id: v4(),
            listOrder: ingredients.length - 1,
          });
        }}
        icon={<PlusIcon />}
      >
        Ny ingrediens
      </Button>
    </div>
  );
}
