import HorizontalDivider from "@/components/horizontal-divider";
import Section from "@/components/section";
import { StationSkeleton } from "@/components/skeleton";
import TransitionLink from "@/components/transition-link";
import {
  HomeIcon,
  LocationMarkerLineIcon,
  LocationMarkerPackageIcon,
  PackageDeliveryIcon,
  PlusIcon,
  ShipperIcon,
} from "@/components/vectors";
import { selectedStationState, shippingAddressState } from "@/state";
import { useAtomValue } from "jotai";
import { Suspense, useState } from "react";
import DeliverySummary from "./delivery-summary";

function ShippingAddressSummary() {
  const shippingAddress = useAtomValue(shippingAddressState);

  if (!shippingAddress) {
    return (
      <TransitionLink
        className="flex flex-col space-y-2 justify-center items-center p-4 w-full"
        to="/shipping-address"
      >
        <LocationMarkerPackageIcon />
        <div className="flex space-x-1 items-center text-center p-2">
          <PlusIcon width={16} height={16} />
          <span className="text-sm font-medium">Thêm địa chỉ nhận hàng</span>
        </div>
      </TransitionLink>
    );
  }

  return (
    <DeliverySummary
      icon={<LocationMarkerLineIcon />}
      title="Địa chỉ nhận hàng"
      subtitle={shippingAddress.alias}
      description={shippingAddress.address}
      linkTo="/shipping-address"
    />
  );
}

function SelectedStationSummary() {
  const selectedStation = useAtomValue(selectedStationState);
  return (
    <DeliverySummary
      icon={<HomeIcon />}
      title="Nhận hàng tại"
      subtitle={selectedStation.name}
      description={selectedStation.address}
      linkTo="/stations"
    />
  );
}

function Delivery() {
  const modes = [
    {
      id: 1,
      name: "Giao tận nơi",
      icon: <ShipperIcon />,
      detail: <ShippingAddressSummary />,
    },
    {
      id: 2,
      name: "Tự đến lấy",
      icon: <PackageDeliveryIcon />,
      detail: (
        <Suspense fallback={<StationSkeleton />}>
          <SelectedStationSummary />
        </Suspense>
      ),
    },
  ];
  const [selectedDeliveryMode, setSelectedDeliveryMode] = useState(modes[0]);

  return (
    <Section title="Hình thức giao hàng" className="rounded-lg">
      <div className="grid grid-cols-2 gap-4 p-4 pt-2">
        {modes.map((option) => (
          <button
            key={option.id}
            className={"flex justify-center items-center space-x-2 text-base font-medium bg-background rounded-full h-12 px-3.5 ".concat(
              option.id === selectedDeliveryMode.id
                ? "border border-primary text-primary"
                : ""
            )}
            onClick={() => setSelectedDeliveryMode(option)}
          >
            {option.icon}
            <span>{option.name}</span>
          </button>
        ))}
      </div>
      {selectedDeliveryMode.detail && (
        <>
          <HorizontalDivider />
          {selectedDeliveryMode.detail}
        </>
      )}
    </Section>
  );
}

export default Delivery;
