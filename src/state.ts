import { atom } from "jotai";
import { atomFamily, atomWithStorage, unwrap } from "jotai/utils";
import {
  Cart,
  Category,
  Location,
  Order,
  OrderStatus,
  Product,
  ShippingAddress,
  Station,
} from "@/types";
import { requestWithFallback } from "@/utils/request";
import { getLocation, getSetting, getUserInfo } from "zmp-sdk";
import toast from "react-hot-toast";
import { calculateDistance } from "./utils/location";
import { formatDistant } from "./utils/format";

export const userState = atom(async () => {
  const { authSetting } = await getSetting({});
  if (authSetting["scope.userInfo"]) {
    const { userInfo } = await getUserInfo({});
    return userInfo;
  } else {
    return false;
  }
});

export const bannersState = atom(() =>
  requestWithFallback<string[]>("/banners", [])
);

export const tabsState = atom(["Tất cả", "Nam", "Nữ", "Trẻ em"]);

export const selectedTabIndexState = atom(0);

export const categoriesState = atom(() =>
  requestWithFallback<Category[]>("/categories", [])
);

export const categoriesStateUpwrapped = unwrap(
  categoriesState,
  (prev) => prev ?? []
);

export const productsState = atom(async (get) => {
  const categories = await get(categoriesState);
  const products = await requestWithFallback<
    (Product & { categoryId: number })[]
  >("/products", []);
  return products.map((product) => ({
    ...product,
    category: categories.find(
      (category) => category.id === product.categoryId
    )!,
  }));
});

export const flashSaleProductsState = atom((get) => get(productsState));

export const recommendedProductsState = atom((get) => get(productsState));

export const productState = atomFamily((id: number) =>
  atom(async (get) => {
    const products = await get(productsState);
    return products.find((product) => product.id === id);
  })
);

export const cartState = atom<Cart>([]);

export const selectedCartItemIdsState = atom<number[]>([]);

export const cartTotalState = atom((get) => {
  const items = get(cartState);
  return {
    totalItems: items.length,
    totalAmount: items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
  };
});

export const keywordState = atom("");

export const searchResultState = atom(async (get) => {
  const keyword = get(keywordState);
  const products = await get(productsState);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
});

export const selectedCategoryIndexState = atom(0);

export const productsBySelectedCategoryState = atom(async (get) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const index = get(selectedCategoryIndexState);
  const categories = await get(categoriesState);
  const products = await get(productsState);
  const category = categories[index];
  if (category) {
    return products.filter((product) => product.categoryId === category.id);
  } else {
    return [];
  }
});

export const stationsState = atom(async () => {
  let location: Location | undefined;
  try {
    const { token } = await getLocation({});
    // Phía tích hợp làm theo hướng dẫn tại https://mini.zalo.me/documents/api/getLocation/ để chuyển đổi token thành thông tin vị trí người dùng ở server.
    // location = await decodeToken(token);

    // Các bước bên dưới để demo chức năng, phía tích hợp có thể bỏ đi sau.
    toast(`Token lấy được: ${token}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast(
      "Phía tích hợp cần decode token thành thông tin vị trí người dùng ở server."
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast("Giả lập vị trí tại VNG Campus...");
    location = {
      lat: 10.773756,
      lng: 106.689247,
    };
    // End demo
  } catch (error) {
    console.warn(error);
  }

  const stations = await requestWithFallback<Station[]>("/stations", []);
  const stationsWithDistance = stations.map((station) => ({
    ...station,
    distance: location
      ? formatDistant(
          calculateDistance(
            location.lat,
            location.lng,
            station.location.lat,
            station.location.lng
          )
        )
      : undefined,
  }));

  return stationsWithDistance;
});

export const selectedStationIndexState = atom(0);

export const selectedStationState = atom(async (get) => {
  const index = get(selectedStationIndexState);
  const stations = await get(stationsState);
  return stations[index];
});

export const shippingAddressState = atomWithStorage<
  ShippingAddress | undefined
>("shippingAddress", undefined);

export const ordersState = atomFamily((status: OrderStatus) =>
  atom(async () => {
    // Phía tích hợp thay đổi logic filter server-side nếu cần:
    // const serverSideFilteredData = await requestWithFallback<Order[]>(`/orders?status=${status}`, []);
    const allMockOrders = await requestWithFallback<Order[]>("/orders", []);
    const clientSideFilteredData = allMockOrders.filter(
      (order) => order.status === status
    );
    return clientSideFilteredData;
  })
);
