export interface TruckType {
  key: string;
  title: string;
  shortTitle: string;
  capacity: number;
  imageUrl: string;
  activeImageUrl: string;
}

interface HandlerServiceType {
  key: string;
  title: string;
  description: string;
  imageUrl: string;
  activeImageUrl: string;
}

interface AmplitudeType {
  key: string;
  duration: string;
  startHour: string;
  endHour: string;
}

export const truckTypeList: TruckType[] = [
  {
    key: "12M3",
    title: "LARGE",
    shortTitle: "12m3",
    capacity: 1400,
    imageUrl: "truck-12m3.png",
    activeImageUrl: "truck-12m3-w.png",
  },
  {
    key: "20M3",
    title: "JUMBO",
    shortTitle: "20m3",
    capacity: 700,
    imageUrl: "truck-20m3.png",
    activeImageUrl: "truck-20m3.png",
  },
];

export const handlerServiceTypeList: HandlerServiceType[] = [
  {
    key: "1",
    title: "CHAUFFEUR MANUTENTIONNAIRE",
    description: "Max 1,5 m ou 30 kg par objet",
    imageUrl: "icon-man-blue.png",
    activeImageUrl: "icon-man.png",
  },
  {
    key: "2",
    title: "2 MANUTENTIONNAIRES",
    description: "Max 90 kg par objet",
    imageUrl: "icon-men-blue.png",
    activeImageUrl: "icon-men.png",
  },
];

export const amplitudeTypeList: AmplitudeType[] = [
  {
    key: "6h",
    duration: "6h",
    startHour: "9h30",
    endHour: "15h30",
  },
  {
    key: "4h",
    duration: "4h",
    startHour: "9h30",
    endHour: "13h30",
  },
  {
    key: "2h",
    duration: "2h",
    startHour: "9h30",
    endHour: "11h30",
  },
];
