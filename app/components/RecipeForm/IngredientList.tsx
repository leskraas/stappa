import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import type {
  RecipeFormIngredient,
  RecipeFormIngredientTitle,
} from "~/routes/oppskrifter/$";
import { ReorderRecipeItem } from "./ReorderRecipeItem";
import { useFieldArray } from "remix-validated-form";
import { Button } from "../Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { IngredientItems } from "./IngredientItems";
import { IngredientTitleItems } from "./IngredientTitleItems";

export type Item = {
  id: string;
  listOrder: number;
};

function sortList(
  listToSort: (RecipeFormIngredient | RecipeFormIngredientTitle)[]
) {
  return [...listToSort].sort((current, prev) => {
    return (current.listOrder || 0) - (prev.listOrder || 0);
  });
}

function isIngredient(
  item: RecipeFormIngredient | RecipeFormIngredientTitle
): item is RecipeFormIngredient {
  return item.id?.includes("ingredient") || "ingredientName" in item;
}

export function IngredientList(): JSX.Element {
  const [ingredients, { remove: removeIngredient, insert: insertIngredient }] =
    useFieldArray<RecipeFormIngredient>("ingredients");
  const [
    ingredientTitles,
    { remove: removeIngredientTitles, insert: insertIngredientTitles },
  ] = useFieldArray<RecipeFormIngredientTitle>("ingredientTitles");

  const listItems = [...ingredients, ...ingredientTitles];
  const [ingredientsSorted, setIngredientsSorted] = useState(
    sortList(listItems)
  );

  useEffect(() => {
    setIngredientsSorted((prevList) => {
      const listItems = [...ingredients, ...ingredientTitles];

      if (prevList.length >= listItems.length) {
        const newList = prevList.filter((item) =>
          listItems.some((e) => e.id === item.id)
        );
        return newList;
      }
      const newItem = listItems.filter(
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
  }, [ingredients, ingredientTitles]);

  return (
    <div>
      <Reorder.Group
        axis="y"
        values={ingredientsSorted}
        onReorder={setIngredientsSorted}
      >
        {ingredientsSorted.map((item, i) => {
          const currentIngredientPositionIndex = ingredients.findIndex(
            (listItem) => listItem.id === item.id
          );
          const currentTitlePositionIndex = ingredientTitles.findIndex(
            (listItem) => listItem.id === item.id
          );
          const isItemIngredient = isIngredient(item);
          return (
            <ReorderRecipeItem
              key={`${item.id}`}
              item={item}
              onAddClick={() => {
                insertIngredient(ingredients.length, {
                  id: `${v4()}-ingredient`,
                  listOrder: i,
                });
              }}
              onDeleteClick={() => {
                isItemIngredient
                  ? removeIngredient(currentIngredientPositionIndex)
                  : removeIngredientTitles(currentTitlePositionIndex);
              }}
            >
              {isItemIngredient && (
                <IngredientItems
                  item={item}
                  index={i}
                  ingredients={ingredients}
                />
              )}
              {!isItemIngredient && (
                <IngredientTitleItems
                  index={i}
                  item={item}
                  ingredientTitles={ingredientTitles}
                />
              )}
            </ReorderRecipeItem>
          );
        })}
      </Reorder.Group>
      <div className="flex gap-1">
        <Button
          onClick={() => {
            insertIngredient(ingredients.length, {
              id: `${v4()}-ingredient`,
              listOrder: listItems.length - 1,
            });
          }}
          icon={<PlusIcon />}
        >
          Ny ingrediens
        </Button>
        <Button
          onClick={() => {
            insertIngredientTitles(ingredientTitles.length, {
              id: `${v4()}-title`,
              listOrder: listItems.length - 1,
            });
          }}
          icon={<PlusIcon />}
        >
          Ny tittel
        </Button>
      </div>
    </div>
  );
}
