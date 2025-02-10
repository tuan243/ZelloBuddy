import { Order } from "@/types";
import { Atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { useMemo } from "react";
import { ProductGridSkeleton } from "../search";
import { EmptyOrder } from "@/components/empty";
import OrderItem from "./order-item";

function OrderList(props: { ordersState: Atom<Promise<Order[]>> }) {
  const orderList = useAtomValue(
    useMemo(() => loadable(props.ordersState), [props.ordersState])
  );

  return (
    <div className="space-y-2 p-4">
      {orderList.state !== "hasData" ? (
        <>
          <ProductGridSkeleton />
        </>
      ) : orderList.data.length === 0 ? (
        <EmptyOrder />
      ) : (
        orderList.data.map((order) => <OrderItem key={order.id} {...order} />)
      )}
    </div>
  );
}

export default OrderList;
