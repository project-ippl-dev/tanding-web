import { ClubAllData, ClubJoinData, ClubMemberData, ClubOneData } from "@/types/club.type";

export const CLUB_ALL_DATA: ClubAllData = {
  "message": "fetch all club success",
  "data": [
      {
          "id": "f2baf840-c9fc-48c4-a186-a0b85c908c37",
          "name": "Black Jaguar Taekwondo Club Updated",
          "logo": "http://google.com",
          "owner": "Aditya Lityanian Al Nasir 93934",
          "sports": [
              {
                  "id": 1,
                  "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
                  "sport_name": "Taekwondo Reversed"
              },
              {
                  "id": 2,
                  "sport_id": "c61ccdfa-5196-41e4-b13c-29cf017fd3dc",
                  "sport_name": "Taekwondo Reversed"
              }
          ]
      }
  ],
  "current_page": 1,
  "has_previous_page": false,
  "has_next_page": false,
  "previous_page": 0,
  "next_page": 2,
  "last_page": 1,
  "total_item": 2
}

export const CLUB_ONE_DATA: ClubOneData = {
  "message": "fetch one club success",
  "data": {
      "id": "41510e3f-f3ed-4b86-811d-74755b794519",
      "name": "Black Jaguar Taekwondo Club",
      "logo": "http://google.com",
      "short_name": "BJTC",
      "owner": "dytlan",
      "sports": [
          {
              "id": 3,
              "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
              "sport_name": "Taekwondo Reversed"
          }
      ],
      "privilege": true,
      "joined": false
  }
}

export const CLUB_MEMBER_DATA: ClubMemberData = {
  "message": "fetch participant success",
  "data": {
      "total_point": 60,
      "participants": [
          {
              "id": 7,
              "user_id": "0a4a2681-b65f-4ab3-9b13-5a075531c0c3",
              "name": "Aditya Lityanian Al Nasir",
              "can_participate": true,
              "point": 3
          }
      ]
  },
  "current_page": 1,
  "has_previous_page": false,
  "has_next_page": false,
  "previous_page": 0,
  "next_page": 2,
  "last_page": 1,
  "total_item": 1
}

export const CLUB_JOIN_DATA: ClubJoinData = {
  "message": "fetch join approval success",
  "data": [
      {
          "id": 6,
          "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
          "sport_name": "Taekwondo Reversed",
          "name": "Admin"
      },
      {
          "id": 5,
          "sport_id": "07302ca3-0350-46ad-861e-f9bcb99668df",
          "sport_name": "Taekwondo Reversed",
          "name": "Admin"
      }
  ]
}

// TODO: DUMMY DATA
export const CLUB_DUMMY = [
  {
    id: 1,
    name: "Club 1",
    logo: "/images/logo.png",
    owner: "Owner 1",
    short_name: 'C1',
    joined: true,
    privilege: true,
    member: [
      {
        id: 1,
        name: 'Member 1',
        point: 100
      },
      {
        id: 2,
        name: 'Member 2',
        point: 85
      },
      {
        id: 3,
        name: 'Member 3',
        point: 0
      }
    ],
    join: [
      {
        id: 1,
        name: 'Calon Member 1',
      },
      {
        id: 2,
        name: 'Calon Member 2',
      },
      {
        id: 3,
        name: 'Calon Member 3',
      }
    ]
  },
  {
    id: 2,
    name: "Club 2",
    logo: "/images/logo.png",
    owner: "Owner 2",
    short_name: 'C2',
    joined: true,
    privilege: false,
  },
];

export const CLUB_INVITE_DUMMY = [
  {
    id: 1,
    name: "Club 1",
    sport_name: "Basketball",
  },
  {
    id: 2,
    name: "Club 2",
    sport_name: "Football",
  },
];