import { CATEGORY_TYPE } from "../types";

import { LiaDumbbellSolid } from "react-icons/lia";
import { IoTicketOutline } from "react-icons/io5";
import { FaTshirt, FaCar } from "react-icons/fa";
import { PiBowlFood } from "react-icons/pi";
import { IoMdAirplane } from "react-icons/io";

export const CATEGORIES: Record<string, CATEGORY_TYPE> = {
  gym: {
    name: "Gym",
    value: "gym",
    icon: <LiaDumbbellSolid size={25} />,
    bgColor: "#1db878",
    textColor: "#0b5939",
  },
  tickets: {
    name: "Tickets",
    value: "tickets",
    icon: <IoTicketOutline size={25} />,
    bgColor: "#2ad1a7",
    textColor: "#107058",
  },
  clothes: {
    name: "Clothes",
    value: "clothes",
    icon: <FaTshirt size={25} />,
    bgColor: "#e68c3e",
    textColor: "#804717",
  },
  food: {
    name: "Food & Restaurants",
    value: "food",
    icon: <PiBowlFood size={25} />,
    bgColor: "#e65f40",
    textColor: "#91341f",
  },
  travel: {
    name: "Travel",
    value: "travel",
    icon: <IoMdAirplane size={25} />,
    bgColor: "#4eb5de",
    textColor: "#1b5c75",
  },
  transport: {
    name: "Transport",
    value: "transport",
    icon: <FaCar size={25} />,
    bgColor: "#b36ef0",
    textColor: "#562185",
  },
};
