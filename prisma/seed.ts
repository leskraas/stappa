import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createRecipe, createRecipeIngredient } from "~/utils/recipes.server";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      profile: {
        create: {
          name: "rachel",
        },
      },
    },
  });

  const amount = 30;
  const ingredient = "Ost";
  const unit = "dl";
  const newRecipe = await createRecipe({
    title: "Ny Test",
    description: "lorem ipsum test",
    userId: user.id,
  });
  await createRecipeIngredient({
    recipeId: newRecipe.id,
    amount,
    ingredient,
    unit,
  });
  await createRecipeIngredient({
    recipeId: newRecipe.id,
    amount,
    ingredient: "Kjøtt",
    unit: "gram",
  });

  await prisma.recipe.create({
    data: {
      title: "Pizza",
      description: "En god pizza",
      categories: {
        connectOrCreate: [
          {
            create: {
              name: "Italiensk",
            },
            where: {
              name: "Italiensk",
            },
          },
          {
            create: {
              name: "Pizza",
            },
            where: {
              name: "Pizza",
            },
          },
          {
            create: {
              name: "Fredag",
            },
            where: {
              name: "Fredag",
            },
          },
        ],
      },
      status: "INPROGRESS",
      difficulty: "EASY",
      minutes: 50,
      servings: 3,
      ingredients: {
        create: [
          {
            amount: 300,
            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Ost",
                },
                where: {
                  name: "Ost",
                },
              },
            },
            comment: "Revet ost",
          },
          {
            amount: 400,

            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Kjøtt",
                },
                where: {
                  name: "Kjøtt",
                },
              },
            },
          },
          {
            amount: 400,

            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Mel",
                },
                where: {
                  name: "Mel",
                },
              },
            },
          },
        ],
      },
      instructions: {
        create: [
          {
            text: "Stek kjøttet",
          },
        ],
      },
      userId: user.id,
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Taco",
      description: "En god taco",
      categories: {
        connectOrCreate: [
          {
            create: {
              name: "Mexikansk",
            },
            where: {
              name: "Mexikansk",
            },
          },
          {
            create: {
              name: "Fredag",
            },
            where: {
              name: "Fredag",
            },
          },
        ],
      },
      status: "INPROGRESS",
      difficulty: "EASY",
      minutes: 50,
      servings: 3,
      ingredients: {
        create: [
          {
            amount: 200,

            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Ost",
                },
                where: {
                  name: "Ost",
                },
              },
            },
            comment: "Revet ost",
          },
          {
            amount: 400,

            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Kjøtt",
                },
                where: {
                  name: "Kjøtt",
                },
              },
            },
            comment: "Storfekjøtt",
          },
          {
            amount: 2,

            unit: {
              connectOrCreate: {
                create: {
                  name: "l",
                },
                where: {
                  name: "l",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Vann",
                },
                where: {
                  name: "Vann",
                },
              },
            },
            comment: "Vann til kjøttblanding",
          },
        ],
      },
      instructions: {
        create: [
          {
            text: "Stek kjøttet",
          },
        ],
      },
      userId: user.id,
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Taco",
      description: "En god taco",
      categories: {
        connectOrCreate: [
          {
            create: {
              name: "Mexikansk",
            },
            where: {
              name: "Mexikansk",
            },
          },
          {
            create: {
              name: "Fredag",
            },
            where: {
              name: "Fredag",
            },
          },
        ],
      },
      status: "INPROGRESS",
      difficulty: "EASY",
      minutes: 50,
      servings: 3,
      ingredients: {
        create: [
          {
            amount: 200,

            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Ost",
                },
                where: {
                  name: "Ost",
                },
              },
            },
            comment: "Revet ost",
          },
          {
            amount: 400,

            unit: {
              connectOrCreate: {
                create: {
                  name: "gram",
                },
                where: {
                  name: "gram",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Kjøtt",
                },
                where: {
                  name: "Kjøtt",
                },
              },
            },
            comment: "Storfekjøtt",
          },
          {
            amount: 2,

            unit: {
              connectOrCreate: {
                create: {
                  name: "cl",
                },
                where: {
                  name: "cl",
                },
              },
            },
            ingredient: {
              connectOrCreate: {
                create: {
                  name: "Vann",
                },
                where: {
                  name: "Vann",
                },
              },
            },
            comment: "Vann til kjøttblanding",
          },
        ],
      },
      instructions: {
        create: [
          {
            text: "Stek kjøttet",
          },
        ],
      },
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
