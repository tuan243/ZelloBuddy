import { Tabs } from "zmp-ui";
import OrderList from "./order-list";
import { ordersState } from "@/state";

function OrdersPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <Tabs className="[&>.zaui-tabs-tabbar]:grid [&>.zaui-tabs-tabbar]:grid-cols-3 [&>.zaui-tabs-tabbar]:text-center">
        <Tabs.Tab key="tab1" label="Đang xử lý">
          <OrderList ordersState={ordersState("pending")} />
        </Tabs.Tab>
        <Tabs.Tab key="tab2" label="Nhận hôm nay">
          <OrderList ordersState={ordersState("shipping")} />
        </Tabs.Tab>
        <Tabs.Tab key="tab3" label="Lịch sử">
          <OrderList ordersState={ordersState("completed")} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default OrdersPage;
