"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { FaInstagram } from "react-icons/fa";
import { FiPhone, FiLink, FiMail } from "react-icons/fi";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Email from "next-auth/providers/email";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description?: string;
  category?:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
  instagram?: string | null;
  phone?: string | number | null;
  website?: string | null;
  mail?: string | null;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  locationValue,
  instagram,
  phone,
  website,
  mail,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      {/* <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500"></div>
      </div> */}

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-500"
        >
          <FaInstagram size={20} />
          <span>{instagram}</span>
        </a>
      )}
      {phone && (
        <div className="flex items-center gap-2 text-neutral-500">
          <FiPhone size={20} />
          <span>{phone}</span>
        </div>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-500"
        >
          <FiLink size={20} />
          <span>{website}</span>
        </a>
      )}
      {mail && (
        <a
          href={`mailto:${mail}`}
          className="flex items-center gap-2 text-neutral-500"
        >
          <FiMail size={20} />
          <span>{mail}</span>
        </a>
      )}
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
