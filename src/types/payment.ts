export type PaymentStatus = "rejected" | "approved" | "waiting" | "refund";

interface ClassEvent {
  id: string;
  price: number;
  name: string;
}

interface PaymentData {
  id: string;
  event_id: string;
  event_name: string;
  unique_number: number;
  payment_link: string;
  status: PaymentStatus;
  club_id: string;
  club_name: string;
  user_name: string;
  admin_name: string;
  club_owner: string;
  total: number;
  created_at: string;
  class_events: ClassEvent[];
}

export interface PaymentOwner {
  message: string;
  data: PaymentData[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

export interface PaymentSummary {
  message: string;
  data: {
    approved: number;
    waiting: number;
    refund: number;
  };
}