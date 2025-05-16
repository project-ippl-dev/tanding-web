import { EventSingleResponse } from "@/types/event.type";
import TournamentResultArray from "@/types/tournament.type";

export const exampleTournamentResults: TournamentResultArray[] = [
  {
    club_name: "Golden Eagles",
    club_logo: "/images/golden-eagles-logo.png",
    participants: ["Alice", "Bob", "Charlie"],
  },
  {
    club_name: "Silver Sharks",
    club_logo: "/images/silver-sharks-logo.png",
    participants: ["David", "Eve", "Frank"],
  },
  {
    club_name: "Bronze Bears",
    club_logo: "/images/bronze-bears-logo.png",
    participants: ["Grace", "Hank", "Ivy"],
  },
];

export const TOURNAMENT_DETAIL: EventSingleResponse = {
  "message": "fetch one event success",
  "data": {
    "id": "bc50d5d6-6cef-4789-8d05-87db60a876e1",
    "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
    "user_name": "Aditya Lityanian Al Nasir",
    "user_image": "https://lh3.googleusercontent.com/a-/AOh14GjW71X9QAntHjn6p2uwWwyrFh4VyheBlqzO4dkkBw=s96-c",
    "type": "competition",
    "name": "Kejuaraan Taekwondo Poomsae",
    "description": "Kompetisi Olahraga Beladiri Taekwondo",
    "prize_pool": "50000000",
    "location": "Tangerang Raya. Dlll",
    "province": "Banten",
    "city": "Tangerang",
    "thumbnail": "https://google.com",
    "start_date": "Friday, 01 October 2021",
    "end_date": "Friday, 01 October 2021",
    "deadline": "2021-09-30T15:00:20Z",
    "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
    "sport_name": "Taekwondo Reversed",
    "rules": "bebas",
    "proposal_link": "http://google.com",
    "status": true,
    "quota": 100,
    "open": "Thursday, 30 September 2021, 10:00",
    "remark": "closed",
    "class_events": [
      {
        "id": "c49e3e2d-2318-40a2-812f-b84dd8badbcf",
        "class_id": "4aba86f5-9458-4f79-a110-fd0c079d6d30",
        "class_name": "Olahraga Single Elimination",
        "price": 150000,
        "match_type": "single",
        "class_rule_name": "Single",
        "class_rule_male": 0,
        "class_rule_female": 0,
        "class_rule_total": 1,
        "summary": null
      },
      {
        "id": "352f2d81-8642-46cc-9946-062ad97b1dd5",
        "class_id": "1471ad0a-46e5-446b-b245-7a8657e56b7e",
        "class_name": "Olahraga Pair",
        "price": 500000,
        "match_type": "order",
        "class_rule_name": "Pair Mix",
        "class_rule_male": 0,
        "class_rule_female": 0,
        "class_rule_total": 2,
        "summary": null
      },
      {
        "id": "be57c9ff-1575-4d9f-8119-c8ab647a724c",
        "class_id": "0c71c0af-e859-432f-a17c-aec2db6e19c6",
        "class_name": "Olahraga Single",
        "price": 350000,
        "match_type": "single",
        "class_rule_name": "Single",
        "class_rule_male": 0,
        "class_rule_female": 0,
        "class_rule_total": 1,
        "summary": null
      }
    ],
    "participants": 13,
    "user_privilege": {
      "id": 4,
      "role": "owner"
    },
    "event_turn_lock": true,
    "general_champions": [
      {
        "club_id": "41510e3f-f3ed-4b86-811d-74755b794519",
        "club_name": "Black Jaguar Taekwondo Club",
        "rank1": 6,
        "rank2": 6,
        "rank3": 10,
        "total_point": 120
      }
    ]
  }
}

export const TOURNAMENT_INFINITY=  {
  "message": "fetch infinite scroll for event success",
  "data": [
    {
      "id": "bc50d5d6-6cef-4789-8d05-87db60a876e1",
      "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "user_image": "https://lh3.googleusercontent.com/a-/AOh14GjW71X9QAntHjn6p2uwWwyrFh4VyheBlqzO4dkkBw=s96-c",
      "user_name": "Aditya Lityanian Al Nasir",
      "type": "competition",
      "name": "Kejuaraan Taekwondo Poomsae",
      "description": "Kompetisi Olahraga Beladiri Taekwondo",
      "prize_pool": "50000000",
      "location": "Tangerang Raya. Dlll",
      "province": "Banten",
      "city": "Tangerang",
      "thumbnail": "https://google.com",
      "start_date": "Friday, 01 October 2021",
      "end_date": "Friday, 01 October 2021",
      "deadline": "30 September 2021, 15:00",
      "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
      "sport_name": "Taekwondo Reversed",
      "quota": 100,
      "order": 17,
      "open": "Thursday, 30 September 2021, 10:00",
      "remark": "done",
      "participants": 13
    }
  ],
  "total_item": 1
}
