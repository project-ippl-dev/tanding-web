export interface SportBaseType {
  id: string;
  sport_id?: string; // rename to id
  sport_name?: string; // rename to name
  name: string;
  description: string;
  type: string;
  thumbnail?: string;
}

export interface SportAllResponse {
  message: number;
  data: SportBaseType[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}