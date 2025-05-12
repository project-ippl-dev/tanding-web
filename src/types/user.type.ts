interface User {
  id: string;
  name: string;
  username: string;
}

export interface UserSearchResponse {
  message: string;
  data: User[];
}