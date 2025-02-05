import { useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { categoriesStateUpwrapped, userState } from "@/state";
import { BackIcon } from "./vectors";
import { useMemo } from "react";
import { useRouteHandle } from "@/hooks";
import { getConfig } from "@/utils/template";
import headerIllus from "@/static/header-illus.svg";
import SearchBar from "./search-bar";

export default function Header() {
  const categories = useAtomValue(categoriesStateUpwrapped);
  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();
  const userInfo = useAtomValue(userState);

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ categories, params: match.params });
      } else {
        return handle.title;
      }
    }
  }, [handle, categories]);

  const showBack = location.key !== "default" && handle?.back !== false;

  return (
    <div
      className="w-full flex flex-col px-4 bg-primary text-primaryForeground pt-st overflow-hidden bg-no-repeat bg-right-top"
      style={{
        backgroundImage: `url(${headerIllus})`,
      }}
    >
      <div className="w-full min-h-12 pr-[90px] flex py-2 space-x-2 items-center">
        {handle.logo ? (
          <>
            <img
              src={getConfig((c) => c.template.logoUrl)}
              className="flex-none w-8 h-8 rounded-full"
            />
            <div className="flex-1 overflow-hidden">
              <h1 className="text-lg font-bold">
                {getConfig((c) => c.template.shopName)}
              </h1>
              <p className="overflow-x-auto whitespace-nowrap text-2xs">
                {getConfig((c) => c.template.shopAddress)}
              </p>
            </div>
          </>
        ) : (
          <>
            {handle.back && showBack && (
              <div
                className="py-1 px-2 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <BackIcon />
              </div>
            )}
            <div className="text-xl font-medium truncate">{title}</div>
          </>
        )}
      </div>
      {handle.search && (
        <div className="w-full py-2 flex space-x-2">
          <SearchBar
            onFocus={() => {
              if (location.pathname !== "/search") {
                navigate("/search", { unstable_viewTransition: true });
              }
            }}
          />
          {!!userInfo && (
            <img className="w-8 h-8 rounded-full" src={userInfo.avatar} />
          )}
        </div>
      )}
    </div>
  );
}
