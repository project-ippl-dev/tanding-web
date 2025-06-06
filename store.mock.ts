import { createTournament } from "@/store/actions/event";
import { kabupaten, province } from "@/store/address";
import { CLASS_MULTIPLE, CLASS_RULES_MULTIPLE } from "@/store/class";
import { CLUB_MEMBER_DATA } from "@/store/club";
import { COMITTEE } from "@/store/comittee";
import { EVENT, EVENT_INFINITY, EVENT_OWN, EVENT_PARTICIPANTS } from "@/store/event";
import { PAYMENT_OWNER, PAYMENT_SUMMARY } from "@/store/payment";
import { userProfileData } from "@/store/profile";
import { SPORT_ALL } from "@/store/sport";
import { USER_SEARCH } from "@/store/user";

jest.mock("@/store/actions/profile",()=>{
        return {
            getProfileData: jest.fn().mockResolvedValue({
            ...userProfileData,
            status: 200, // Simulasi status sukses
            }),
            updateProfileData: jest.fn(),
        };
});

jest.mock("@/store/actions/event",()=>({
    ...jest.requireActual("@/store/actions/event"),
    getTournamentInfinity: jest.fn().mockResolvedValue({
      ...EVENT_INFINITY,
      status: 200,
    }),
    getTournamentDetail: jest.fn().mockResolvedValue({
      ...EVENT,
      status: 200,
    }),
    getTournamentParticipants: jest.fn().mockResolvedValue({
      ...EVENT_PARTICIPANTS,
      status: 200,
    }),
    getOwnTournament: jest.fn().mockResolvedValue({
      ...EVENT_OWN,
      status: 200,
    }),
    createTournament: jest.fn(),
    updateTournamentDetail: jest.fn().mockResolvedValue({
      status: 200,
      message: "Detail turnamen berhasil diperbarui",
    }),
}))

jest.mock("@/store/actions/sport", () => ({
  getSport: jest.fn().mockResolvedValue({
    status: 200,
    ...SPORT_ALL})
}));

jest.mock("@/store/actions/classTournament", () => ({
        ...jest.requireActual("@/store/actions/classTournament"),
        getClass: jest.fn().mockResolvedValue({
            ...CLASS_MULTIPLE,
            status: 200,
        }),
        getClassRules: jest.fn().mockResolvedValue({
            ...CLASS_RULES_MULTIPLE,
            status: 200,
        }),
        //updatePriceClassTournament: jest.fn(),
        storeClassTournament: jest.fn().mockResolvedValue({
            status:200,
            message: "Kelas berhasil ditambahkan",
        }),
        createClass: jest.fn().mockResolvedValue({
            status: 200,
            message: "Kelas berhasil dibuat",
        }),
        updatePriceClassTournament: jest.fn().mockResolvedValue({
            status: 200,
            message: "Harga kelas berhasil diperbarui",
        }),
        deleteClassTournament: jest.fn().mockResolvedValue({
            status: 200,
            message: "Kelas berhasil dihapus",
        }),
}))

jest.mock("@/store/actions/payment", () => ({
    ...jest.requireActual("@/store/actions/payment"),
    getPaymentForOwner: jest.fn().mockResolvedValue({
        ...PAYMENT_OWNER,
        status: 200,
    }),
    getPaymentTotalForOwner: jest.fn().mockResolvedValue({
        ...PAYMENT_SUMMARY,
        status: 200,
    }),
}));

jest.mock("@/store/actions/user", () => ({
    ...jest.requireActual("@/store/actions/user"),
    searchUser: jest.fn().mockResolvedValue({
        ...USER_SEARCH,
        status: 200,
    }),
}));

jest.mock("@/store/actions/club", () => ({
    ...jest.requireActual("@/store/actions/club"),
    getMembersOfClub: jest.fn().mockResolvedValue({
        status: 200,
        data: CLUB_MEMBER_DATA,
    }),
}));

jest.mock("@/store/actions/committee", () => ({
    ...jest.requireActual("@/store/actions/committee"),
    getCommittee: jest.fn().mockResolvedValue({
        ...COMITTEE,
        status: 200,
    }),
    createCommittee: jest.fn().mockResolvedValue({
        status: 200,
        message: "Komite berhasil dibuat",
    }),
}));

jest.mock("@/store/actions/address",() => ({
    ...jest.requireActual("@/store/actions/address"),
    getProvince: jest.fn().mockResolvedValue({
        status: 200,
        data: province,
    }),
    getCities: jest.fn().mockResolvedValue({
        status: 200,
        data: kabupaten,
    }),
}));
jest.mock("@/store/actions/bracket")
