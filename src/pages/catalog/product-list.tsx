import HorizontalDivider from "@/components/horizontal-divider";
import ProductGrid from "@/components/product-grid";
import { useAtomValue } from "jotai";
import { productsBySelectedCategoryState, productsState } from "@/state";
import CategorySlider from "@/components/category-slider";
import { Suspense } from "react";
import { ProductGridSkeleton } from "../search";
import { EmptyCategory } from "@/components/empty";

function ProductList() {
  const products = useAtomValue(productsBySelectedCategoryState);

  if (!products.length) {
    return <EmptyCategory />;
  }

  return <ProductGrid products={products} className="pt-4" />;
}

export default function ProductListPage() {
  return (
    <div className="h-full flex flex-col bg-section">
      <CategorySlider />
      <HorizontalDivider />
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<ProductGridSkeleton className="pt-4" />}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}
