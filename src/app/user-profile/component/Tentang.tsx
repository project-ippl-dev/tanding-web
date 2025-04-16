import React from "react";
import CardProfile from "../parts/Tentang/CardProfile";

type aboutData = {
  data: Record<string,unknown>
}

export default function Tentang ({ 
  data }:{
    data: aboutData
  }) {
  return (
    <CardProfile
      title="Tentang Saya"
      content={data?.data?.about || "Tidak ada data"}
    />
  )
}

