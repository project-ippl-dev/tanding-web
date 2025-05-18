
export interface RankingClubData {
  id: string;
  name: string;
  total_point: number;
  total_participate: number;
  logo?: string;
}

export interface RankingUserData {
  id: string;
  name: string;
  club_id: string;
  club_name: string;
  total_point: number;
  total_participate: number;
  photo?: string;
}