"use client";

import { useEffect, useState } from "react";
import { getAllPaymentForClub } from "@/store/actions/payment";
import { PaymentData } from "@/types/paymet.type";
import LoadingSpinner from "./_components/LoadingSpiiner";
import PaymentList from "./_components/PaymentList";
import EmptyState from "./_components/EmptyState";

export default function PaymentPage() {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPaymentForClub();
        if (response.data) {
          setPayments(response.data);
        }
      } catch (err) {
        setError((err as Error).message || "Failed to load payments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h1 className="text-xl font-bold mb-4">Registrasi ({payments.length})</h1>

      {payments.length > 0 ? (
        <PaymentList payments={payments} />
      ) : (
        <EmptyState
          title="Tidak ada data registrasi"
          description="Belum ada pembayaran untuk ditampilkan"
          icon="receipt"
        />
      )}
    </div>
  );
}
