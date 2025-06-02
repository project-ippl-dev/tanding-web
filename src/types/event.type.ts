export interface ClassEvent {
  id: string;
  class_id: string;
  class_name: string;
  price: number;
  match_type: "single" | "order";
  class_rule_name: string;
  class_rule_male: number;
  class_rule_female: number;
  class_rule_total: number;
  summary: null | string;
}

export interface GeneralChampion {
  club_id: string;
  club_name: string;
  rank1: number;
  rank2: number;
  rank3: number;
  total_point: number;
}

export interface UserPrivilege {
  id: number;
  role: string;
}

export interface EventData {
  id: string;
  user_id: string;
  user_name: string;
  user_image: string;
  type: string;
  name: string;
  description: string;
  prize_pool: string;
  location: string;
  province: string;
  city: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  deadline: string;
  sport_id: string;
  sport_name: string;
  rules: string;
  proposal_link: string;
  status: boolean;
  quota: number;
  open: string;
  remark: string;
  class_events: ClassEvent[];
  participants: number;
  user_privilege: UserPrivilege;
  event_turn_lock: boolean;
  general_champions: GeneralChampion[];
}

export interface EventInfinityData {
  id: string;
  user_id: string;
  user_image: string;
  user_name: string;
  type: string;
  name: string;
  description: string;
  prize_pool: string;
  location: string;
  province: string;
  city: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  deadline: string;
  sport_id: string;
  sport_name: string;
  quota: number;
  order: number;
  open: string;
  remark: string;
  participants: number;
}

export interface EventParticipantMember {
  id: number;
  event_registration_id: string;
  user_id: string;
  name: string;
  class_name: string;
}

export interface EventParticipant {
  id: string;
  name: string;
  total_point: number;
  total_user: number;
  members: EventParticipantMember[];
}

export interface EventParticipantsResponse {
  message: string;
  data: EventParticipant[];
}

export interface EventSingleResponse {
  message: string;
  data: EventData;
}

export interface EventInfinityResponse {
  message: string;
  data: Array<EventInfinityData>;
  total_item: number; // Added to match the EVENT_INFINITY response
}

export interface EventUpdatePayload {
  name: string;
  type: string;
  description: string;
  prize_pool: string;
  location: string;
  province: string;
  city: string;
  thumbnail: string;
  start_date: Date | string | null;
  end_date: Date | string | null;
  deadline: Date | string | null;
  sport_id: string;
  rules: string;
  proposal_link?: string;
  quota: number;
  open: Date | string | null;
}

export interface EventOwnData {
  id: string;
  user_id: string;
  user_name: string;
  type: string;
  name: string;
  description: string;
  prize_pool: string;
  location: string;
  province: string;
  city: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  deadline: string;
  sport_id: string;
  sport_name: string;
  rules: string;
  proposal_link: string;
  status: boolean;
  quota: number;
  open: string;
  remark: string;
  // participants is missing in EVENT_OWN sample data, but present in EventInfinityData.
  // Add if it can be present, otherwise omit. For now, I'll assume it might be similar to EventInfinityData.
  participants?: number;
}

export interface EventOwnResponse {
  message: string;
  data: EventOwnData[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

export interface EventCreatePayload {
  name: string;
  type: string;
  description: string;
  prize_pool: string;
  location: string;
  province: string;
  city: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  deadline: string;
  sport_id: string;
  rules: string;
  proposal_link?: string;
  quota: number;
  open: string;
}
