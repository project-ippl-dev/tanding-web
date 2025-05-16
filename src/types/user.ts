export interface UserData {
  id: string;
  name: string;
  username: string;
}

export default interface UserSearchResponse {
  message: string;
  data: UserData[];
}