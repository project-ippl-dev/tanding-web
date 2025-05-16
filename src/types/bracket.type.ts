export interface BracketTeam {
  id: number;
  club_id: string;
  club_name: {
    String: string;
    Valid: boolean;
  };
  type: "home" | "away";
  participants: string[];
  is_bye: boolean;
  event_registration_id: string;
  club_logo: string;
  Score: {
    round1: number;
    round2: number;
    round3: number;
    extra: number;
    total: number;
  };
}

export interface BracketSeed {
  id: string;
  event_turn: number;
  match_order: number;
  is_active: number;
  is_score: boolean;
  teams: BracketTeam[];
}

export interface BracketRound {
  title: string;
  seeds: BracketSeed[];
}

export interface BracketSummary {
  id: string;
  rank: number;
  point: number;
  club_name: string;
  club_logo: string;
  participants: string[];
}

export interface BracketSingleResponse {
  message: string;
  data: BracketRound[];
  generate_status: boolean;
  lock_status: boolean;
  match_type: "single" | "order";
  lock_score: boolean;
  summary: BracketSummary[];
}

export interface BracketResponse {
  singleBracket: BracketSingleResponse | null;
  orderBracket: BracketOrderResponse | null;
  type: string | null;
}

export interface BracketOrderScore {
  id: string;
  round1: number;
  round2: number;
  round3: number;
  extra: number;
  total: number;
}

export interface BracketOrderData {
  id: string;
  rank: number;
  order_by: number;
  participants: string[];
  club_name: string;
  club_logo: string;
  event_registration_id: string;
  scores: BracketOrderScore;
}

export interface BracketOrderResponse {
  message: string;
  data: BracketOrderData[];
  generate_status: boolean;
  lock_status: boolean;
  match_type: "order";
  lock_score: boolean;
  summary: BracketSummary[];
}

export interface BracketParticipant {
  event_registration_id: string;
  iteration: number;
}

export interface LockOrderBracketData {
  status: boolean;
  participants: BracketParticipant[];
}

export interface BracketSingleSeedTeam {
  id: number;
  club_id: string;
  club_name: {
    String: string;
    Valid: boolean;
  };
  type: "home" | "away";
  participants: string[] | null;
  is_bye: boolean;
  event_registration_id: string;
}

export interface BracketSingleSeedData {
  id: string;
  event_turn: number;
  match_order: number;
  teams: BracketSingleSeedTeam[];
}

export interface LockSingleBracketData {
  status: boolean;
  data: {
    title: string;
    seed: BracketSingleSeedData[];
  };
}
