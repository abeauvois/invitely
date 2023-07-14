import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import EasyEdit from "react-easy-edit";

export interface EditableAddressProps {
  defaultAddress: string;
  onChange?: (address: string) => void;
}

const useEditCard = ({ defaultAddress, onChange }: EditableAddressProps) => {
  const [editMode, setEditMode] = React.useState(false);
  const [address, setAddress] = React.useState(defaultAddress);

  const updateAddress = () => (value: string) => {
    const newAddress = value || defaultAddress;
    setAddress(newAddress);
    onChange?.(newAddress);
  };

  const toggleEditMode = () => {
    setEditMode((e) => !e);
  };

  const startEditMode = () => {
    setEditMode(true);
  };
  const stopEditMode = () => {
    setEditMode(false);
  };

  return {
    editMode,
    address,
    updateAddress,
    toggleEditMode,
    startEditMode,
    stopEditMode,
  };
};

export const EditableAddress = ({
  defaultAddress,
  onChange,
}: EditableAddressProps) => {
  const { updateAddress, stopEditMode } = useEditCard({
    defaultAddress,
    onChange,
  });

  return (
    <div className="flex">
      <EasyEdit
        type="text"
        value={defaultAddress}
        onSave={updateAddress()}
        onCancel={stopEditMode}
        saveButtonLabel={<CheckIcon className="w-3" />}
        cancelButtonLabel={<XMarkIcon className="w-3" />}
        attributes={{ name: "address" }}
        // instructions="Changez l'adresse"
        // onValidate={(value) => {
        //   console.log("onValidate", address);
        //   return true;
        // }}
      />
      <div className="cursor-pointer">
        <PencilIcon className="ml-2 w-4" />
      </div>
    </div>
  );
};
