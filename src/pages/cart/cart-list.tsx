import { useAtomValue } from "jotai";
import { cartState } from "@/state";
import CartItem from "./cart-item";
import Section from "@/components/section";
import { Icon } from "zmp-ui";

export default function CartList() {
  const cart = useAtomValue(cartState);

  return (
    <Section
      title={
        <div className="flex items-center space-x-2">
          <Icon icon="zi-calendar" />
          <div>
            <span className="font-normal text-sm">Thời gian nhận:</span>{" "}
            <span className="font-medium text-sm">Từ 16h, 20/1/2025</span>
          </div>
        </div>
      }
      className="flex-1 overflow-y-auto rounded-lg"
    >
      {cart.map((item) => (
        <CartItem key={item.product.id} {...item} />
      ))}
    </Section>
  );
}
