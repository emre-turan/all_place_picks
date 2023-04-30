"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/images/logo.png";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer"
      src={logo}
      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
