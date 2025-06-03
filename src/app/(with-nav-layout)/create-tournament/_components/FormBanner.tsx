"use client";

import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";

interface FormBannerProps {
  setBanner: (file: File | null) => void;
  setProposal: (file: File | null) => void;
}

export default function FormBanner({
  setBanner,
  setProposal,
}: FormBannerProps) {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [proposalName, setProposalName] = useState<string | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File terlalu besar. Maksimal 2MB.");
        return;
      }

      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Format file tidak valid. Gunakan JPG, JPEG, atau PNG.");
        return;
      }

      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      // Check file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        alert("File terlalu besar. Maksimal 20MB.");
        return;
      }

      // Check file type
      if (file.type !== "application/pdf") {
        alert("Format file tidak valid. Gunakan PDF.");
        return;
      }

      setProposal(file);
      setProposalName(file.name);
    }
  };

  return (
    <Card
      sx={{
        padding: "32px 24px 16px 24px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        borderRadius: 2,
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
        Banner Pertandingan
      </Typography>
      <Typography sx={{ fontSize: "14px", color: "#666666" }}>
        Design Banner yang terbaik akan menarik para user
      </Typography>

      <Box sx={{ mt: 3, px: 1 }}>
        <Typography sx={{ mb: 1 }}>Upload Banner</Typography>
        <Box
          sx={{
            border: "2px dashed #cccccc",
            borderRadius: 1,
            p: 3,
            textAlign: "center",
            mb: 2,
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="banner-upload"
            type="file"
            onChange={handleBannerChange}
          />
          <label htmlFor="banner-upload">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {!bannerPreview ? (
                <>
                  <Box sx={{ mb: 2 }}>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 14V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V14"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 3L12 15"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 7L12 3L16 7"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Typography sx={{ fontWeight: "medium" }}>
                    Upload Banner
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Max file size: 2MB, Format: JPG, JPEG, PNG
                  </Typography>
                </>
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    mb: 2,
                  }}
                >
                  <Image
                    src={bannerPreview}
                    alt="Banner preview"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              )}
            </Box>
          </label>
          {bannerPreview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Klik gambar untuk mengganti banner
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 3, px: 1 }}>
        <Typography sx={{ mb: 1 }}>
          Upload Proposal Pertandingan (*opsional)
        </Typography>
        <Box
          sx={{
            border: "2px dashed #cccccc",
            borderRadius: 1,
            p: 3,
            textAlign: "center",
          }}
        >
          <input
            accept=".pdf"
            style={{ display: "none" }}
            id="proposal-upload"
            type="file"
            onChange={handleProposalChange}
          />
          <label htmlFor="proposal-upload">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {!proposalName ? (
                <>
                  <Box sx={{ mb: 2 }}>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Typography sx={{ fontWeight: "medium" }}>
                    Upload Proposal
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Max file size: 20MB, Format: PDF
                  </Typography>
                </>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
                      stroke="#666666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
                      stroke="#666666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Typography sx={{ ml: 1 }}>{proposalName}</Typography>
                </Box>
              )}
            </Box>
          </label>
          {proposalName && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Klik untuk mengganti proposal
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
