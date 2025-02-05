import { categoriesState, selectedCategoryIndexState } from "@/state";
import { useAtom, useAtomValue } from "jotai";

export default function CategorySlider() {
  const categories = useAtomValue(categoriesState);
  const [selectedIndex, setSelectedIndex] = useAtom(selectedCategoryIndexState);

  return (
    <div className="px-3 py-2 overflow-x-auto flex space-x-2">
      {categories.map((category, index) => (
        <button
          key={category.id}
          className={"h-8 flex-none rounded-full p-1 pr-2 flex items-center space-x-1 border border-black/15 ".concat(
            index === selectedIndex
              ? "bg-primary text-primaryForeground"
              : "bg-section"
          )}
          onClick={() => setSelectedIndex(index)}
        >
          <img
            src={category.image}
            className="w-6 h-6 rounded-full bg-skeleton"
          />
          <p className="text-xs whitespace-nowrap">{category.name}</p>
        </button>
      ))}
    </div>
  );
}
