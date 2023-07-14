import { useEffect, useState } from "react";

import { GeocodedAddressesResponseDto } from "../../generated/openapi";
import { Drag } from "../../shared/components/DragAndDrop";
import { GeocodedAddressType } from "../../types/geocode-api";

import { TaskVisualizerCard } from "./TaskVisualizerCard";
import { TasksVisualizerProps } from "./TasksVisualizerProps";
import { buildFormattedAddress } from "./buildFormattedAddress";
import { useGetGeocodedAddress } from "./taskVisualizerQuery";

export interface DraggableTaskProps {
  task: TasksVisualizerProps;
  index: number;
  onChangeTaskAddress: (
    taskId: string,
  ) => (
    geocodedData: GeocodedAddressesResponseDto | undefined,
    isLoading: boolean,
  ) => void;
}

export const DraggableTask = ({
  task,
  index,
  onChangeTaskAddress,
}: DraggableTaskProps) => {
  const [address, setAddress] = useState<string>(
    buildFormattedAddress(task.destinationAddress),
  );

  const { data, error, isLoading } = useGetGeocodedAddress({
    address,
  });

  const geocodedData = data?.[0];

  const isPremiseOrStreetAddress = Boolean(
    geocodedData?.types.includes(GeocodedAddressType.PREMISE) ||
      geocodedData?.types.includes(GeocodedAddressType.STREET_ADDRESS),
  );

  const hasGeolocation = Boolean(geocodedData?.geometry.location.lat);

  const isValidatedAddress = Boolean(
    isPremiseOrStreetAddress && hasGeolocation && !error && !isLoading,
  );

  const handleChangeTaskAddress = (newAddress: string) => {
    setAddress(newAddress);
  };

  useEffect(() => {
    if (address) {
      onChangeTaskAddress(task.id)(geocodedData, isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return index > 0 ? (
    <Drag key={task.id} id={task.id} index={index}>
      <TaskVisualizerCard
        key={task.id}
        position={task.position}
        date={task.date}
        pickup={task.pickup}
        delivery={task.delivery}
        address={address}
        isValidatedAddress={isValidatedAddress}
        details={task.details}
        companyName={task.companyName}
        contactName={task.contactName}
        contactPhoneNumber={task.contactPhoneNumber}
        commentary={task.commentary}
        onChange={handleChangeTaskAddress}
      />
    </Drag>
  ) : (
    <TaskVisualizerCard
      key={task.id}
      position={task.position}
      date={task.date}
      pickup={task.pickup}
      delivery={task.delivery}
      address={address}
      isValidatedAddress={isValidatedAddress}
      details={task.details}
      companyName={task.companyName}
      contactName={task.contactName}
      contactPhoneNumber={task.contactPhoneNumber}
      commentary={task.commentary}
      onChange={handleChangeTaskAddress}
    />
  );
};
