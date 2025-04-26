import React from "react";
import CardProfile from "./parts/Tentang/CardProfile";
import { Skeleton } from "@mui/material";


export default function Tentang ({ 
  description,
  wait = false }:
  {
  description: string | null
  wait: boolean
  }) {
  return (
    <CardProfile
      title= "Tentang Saya"
      content={wait? <Skeleton width="100%" height={50} /> : (description || "Tidak ada data")}
    />
  )
}

