export interface PaginationData {
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

export interface UserCertificate {
  id: string;
  name: string;
  event_name: string;
  thumbnail: string;
  reward_as: string;
  created_at: string;
}

export interface ClubCertificate {
  id: string;
  name: string;
  event_name: string;
  thumbnail: string;
  reward_as: string;
  created_at: string;
}

export interface CertificateResponse {
  message: string;
  data:
    | UserCertificate
    | UserCertificate[]
    | ClubCertificate
    | ClubCertificate[];
  pagination: PaginationData;
  error?: string;
  status?: number;
}
