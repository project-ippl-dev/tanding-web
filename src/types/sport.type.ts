export interface SportBaseType {
  id: number;
  sport_id: string;
  sport_name: string;
}
export interface GetSportParams {
  keyword?: string;
  category?: string;
  page?: string | number;
  page_size?: string | number;
}


export interface Sport {
  id: string;
  name: string;
  description: string;
  type: string;
  thumbnail: string;
}

export interface SportResponseMultiple {
  message: string;
  data: Sport[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}