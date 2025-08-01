import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import FloatingCartPreview from "./floating-cart-preview";
// import Footer from "./footer";
// import Header from "./header";
import { ScrollRestoration } from "./scroll-restoration";
import { PageSkeleton } from "./skeleton";

export default function Layout() {
  return (
    <div
      className="w-screen h-screen overflow-y-auto flex flex-col bg-section text-foreground pt-12"
      style={{
        paddingTop: "calc(var(--zaui-safe-area-inset-top, 0px) + 44px)",
      }}
    >
      {/* <Header /> */}
      <div className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      {/* <Footer /> */}
      <Toaster
        containerClassName="toast-container"
        containerStyle={{
          top: "calc(50% - 24px)",
        }}
      />
      <FloatingCartPreview />
      <ScrollRestoration />
    </div>
  );
}
