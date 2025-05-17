"use client";
import BannerMobile from "@/assets/images/banner-mobile.jpg"
import BannerDesktop from "@/assets/images/banner-desktop.jpg"
import Image from "next/image";

export default function HomeEventsCarousel() {
  return (
    <>
      <div className="block sm:hidden w-full aspect-video object-cover bg-white">
        <Image alt="Banner_Mobile" src={BannerMobile} />
      </div>
      <div className="hidden sm:block w-full aspect-16/4 object-cover bg-white">
        <Image alt="Banner_Desktop" src={BannerDesktop} />
      </div>
    </>
    // </Box>
  );
}
