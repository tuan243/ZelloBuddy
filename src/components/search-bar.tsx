import { SearchIcon } from "@/components/vectors";
import { forwardRef, HTMLProps } from "react";

const SearchBar = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <div className="relative flex-1">
        <input
          ref={ref}
          className="w-full h-8 pl-10 pr-3 bg-section text-lg text-foreground rounded-lg outline-none placeholder:text-inactive"
          placeholder="Bạn muốn mua gì..."
          {...props}
        />
        <SearchIcon className="absolute top-1 left-2" />
      </div>
    );
  }
);

export default SearchBar;
