// Payment Types
export interface PaymentData {
  id: string;
  event_id: string;
  event_name: string;
  unique_number: number;
  payment_link: string;
  status: "waiting" | "approved" | "rejected" | "refund";
  club_id: string;
  club_name: string;
  user_name: string;
  admin_name: string;
  club_owner: string;
  total: number;
  created_at: string;
  class_events: PaymentClassEvent[];
}

export interface PaymentClassEvent {
  id: string;
  price: number;
  name: string;
}

export interface PaymentSummary {
  approved: number;
  waiting: number;
  refund: number;
}

export interface PaymentStoreData {
  link?: string;
  [key: string]: any;
}

export interface PaymentQueryParams {
  status?: "waiting" | "approved" | "rejected" | "refund";
  start?: string; // YYYY-MM-DD
  end?: string; // YYYY-MM-DD
  page?: number;
  page_size?: number;
  clubs?: string;
}


export interface PaymentDetail {
  unique_number: {
    number: string;
  };
  event: {
    event_name: string;
    event_owner: string;
    sport_name: string;
    thumbnail: string;
    deadline: string;
  };
  results: {
    id: string;
    class_name: string;
    price: number;
    participants: string[];
  }[];
}