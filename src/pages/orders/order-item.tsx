import HorizontalDivider from "@/components/horizontal-divider";
import Section from "@/components/section";
import { CartItem, Order } from "@/types";
import { formatPrice } from "@/utils/format";
import { Icon } from "zmp-ui";

function OrderProductItem(props: CartItem) {
  return (
    <div className="relative after:border-b-[0.5px] after:border-black/10 after:absolute after:left-[88px] after:right-0 after:bottom-0 last:after:hidden">
      <div className="p-4 flex items-center space-x-4 relative">
        <img src={props.product.image} className="w-14 h-14 rounded-lg" />
        <div className="flex-1 space-y-1">
          <div className="text-sm">{props.product.name}</div>
          <div className="flex flex-col">
            <div className="text-sm font-bold">
              {formatPrice(props.product.price)}
            </div>
            {props.product.originalPrice && (
              <div className="line-through text-subtitle text-4xs">
                {formatPrice(props.product.originalPrice)}
              </div>
            )}
          </div>
        </div>
        <div className="text-sm font-medium">x{props.quantity}</div>
      </div>
    </div>
  );
}

function OrderItem(props: Order) {
  return (
    <Section
      title={
        <div className="w-full flex justify-between items-center space-x-2 font-normal">
          <span className="text-xs truncate">
            Thời gian nhận: Từ 16h, 20/1/2025
          </span>
          <span className="text-primary text-xs">Đang xử lý</span>
        </div>
      }
      className="flex-1 overflow-y-auto rounded-lg"
    >
      <div className="w-full">
        {props.items.map((item) => (
          <OrderProductItem key={item.product.id} {...item} />
        ))}
      </div>
      <HorizontalDivider />
      <div className="flex items-center px-4 pt-3 pb-2 space-x-4">
        <div className="text-sm font-medium">Ghi chú</div>
        <input
          type="text"
          placeholder="Lưu ý cho người bán..."
          className="text-sm text-right flex-1 focus:outline-none"
        />
      </div>
    </Section>
  );
}

export default OrderItem;
