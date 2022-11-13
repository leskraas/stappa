import {
  ChevronUpDownIcon,
  PlusSmallIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { Variant, Target } from "framer-motion";
import { Reorder, motion, useAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { useWindowSize } from "~/hooks/useWindowSize";
import type { Item } from "~/routes/oppskrifter/$";
import { IconButton } from "../Button/IconButton";

type Props = {
  children: ReactNode;
  item: Item;
  onAddClick: () => void;
  onDeleteClick: () => void;
};

const childHover: Variant = {
  backgroundColor: "#e7e5e4",
  color: "#78716c",
};

const childHoverEnd: Variant = {
  backgroundColor: "inherit",
  color: "#a8a29e",
};

const hidden: Variant = {
  opacity: 0,
  transition: {
    duration: 0.2,
  },
};

const show: Variant = {
  opacity: 1,
  backgroundColor: "inherit",
  color: "#a8a29e",
  transition: {
    duration: 0.3,
  },
};

const init: Target = {
  opacity: 0,
  transitionDuration: "300ms",
  transitionProperty: "background-color, color",
};

export function ReorderRecipeItem({
  item,
  onAddClick,
  onDeleteClick,
  children,
}: Props): JSX.Element {
  const { isPhone } = useWindowSize();
  const moveControls = useAnimation();
  const addControls = useAnimation();
  const removeControls = useAnimation();
  const className = "rounded-md grid place-items-center p-1";
  return (
    <Reorder.Item
      key={`${item.id}`}
      value={item}
      whileDrag={{
        cursor: "grabbing",
      }}
    >
      <motion.fieldset
        className="group flex items-center"
        onHoverStart={() => {
          moveControls.start(show);
          addControls.start(show);
          removeControls.start(show);
        }}
        onFocus={(e) => {
          moveControls.start(show);
          addControls.start(show);
          removeControls.start(show);
        }}
        onBlur={() => {
          moveControls.start(hidden);
          addControls.start(hidden);
          removeControls.start(hidden);
        }}
        onHoverEnd={() => {
          moveControls.start(hidden);
          addControls.start(hidden);
          removeControls.start(hidden);
        }}
      >
        <>
          <motion.div
            initial={init}
            animate={moveControls}
            onHoverStart={() => {
              moveControls.start(childHover);
            }}
            onHoverEnd={() => {
              moveControls.start(childHoverEnd);
            }}
            whileTap={{
              cursor: "grabbing",
            }}
            className={`${className} hidden cursor-grab sm:block`}
          >
            <ChevronUpDownIcon className="h-6 w-6" />
          </motion.div>

          <IconButton
            type="button"
            text="Legg til"
            className={`${className} hidden sm:block`}
            onClick={onAddClick}
            icon={<PlusSmallIcon className="h-6 w-6" />}
            initial={init}
            animate={addControls}
            onHoverStart={() => {
              addControls.start(childHover);
            }}
            onHoverEnd={() => {
              addControls.start(childHoverEnd);
            }}
          />
        </>
        {children}
        <IconButton
          type="button"
          text="Slett"
          className={`${className}`}
          onClick={onDeleteClick}
          icon={<TrashIcon className="h-6 w-6" />}
          initial={init}
          animate={removeControls}
          onHoverStart={() => {
            removeControls.start(childHover);
          }}
          onHoverEnd={() => {
            removeControls.start(childHoverEnd);
          }}
        />
      </motion.fieldset>
    </Reorder.Item>
  );
}
