import CartList from "./cart-list";
import ApplyVoucher from "./apply-voucher";
import CartSummary from "./cart-summary";
import HorizontalDivider from "@/components/horizontal-divider";
import { useAtomValue } from "jotai";
import { cartState } from "@/state";
import SelectAll from "./select-all";
import { EmptyBoxIcon } from "@/components/vectors";
import { EmptyCart } from "@/components/empty";

export default function CartPage() {
  const cart = useAtomValue(cartState);

  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <SelectAll />
      <HorizontalDivider />
      <CartList />
      <HorizontalDivider />
      <ApplyVoucher />
      <HorizontalDivider />
      <CartSummary />
    </div>
  );
}
