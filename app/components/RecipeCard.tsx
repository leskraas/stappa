import type { Prisma } from "@prisma/client";
import { Link } from "@remix-run/react";
import { motion, MotionConfig } from "framer-motion";
import { PhotoIcon } from "@heroicons/react/24/outline";
import type { getDiscoveryRecipes } from "~/utils/recipes.server";
import { AnimatedShadow } from "./AnimatedShadow";

type Props = Prisma.PromiseReturnType<typeof getDiscoveryRecipes>[number];

export function RecipeCard({ id, title, media }: Props): JSX.Element {
  const randomHeight = `${Math.random() * 200 + 100}px`;
  return (
    <MotionConfig transition={{ duration: 0.4 }}>
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
      >
        <AnimatedShadow
          className="inline-block w-full rounded-md"
          style={{ minHeight: randomHeight }}
        >
          <Link to={`${id}`}>
            {media ? (
              <img src={media} alt={title || ""} />
            ) : (
              <div className="grid min-h-[8rem] place-items-center rounded-md bg-stone-300">
                <PhotoIcon
                  className="max-w-[100px] text-stone-100"
                  strokeWidth=".5"
                />
              </div>
            )}
            <h2 className="text-base font-bold text-stone-800">{title}</h2>
          </Link>
        </AnimatedShadow>
      </motion.div>
    </MotionConfig>
  );
}
