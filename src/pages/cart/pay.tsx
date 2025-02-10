import { useCheckout } from "@/hooks";
import { useAtomValue } from "jotai";
import { cartTotalState } from "@/state";
import { formatPrice } from "@/utils/format";
import { Button } from "zmp-ui";

export default function Pay() {
  const { totalItems, totalAmount } = useAtomValue(cartTotalState);
  const checkout = useCheckout();

  return (
    <div className="flex-none flex items-center py-3 px-4 space-x-2 bg-section">
      <div className="space-y-1 flex-1">
        <div className="text-xs text-subtitle">Tổng thanh toán</div>
        <div className="text-sm font-medium text-primary">
          {formatPrice(totalAmount)}
        </div>
      </div>
      <Button onClick={checkout} disabled={totalItems === 0}>
        Thanh toán
      </Button>
    </div>
  );
}
