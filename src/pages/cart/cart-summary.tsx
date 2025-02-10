import { useCheckout, useCustomerSupport } from "@/hooks";
import { useAtomValue } from "jotai";
import { cartTotalState } from "@/state";
import { formatPrice } from "@/utils/format";
import { Button } from "zmp-ui";
import Section from "@/components/section";
import HorizontalDivider from "@/components/horizontal-divider";

export default function CartSummary() {
  const { totalItems, totalAmount } = useAtomValue(cartTotalState);
  const checkout = useCheckout();

  return (
    <Section title="Thanh toán" className="rounded-lg">
      <div className="px-4 py-2 space-y-4">
        <table className="table w-full text-sm [&_th]:text-left [&_th]:text-xs [&_th]:text-inactive [&_th]:font-medium [&_td]:text-right">
          <tr>
            <th>Tạm tính</th>
            <td>600.000 VND</td>
          </tr>
          <tr>
            <th>Phí vận chuyển</th>
            <td>0 VND</td>
          </tr>
        </table>
        <HorizontalDivider />
        <div className="flex justify-between font-medium text-sm">
          <div>Tổng thanh toán</div>
          <div>615.000 VND</div>
        </div>
      </div>
    </Section>
  );
}
