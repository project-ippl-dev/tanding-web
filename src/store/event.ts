import { EventCreatePayload } from '../types/event.type';

export const EVENT = {
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
    "thumbnail": "https://i.pinimg.com/736x/93/29/64/932964069d35f62351f72d04ef0468ad.jpg",
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
    "remark": "done",
    //"remark": "closed",
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

export const EVENT_INFINITY = {
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
      "thumbnail": "https://i.pinimg.com/736x/93/29/64/932964069d35f62351f72d04ef0468ad.jpg",
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

export const EVENT_PARTICIPANTS = {
  "message": "fetch event participants success",
  "data": [
    {
      "id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "name": "Black Jaguar Taekwondo Club",
      "total_point": 60,
      "total_user": 13,
      "members": [
        {
          "id": 23,
          "event_registration_id": "b7b8e133-21e0-4144-b4f8-6d38641fbbc1",
          "user_id": "5ca5b735-8b01-4a83-914f-9dfb6b7fbf44",
          "name": "Aditya Lityanian A.N",
          "class_name": "Olahraga Single"
        },
        {
          "id": 1,
          "event_registration_id": "8e49aa94-aa11-4d78-b92d-12e66cae3718",
          "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
          "name": "Aditya Lityanian Al Nasir",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 20,
          "event_registration_id": "5ab09c59-2ac3-490b-8330-4bcb08d26300",
          "user_id": "ee64c647-385c-4de9-9aba-3df270ea1b67",
          "name": "Aditya Mardiansyah",
          "class_name": "Olahraga Single"
        },
        {
          "id": 21,
          "event_registration_id": "1a498174-f964-4ccd-9097-2c93cdf3945f",
          "user_id": "1d414883-e092-45a1-a235-e7a80dfd7f49",
          "name": "Aditya Mardiansyah 95764",
          "class_name": "Olahraga Single"
        },
        {
          "id": 26,
          "event_registration_id": "7a20944b-ebad-4f82-aac5-3b5381c04bd2",
          "user_id": "5862e502-ab61-40c1-bd81-0ce9834ec357",
          "name": "Agung Rizky",
          "class_name": "Olahraga Single Elimination"
        },
        {
          "id": 14,
          "event_registration_id": "c408f540-3c2d-4ec5-ae63-a64889b613a8",
          "user_id": "76d28464-bc72-4dc8-83c4-2dddf736eef3",
          "name": "Angga",
          "class_name": "Olahraga Single"
        },
        {
          "id": 25,
          "event_registration_id": "884e9e9d-66fc-4879-a29f-8581a1e24dbb",
          "user_id": "76d28464-bc72-4dc8-83c4-2dddf736eef3",
          "name": "Angga",
          "class_name": "Olahraga Single Elimination"
        },
        {
          "id": 12,
          "event_registration_id": "ed938a5d-a490-450a-aa0d-5365e57ac6bc",
          "user_id": "76d28464-bc72-4dc8-83c4-2dddf736eef3",
          "name": "Angga",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 15,
          "event_registration_id": "2fb015eb-0433-4217-acb7-854abb5a745c",
          "user_id": "26c2608a-b5ff-4e1c-9420-379fca450ee2",
          "name": "Angga Widianto",
          "class_name": "Olahraga Single"
        },
        {
          "id": 7,
          "event_registration_id": "899ea2ef-3858-4961-ad14-4c5cd6532d25",
          "user_id": "26c2608a-b5ff-4e1c-9420-379fca450ee2",
          "name": "Angga Widianto",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 11,
          "event_registration_id": "ed938a5d-a490-450a-aa0d-5365e57ac6bc",
          "user_id": "40261c1f-7223-438c-b981-c690d6b30002",
          "name": "Ditz Dhiza",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 24,
          "event_registration_id": "97a8513e-67d0-4bef-b77f-4576548cf58a",
          "user_id": "40261c1f-7223-438c-b981-c690d6b30002",
          "name": "Ditz Dhiza",
          "class_name": "Olahraga Single Elimination"
        },
        {
          "id": 2,
          "event_registration_id": "8e49aa94-aa11-4d78-b92d-12e66cae3718",
          "user_id": "e77bf932-a078-4bba-bf91-5fb777402eb1",
          "name": "Jaja Miharja",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 9,
          "event_registration_id": "f1091975-77e2-4da1-b4c0-284e1cf64a44",
          "user_id": "48ec0e0b-6761-4b2e-a4e5-3d11d14279ba",
          "name": "Muhammad Ikbal",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 10,
          "event_registration_id": "f1091975-77e2-4da1-b4c0-284e1cf64a44",
          "user_id": "243dd872-ceda-4684-83ba-d2fe9a692205",
          "name": "Muhammad Ikbal",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 8,
          "event_registration_id": "899ea2ef-3858-4961-ad14-4c5cd6532d25",
          "user_id": "162d4e59-a44e-4820-85b7-0c221ad3074a",
          "name": "dytlan",
          "class_name": "Olahraga Pair"
        },
        {
          "id": 19,
          "event_registration_id": "79cc0a52-4977-47a5-9d82-f85912f1b2be",
          "user_id": "162d4e59-a44e-4820-85b7-0c221ad3074a",
          "name": "dytlan",
          "class_name": "Olahraga Single"
        }
      ]
    }
  ]
}

export const EVENT_OWN = {
  "message": "fetch all by auth user",
  "data": [
    {
      "id": "cb9ffe61-8fa3-4160-906e-f459c064c8c3",
      "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "user_name": "Aditya Lityanian Al Nasir 93934",
      "type": "competition",
      "name": "Taekwondo Tournament",
      "description": "Pertandingan Taekwondo",
      "prize_pool": "500000000",
      "location": "Jl. Tangerang",
      "province": "Banten",
      "city": "Kota Tangerang",
      "thumbnail": "http://google.com",
      "start_date": "Wednesday, 21 July 2021",
      "end_date": "Wednesday, 21 July 2021",
      "deadline": "02 September 2021, 19:00",
      "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
      "sport_name": "Taekwondo Reversed",
      "rules": "peraturan apa aja",
      "proposal_link": "http://google.com",
      "status": false,
      "quota": 150,
      "open": "Thursday, 02 September 2021, 15:00",
      "remark": "unconfirmed"
    },
    {
      "id": "75cc7e4d-3a21-4fe6-8edb-ca37306b2952",
      "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "user_name": "Aditya Lityanian Al Nasir 93934",
      "type": "competition",
      "name": "Taekwondo Tournament",
      "description": "Pertandingan Taekwondo",
      "prize_pool": "500000000",
      "location": "Jl. Tangerang",
      "province": "",
      "city": "",
      "thumbnail": "http://google.com",
      "start_date": "Wednesday, 21 July 2021",
      "end_date": "Wednesday, 21 July 2021",
      "deadline": "02 September 2021, 19:00",
      "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
      "sport_name": "Taekwondo Reversed",
      "rules": "peraturan apa aja",
      "proposal_link": "http://google.com",
      "status": false,
      "quota": 150,
      "open": "Thursday, 02 September 2021, 15:00",
      "remark": "unconfirmed"
    },
    {
      "id": "59074d3e-07e6-4f5d-bf3c-62ef58dcddab",
      "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "user_name": "Aditya Lityanian Al Nasir 93934",
      "type": "competition",
      "name": "Taekwondo Tournament",
      "description": "Pertandingan Taekwondo",
      "prize_pool": "500000000",
      "location": "Jl. Tangerang",
      "province": "Banten updated",
      "city": "Tangerang Updated",
      "thumbnail": "http://google.com",
      "start_date": "Wednesday, 21 July 2021",
      "end_date": "Wednesday, 21 July 2021",
      "deadline": "20 September 2021, 10:00",
      "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
      "sport_name": "Taekwondo Reversed",
      "rules": "peraturan apa aja",
      "proposal_link": "http://google.com",
      "status": true,
      "quota": 150,
      "open": "Thursday, 02 September 2021, 15:00",
      "remark": "done"
    },
    {
      "id": "bc50d5d6-6cef-4789-8d05-87db60a876e1",
      "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
      "user_name": "Aditya Lityanian Al Nasir 93934",
      "type": "competition",
      "name": "Taekwondo Tournament",
      "description": "Pertandingan Taekwondo",
      "prize_pool": "500000000",
      "location": "Tangerang",
      "province": "",
      "city": "",
      "thumbnail": "http://google.com",
      "start_date": "Wednesday, 21 July 2021",
      "end_date": "Wednesday, 21 July 2021",
      "deadline": "02 September 2021, 19:00",
      "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
      "sport_name": "Taekwondo Reversed",
      "rules": "peraturan apa aja",
      "proposal_link": "http://google.com",
      "status": true,
      "quota": 150,
      "open": "Thursday, 02 September 2021, 22:00",
      "remark": "soon"
    }
  ],
  "current_page": 1,
  "has_previous_page": false,
  "has_next_page": false,
  "previous_page": 0,
  "next_page": 2,
  "last_page": 1,
  "total_item": 4
}

export const EVENT_CREATE_PAYLOAD: EventCreatePayload = {
  name: "Taekwondo Tournament",
  type: "competition",
  description: "Pertandingan Taekwondo",
  prize_pool: "500000000",
  location: "Jl. Tangerang",
  province: "Banten",
  city: "Kota Tangerang",
  thumbnail: "http://google.com",
  start_date: "2021-07-21",
  end_date: "2021-07-21",
  deadline: "2021-09-02T19:00:10",
  sport_id: "07302ca3-0350-46ad-861e-f9bcb99668df",
  rules: "peraturan apa aja",
  proposal_link: "http://google.com",
  quota: 150,
  open: "2021-09-02T15:00:10"
};

