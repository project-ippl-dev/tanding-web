"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { PaymentData } from "@/types/paymet.type";

interface PaymentListProps {
  payments: PaymentData[];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PaymentList({ payments }: PaymentListProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/payment/${id}`);
  };

  return (
    <div className="space-y-3 pb-20">
      <div className="h-px bg-gray-200 w-full" />

      {payments.map((payment) => (
        <div
          key={payment.id}
          onClick={() => handleClick(payment.id)}
          className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg cursor-pointer"
        >
          {payment.payment_link ? (
            <div className="w-16 h-12 relative mr-3 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={payment.payment_link}
                alt={payment.event_name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-12 flex items-center justify-center bg-gray-100 rounded-md mr-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {payment.event_name}
            </h3>
            <p className="text-gray-600 text-sm">
              {formatCurrency(payment.total)}
            </p>
          </div>

          <div className="ml-2">
            <PaymentStatusBadge status={payment.status} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Status badge component
function PaymentStatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "refund":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles()}`}
    >
      {status === "approved"
        ? "Disetujui"
        : status === "waiting"
        ? "Menunggu"
        : status === "rejected"
        ? "Ditolak"
        : status === "refund"
        ? "Refund"
        : status}
    </span>
  );
}
