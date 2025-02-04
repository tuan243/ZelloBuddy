import Banners from "./banners";
import Category from "./category";
import FlashSales from "./flash-sales";
import HorizontalDivider from "@/components/horizontal-divider";
import CategoryTabs from "@/components/category-tabs";

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="min-h-full bg-section space-y-2 py-2">
      <Category />
      <div className="bg-background">
        <Banners />
      </div>
      <FlashSales />
    </div>
  );
};

export default HomePage;
