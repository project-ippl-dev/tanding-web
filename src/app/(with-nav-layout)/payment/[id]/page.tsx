"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDetailPaymentForClub, storePayment } from "@/store/actions/payment";
import { PaymentDetail } from "@/types/paymet.type";
import LoadingOverlay from "./_components/LoadingOverlay";
import DialogUpload from "./_components/DialogUpload";

export default function PaymentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [selectedClass, setSelectedClass] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        setLoading(true);
        const response = await getDetailPaymentForClub(id);
        if (response.data) {
          setPaymentDetail(response.data);
        }
      } catch (err) {
        setError((err as Error).message || "Failed to load payment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaymentDetail();
    }
  }, [id]);

  const handleSelectClass = (value: any) => {
    const selectedIndex = selectedClass.findIndex(
      (item) => item.id === value.id
    );
    let newSelectedItems = [...selectedClass];

    if (selectedIndex === -1) {
      // Add the item
      newSelectedItems.push(value);
    } else {
      // Remove the item
      newSelectedItems = newSelectedItems.filter(
        (_, index) => index !== selectedIndex
      );
    }

    // Calculate new total
    const newTotal =
      newSelectedItems.length > 0
        ? newSelectedItems.reduce((sum, item) => sum + item.price, 0)
        : 0;

    setTotal(newTotal);
    setSelectedClass(newSelectedItems);
  };

  const isSelected = (id: string) =>
    selectedClass.some((item) => item.id === id);

  const handleStorePayment = async () => {
    if (!paymentDetail || selectedClass.length === 0 || image.length === 0)
      return;

    try {
      setIsSubmitting(true);
      const data = {
        unique_number: parseInt(paymentDetail.unique_number.number),
        total: total,
        registrations: selectedClass.map((value) => value.id),
      };

      await storePayment(id, data, image[0]);
      setOpenDialog(false);
      // Refresh the page or navigate
      window.location.href = "/payment";
    } catch (err) {
      setError((err as Error).message || "Failed to process payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div className="p-6 text-center" data-testid="error-state">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!paymentDetail) {
    return (
      <div className="p-6 text-center" data-testid="no-data-state">
        <p>No payment details found</p>
      </div>
    );
  }

  const finalTotal =
    total + (total > 0 ? parseInt(paymentDetail.unique_number.number) : 0);

  return (
    <div className="bg-white min-h-screen" data-testid="payment-detail-page">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Payment Detail</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2" data-testid="payment-details">
            <div className="mb-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                {paymentDetail.event.event_owner?.charAt(0) || "U"}
              </div>
              <p>{paymentDetail.event.event_owner}</p>
            </div>

            <div className="flex flex-col sm:flex-row mb-6">
              <div className="relative w-full sm:w-32 h-24 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 bg-gray-100 rounded overflow-hidden">
                {paymentDetail.event.thumbnail ? (
                  <img
                    src={paymentDetail.event.thumbnail}
                    alt={paymentDetail.event.event_name || "Event thumbnail"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-lg font-semibold">
                    {paymentDetail.event.event_name}
                  </h2>
                  <p className="text-gray-600">
                    {paymentDetail.event.sport_name}
                  </p>
                </div>

                <p className="font-bold mt-2">
                  Bayar sebelum{" "}
                  {formatDate(
                    new Date(paymentDetail.event.deadline).toISOString(),
                    "dd-MM-yyyy"
                  )}
                </p>
              </div>
            </div>

            {paymentDetail.results && paymentDetail.results.length > 0 && (
              <>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-semibold mb-2">
                  Detail Registrasi
                </p>
                <div className="h-2 bg-gray-100 w-full mb-4"></div>

                {paymentDetail.results.map((item) => {
                  const isItemSelected = isSelected(item.id);
                  return (
                    <div
                      key={item.id}
                      className="mb-6"
                      data-testid={`class-item-${item.id}`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4 flex items-start">
                          <div className="flex items-center">
                            <label className="inline-flex items-center mr-2">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 rounded"
                                checked={isItemSelected}
                                onChange={() => handleSelectClass(item)}
                                data-testid={`checkbox-${item.id}`}
                              />
                            </label>
                            <div>
                              <p className="font-semibold">{item.class_name}</p>
                              <p>{formatCurrency(item.price)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-8">
                          <p className="font-semibold mb-2">
                            Member yang didaftarkan
                          </p>
                          {item.participants.map((name, index) => (
                            <p key={index} className="text-gray-700">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 w-full mt-4"></div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              data-testid="payment-summary"
            >
              {/* Promo section */}
              <div className="p-4">
                <div className="border border-gray-200 rounded p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                  <div className="text-pink-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-grow mx-3">
                    <p className="font-semibold text-sm">
                      Makin Hemat dengan Promo
                    </p>
                    <p className="text-xs text-gray-500">
                      Pilih payment terlebih dahulu
                    </p>
                  </div>
                  <div className="text-pink-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="h-2 bg-gray-100 w-full"></div>

              {/* Summary section */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-4">
                  Ringkasan Payment
                </h3>

                <div className="space-y-2 mb-4" data-testid="selected-classes">
                  {selectedClass.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p>Total {item.class_name}</p>
                      <p>{formatCurrency(item.price)}</p>
                    </div>
                  ))}

                  {total > 0 && (
                    <div className="flex justify-between">
                      <p>Unique number</p>
                      <p>{paymentDetail.unique_number.number}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div
                  className="flex justify-between font-semibold my-4"
                  data-testid="total-price"
                >
                  <p>Total Harga</p>
                  <p>{formatCurrency(finalTotal)}</p>
                </div>

                <button
                  className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                    selectedClass.length === 0 ||
                    !paymentDetail.results ||
                    paymentDetail.results.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  }`}
                  disabled={
                    selectedClass.length === 0 ||
                    !paymentDetail.results ||
                    paymentDetail.results.length === 0
                  }
                  onClick={() => setOpenDialog(true)}
                  data-testid="pay-button"
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogUpload
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        setImage={setImage}
        total={finalTotal}
        onSubmit={handleStorePayment}
        image={image}
        isSubmitting={isSubmitting}
      />

      {isSubmitting && <LoadingOverlay />}
    </div>
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  dateString: string,
  formatPattern: string = "dd-MM-yyyy"
): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return formatPattern
      .replace("yyyy", date.getFullYear().toString())
      .replace("MM", padZero(date.getMonth() + 1))
      .replace("dd", padZero(date.getDate()))
      .replace("HH", padZero(date.getHours()))
      .replace("mm", padZero(date.getMinutes()))
      .replace("ss", padZero(date.getSeconds()));
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}
