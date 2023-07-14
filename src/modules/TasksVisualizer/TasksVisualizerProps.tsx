import { Address } from "../../types/Address";

export interface TasksVisualizerProps {
  id: string;

  position: number;

  date: string;

  pickup: boolean;

  delivery: boolean;

  destinationAddress: Address;

  details: string;

  commentary?: string;

  companyName: string;

  contactName: string;

  contactPhoneNumber: string;
}
