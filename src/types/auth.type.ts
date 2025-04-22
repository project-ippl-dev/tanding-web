export interface AuthData {
  message: string;
  data: {
    profile: {
      name: string;
      photo: string;
    };
    token: {
      access_token: string;
      type: string;
      expired_at: number;
    };
    role: string;
    privileges: string[];
    clubs: {
      id: string;
      name: string;
    }[];
    can_participate: boolean;
    user_id: string;
    owners: {
      id: string;
      name: string;
    }[];
  };
}
