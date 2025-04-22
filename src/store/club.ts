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