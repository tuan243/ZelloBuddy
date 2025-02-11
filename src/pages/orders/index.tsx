import { Tabs } from "zmp-ui";
import OrderList from "./order-list";
import { ordersState } from "@/state";
import { atom, useAtom } from "jotai";

const persistedActiveKeyState = atom("pending");

function OrdersPage() {
  const [activeKey, setActiveKey] = useAtom(persistedActiveKeyState);

  return (
    <Tabs
      className="h-full flex flex-col"
      activeKey={activeKey}
      onChange={setActiveKey}
    >
      <Tabs.Tab key="pending" label="Đang xử lý">
        <OrderList ordersState={ordersState("pending")} />
      </Tabs.Tab>
      <Tabs.Tab key="shipping" label="Nhận hôm nay">
        <OrderList ordersState={ordersState("shipping")} />
      </Tabs.Tab>
      <Tabs.Tab key="completed" label="Lịch sử">
        <OrderList ordersState={ordersState("completed")} />
      </Tabs.Tab>
    </Tabs>
  );
}

export default OrdersPage;
