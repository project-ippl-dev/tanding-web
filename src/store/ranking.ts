import { FetchResponseBody } from "@/types/global";
import { RankingClubData, RankingUserData } from "@/types/ranking.types";

export const MOCK_RANKING_CLUB: FetchResponseBody<RankingClubData[]> = {
  "message": "fetch all rank success",
  "data": [
    {
      "id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "name": "Black Jaguar Taekwondo Club",
      "total_point": 120,
      "total_participate": 22,
      "logo": "http://google.com"
    }
  ],
  "current_page": 1,
  "has_previous_page": false,
  "has_next_page": false,
  "previous_page": 0,
  "next_page": 2,
  "last_page": 1,
  "total_item": 1,
  "status": 200
}

export const MOCK_RANKING_USER: FetchResponseBody<RankingUserData[]> = {
  "message": "fetch all user rank success",
  "data": [
    {
      "id": "26c2608a-b5ff-4e1c-9420-379fca450ee2",
      "name": "Angga Widianto",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 30,
      "total_participate": 4,
      "photo": "https://tanding.oss-ap-southeast-5.aliyuncs.com/profile/1631803289_apex-legends-mobile-segera-rilis-di-android-dan-ios_169.jpeg"
    },
    {
      "id": "5862e502-ab61-40c1-bd81-0ce9834ec357",
      "name": "Agung Rizky",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 20,
      "total_participate": 2,
      "photo": ""
    },
    {
      "id": "243dd872-ceda-4684-83ba-d2fe9a692205",
      "name": "Muhammad Ikbal",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 20,
      "total_participate": 2,
      "photo": "https://lh3.googleusercontent.com/a-/AOh14Gjpbz-72tFfSZU7jugplMN7KG6Qbu7bH3gGANsgPA=s96-c"
    },
    {
      "id": "48ec0e0b-6761-4b2e-a4e5-3d11d14279ba",
      "name": "Muhammad Ikbal",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 20,
      "total_participate": 2,
      "photo": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4266655693428223&height=500&ext=1632387974&hash=AeTRMFA9_b0TbAivmZo"
    },
    {
      "id": "40261c1f-7223-438c-b981-c690d6b30002",
      "name": "Ditz Dhiza",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 16,
      "total_participate": 4,
      "photo": ""
    },
    {
      "id": "76d28464-bc72-4dc8-83c4-2dddf736eef3",
      "name": "Angga",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 12,
      "total_participate": 4,
      "photo": ""
    },
    {
      "id": "162d4e59-a44e-4820-85b7-0c221ad3074a",
      "name": "dytlan",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 10,
      "total_participate": 2,
      "photo": ""
    },
    {
      "id": "5ca5b735-8b01-4a83-914f-9dfb6b7fbf44",
      "name": "Aditya Lityanian A.N",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 10,
      "total_participate": 2,
      "photo": "https://lh3.googleusercontent.com/a-/AOh14GjW71X9QAntHjn6p2uwWwyrFh4VyheBlqzO4dkkBw=s96-c"
    },
    {
      "id": "ee64c647-385c-4de9-9aba-3df270ea1b67",
      "name": "Aditya Mardiansyah",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 6,
      "total_participate": 2,
      "photo": ""
    },
    {
      "id": "1d414883-e092-45a1-a235-e7a80dfd7f49",
      "name": "Aditya Mardiansyah 95764",
      "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "club_name": "Black Jaguar Taekwondo Club",
      "total_point": 6,
      "total_participate": 2,
      "photo": "https://lh3.googleusercontent.com/a-/AOh14GiFuT0KaIB9VJEx_1P_vlevzKcFm0pba_BmmzclAQ=s96-c"
    }
  ],
  "current_page": 1,
  "has_previous_page": false,
  "has_next_page": true,
  "previous_page": 0,
  "next_page": 2,
  "last_page": 2,
  "total_item": 12,
  "status": 200
}