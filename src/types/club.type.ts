import { SportBaseType } from "./sport.type";

export interface ClubAllData {
  message: string;
  data: ClubBaseType[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

export interface ClubOneData {
  message: string;
  data: ClubBaseType;
}

export interface ClubMemberData {
  message: string;
  data: {
    total_point: number;
    participants: ClubMemberBaseType[];
  };
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

export interface ClubJoinData {
  message: string;
  data: ClubJoinBaseType[];
}

export interface ClubBaseType {
  id: string;
  name: string;
  logo: string;
  short_name: string;
  owner: string;
  sports: SportBaseType[];
  privilege?: boolean;
  joined?: boolean;
}

export interface ClubMemberBaseType {
  id: number;
  user_id: string;
  name: string;
  can_participate: boolean;
  point: number;
}

export interface ClubJoinBaseType {
  id: number;
  sport_id: string;
  name: string;
  sport_name: string;
}

export interface CreateClubFormData {
  clubData: Omit<ClubBaseType, 'id' | 'logo' | 'owner' | 'privilege' | 'joined' | 'sports'>
  sports: SportBaseType[],
  phone: string;
}