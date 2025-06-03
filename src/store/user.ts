import { FetchResponseBody } from "@/types/global"
import { UserData } from "@/types/user"

export const USER_SEARCH: FetchResponseBody<UserData[]> = {
  "message": "fetch user by search success",
  "data": [
    {
      "id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "name": "Aditya Lityanian Al Nasir 93934",
      "username": "aditya.lityanian@raharja.info"
    },
    {
      "id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "name": "Aditya Lityanian Al Nasir 93934",
      "username": "dytlanian@gmail.com"
    }
  ]
}