"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { formatCurrency } from "../page";

interface DialogUploadProps {
  open: boolean;
  onClose: () => void;
  setImage: (files: File[]) => void;
  total: number;
  onSubmit: () => void;
  image: File[];
  isSubmitting: boolean;
}

export default function DialogUpload({
  open,
  onClose,
  setImage,
  total,
  onSubmit,
  image,
  isSubmitting,
}: DialogUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Clear previous images
    setPreviewUrls([]);

    // Only use the first file
    const file = files[0];

    // Check file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("File must be a JPG, JPEG, or PNG image");
      return;
    }

    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    // Set the file
    setImage([file]);

    // Generate preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrls([reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setImage([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Upload Bukti Pembayaran
          </h2>

          {/* Bank transfer details */}
          <div className="border-2 border-gray-200 rounded-md p-4 mb-6">
            <h3 className="font-semibold text-lg mb-2">Bank Transfer</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <p>Bank tujuan</p>
                <p>Bank A.N</p>
                <p>Total</p>
              </div>
              <div className="col-span-2">
                <p>: 7641391551</p>
                <p>: Aditya Lityanian Al Nasir</p>
                <p>: {formatCurrency(total)}</p>
              </div>
            </div>
          </div>

          {/* Upload area */}
          <div className="mb-6">
            <p className="font-medium mb-2">Upload Bukti</p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpg,image/jpeg,image/png"
              className="hidden"
            />

            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {previewUrls.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative w-full h-40 mx-auto">
                    <img
                      src={previewUrls[0]}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex justify-center space-x-3">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={triggerFileInput} className="cursor-pointer py-6">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                    ></path>
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Click to upload proof of payment
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Max file size: 2MB, Format: JPG, JPEG, PNG
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={image.length === 0 || isSubmitting}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                image.length === 0 || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
