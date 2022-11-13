import { ClockIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import { ValidatedForm } from "remix-validated-form";
import type { RecipeForm } from "~/routes/oppskrifter/$";
import { recipeValidator } from "~/routes/oppskrifter/$";
import { Button } from "../Button";
import { RecipeField } from "../RecipeField";
import { IngredientList } from "./IngredientList";

type Props = {
  defaultValues: RecipeForm;
  actionPath: string;
};

export function Form({ defaultValues, actionPath }: Props): JSX.Element {
  return (
    <>
      <ValidatedForm
        validator={recipeValidator}
        defaultValues={defaultValues}
        method="post"
        action={actionPath}
      >
        <RecipeField
          label="Tittel"
          className="py-4 text-3xl font-bold text-stone-800"
          hideLabel
          defaultValue="hei"
          name={Prisma.RecipeScalarFieldEnum.title}
        />
        <RecipeField
          label="Beskrivelse"
          name={Prisma.RecipeScalarFieldEnum.description}
        />

        <RecipeField
          label="Tid"
          name={Prisma.RecipeScalarFieldEnum.minutes}
          iconElement={<ClockIcon />}
          type="number"
        />
        <h2 className="text-lg font-bold text-stone-800">Ingredienser</h2>
        <IngredientList />
        <Button variant="green" type="submit">
          Lagre
        </Button>
      </ValidatedForm>
    </>
  );
}
