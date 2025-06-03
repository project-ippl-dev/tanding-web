import { SportBaseType } from "./sport.type";

export interface CreateClubFormData {
  clubData: Omit<ClubFetchOneData, 'id' | 'owner' | 'privilege' | 'joined' | 'sports' | 'logo'> 
  sports: Omit<SportBaseType, 'description'|'type' >[],
  phone: string;
}

export interface CreateClubRequestBody {
  name: string;
  // logo?: string; //TODO: Match logo type
  phone: string;
  short_name: string;
  sports:
  {
    sport_id: string
  }[]
}

export interface ClubFetchOneData {
  id: string;
  name: string;
  logo: string;
  short_name: string;
  owner: string;
  sports: {
    id: number;
    sport_id: string;
    sport_name: string;
  }[];
  privilege: boolean;
  joined: boolean;
}

export interface ClubFetchAllData {
  id: string;
  name: string;
  logo: string;
  short_name?: string;
  owner: string;
  sports: {
    id: number;
    sport_id: string;
    sport_name: string;
  }[];
}

export interface ClubFetchInviteRequestData {
  id: number;
  club_id: string;
  sport_id: string;
  sport_name: string;
  name: string;
}

export interface ClubFetchJoinRequestData {
  id: number;
  sport_id: string;
  sport_name: string;
  name: string;
}

export interface ClubFetchMemberData {
  total_point: number;
  participants: ClubMember[]
}

export interface ClubMember {
  id: number;
  user_id: string;
  name: string;
  can_participate: boolean;
  point: number;
}