import {
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import { ListCard } from "../../shared/components/ListCard";

import { EditableAddress } from "./EditableAddress";

export interface TaskVisualizerCardProps {
  position: number;

  date: string;

  pickup: boolean;

  delivery: boolean;

  address: string;

  isValidatedAddress: boolean;

  details: string;

  commentary?: string;

  companyName: string;

  contactName: string;

  contactPhoneNumber: string;

  onChange?: (address: string) => void;
}

export const TASK_VISUALIZER_CARD_HEIGHT_MOBILE = {
  className: "h-52",
  value: "13rem",
};

export const TASK_VISUALIZER_CARD_HEIGHT_DESKTOP = {
  className: "md:h-28",
  value: "7rem",
};

export const TaskVisualizerCard = React.memo(
  (props: TaskVisualizerCardProps): React.ReactElement => {
    return (
      <ListCard
        className={`${TASK_VISUALIZER_CARD_HEIGHT_DESKTOP.className} ${TASK_VISUALIZER_CARD_HEIGHT_MOBILE.className} m-2 overflow-hidden rounded-md bg-white shadow-sm`}
      >
        <ListCard.Col>
          <ListCard.Header>
            <span
              title={props.companyName}
              className="max-w-[80vb] truncate text-supervan"
            >
              {props.details}
            </span>
            {props.pickup ? (
              <ListCard.Badge text="ramassage" className="bg-gray-800" />
            ) : null}
            {props.delivery ? (
              <ListCard.Badge text="livraison" className="bg-gray-800" />
            ) : null}
            {props.isValidatedAddress ? null : (
              <ListCard.Badge text="Invalid address" className="bg-red-500" />
            )}
          </ListCard.Header>
          <ListCard.Content>
            <EditableAddress
              defaultAddress={props.address}
              onChange={props.onChange}
            />
          </ListCard.Content>
          <ListCard.Content className="overflow-hidden">
            <span
              title={props.details}
              className="max-w-[90vb] truncate text-sm font-light"
            >
              {props.details}
            </span>
          </ListCard.Content>
          <ListCard.Info>
            <ListCard.InfoValue icon={UserIcon} text={props.contactName} />
            <ListCard.InfoValue
              icon={PhoneIcon}
              text={props.contactPhoneNumber}
            />
            <ListCard.InfoValue icon={CalendarIcon} text={props.date} />
          </ListCard.Info>
        </ListCard.Col>
        <ListCard.Col>
          <ListCard.Header>
            {props.commentary ? (
              <span title={props.commentary} className="cursor-pointer">
                <InformationCircleIcon className="w-5 text-gray-600" />
              </span>
            ) : null}
          </ListCard.Header>
          <ListCard.Info className="justify-end">
            <span>{props.position}</span>
          </ListCard.Info>
        </ListCard.Col>
      </ListCard>
    );
  },
);
