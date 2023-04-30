"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach } from "react-icons/tb";

import { GiForestCamp, GiFriedEggs, GiSkier } from "react-icons/gi";
import {
  FaHotel,
  FaShoppingBag,
  FaCoffee,
  FaPizzaSlice,
  FaHotjar,
} from "react-icons/fa";

import { MdOutlineKitesurfing } from "react-icons/md";
import { BiRestaurant } from "react-icons/bi";
import { MdOutlineNightlife, MdMuseum } from "react-icons/md";
import { IoBeer } from "react-icons/io5";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

//Define the categories here
export const categories = [
  {
    label: "Popular",
    icon: FaHotjar,
    description:
      "These gems are loved by many and are definitely worth checking out!",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "Relax and soak up the sun on these beautiful beaches.",
  },
  {
    label: "Surf",
    icon: MdOutlineKitesurfing,
    description:
      "Catch some waves and enjoy the thrill of surfing at these locations.",
  },
  {
    label: "Coffee",
    icon: FaCoffee,
    description:
      "Satisfy your caffeine cravings with some delicious coffee at these spots.",
  },
  {
    label: "Pizza",
    icon: FaPizzaSlice,
    description: "Indulge in some mouth-watering pizza at these restaurants.",
  },
  {
    label: "Museum",
    icon: MdMuseum,
    description:
      "Immerse yourself in history, culture, and art at these museums.",
  },
  {
    label: "Hotel",
    icon: FaHotel,
    description: "Enjoy a comfortable and pleasant stay at these hotels.",
  },
  {
    label: "Restaurant",
    icon: BiRestaurant,
    description: "Experience the best dining at these top-rated restaurants.",
  },
  {
    label: "Breakfast",
    icon: GiFriedEggs,
    description:
      "Start your day off right with a delicious breakfast at these eateries.",
  },
  {
    label: "Pub/Bar",
    icon: IoBeer,
    description: "Unwind and have a good time at these lively pubs and bars.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description:
      "Get close to nature and have an adventurous experience camping at these locations.",
  },
  {
    label: "Skier",
    icon: GiSkier,
    description: "Hit the slopes and enjoy winter sports at these ski resorts",
  },
  {
    label: "Shopping",
    icon: FaShoppingBag,
    description:
      "Find everything you need and more at these shopping destinations.",
  },
  {
    label: "Nightlife",
    icon: MdOutlineNightlife,
    description:
      "Experience the ultimate nightlife and entertainment at these hotspots.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
