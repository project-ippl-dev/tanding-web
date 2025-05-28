import { EVENT, EVENT_PARTICIPANTS } from "@/store/event";
import { kabupaten, province } from "@/store/address";
import { PAYMENT_OWNER, PAYMENT_SUMMARY } from "@/store/payment";
import { USER_SEARCH } from "@/store/user";
import { COMITTEE } from "@/store/comittee";
import { SPORT_ALL } from "@/store/sport";
import { CLASS_MULTIPLE, CLASS_RULES_MULTIPLE } from "@/store/class";
import { AUTH_DATA } from "@/store/auth";
import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";
import * as bracketStore from "@/store/actions/bracket";
import * as paymentStore from "@/store/actions/payment";
import * as userStore from "@/store/actions/user";
import * as committeStore from "@/store/actions/committee";
import * as sportStore from "@/store/actions/sport";
import * as addressStore from "@/store/actions/address";

import { render, screen, waitFor } from "@testing-library/react";
import * as navigation from "next/navigation";
import { BracketOrder, BracketSingle } from "@/store/bracket";
import userEvent from "@testing-library/user-event";
import OwnTournamentDetail from "../page";

jest.mock("next/navigation");
jest.mock("@/store/actions/event");
jest.mock("@/store/actions/bracket");
jest.mock("@/store/actions/classTournament",()=>{
    return {
        ...jest.requireActual("@/store/actions/classTournament"),
        getClass: jest.fn().mockResolvedValue({
            ...CLASS_MULTIPLE,
            status: 200,
        }),
        getClassRules: jest.fn().mockResolvedValue({
            ...CLASS_RULES_MULTIPLE,
            status: 200,
        }),
    };
});
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
jest.mock("@/store/actions/committee", () => ({
    ...jest.requireActual("@/store/actions/committee"),
    getCommittee: jest.fn().mockResolvedValue({
        ...COMITTEE,
        status: 200,
    }),
}));
jest.mock("@/store/actions/sport",()=>({
    ...jest.requireActual("@/store/actions/sport"),
    getSport: jest.fn().mockResolvedValue({
        ...SPORT_ALL,
        status: 200,
    })
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
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: AUTH_DATA }),
  };
});

describe('Menguji Detail Own Tournament Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValue({
            ...EVENT,
            status: 200,
        });

        (eventStore.getTournamentParticipants as jest.Mock).mockResolvedValue({
            data: EVENT_PARTICIPANTS.data,
        });

        
        (navigation.useParams as jest.Mock).mockReturnValue({
            id: EVENT.data.id,
        });

    });

    it("Memeriksa bagian render detail turnamen", async () => {
        jest.mock('@mui/material/useMediaQuery',() => (true));

        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });
        
        await waitFor(async () => {

            // Minimal menunjukkan nama kompetensi
            expect(screen.getAllByText(EVENT.data.name)[0]).toBeInTheDocument();


            const tabRegister = screen.getByTestId("register-button");
            expect(tabRegister).toBeInTheDocument();
        });

    });

    it("Memeriksa bagian render partisipan turnamen muncul", async () => {
        jest.mock('@mui/material/useMediaQuery',() => (true));
        
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        await waitFor(async () => {
            const tabPeserta = screen.getByTestId("tab-peserta");
            expect(tabPeserta).toBeInTheDocument();
            tabPeserta.click();

            expect(eventStore.getTournamentParticipants).toHaveBeenCalled();
            expect(screen.getByText("Daftar Peserta")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(EVENT_PARTICIPANTS.data[0].name)).toBeInTheDocument();
        });
    });

    
    it("Memeriksa bagian bracket di render dengan benar, (Single Elimination)", async () => {

        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValue({
            ...BracketSingle,
            status: 200,
        })

        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {

            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        // ----------------- Memeriksa Bagian single elimination -----------------

        await waitFor(async () => {
            // Navigasi ke tab braket
            const tabBracket = screen.getByTestId("tab-braket");
            expect(tabBracket).toBeInTheDocument();
            tabBracket.click();
        });

        await waitFor(async () => {
            const selectClassEvent = document.getElementById("uncontrolled-native");

            expect(screen.getByText("Bagan Turnamen")).toBeInTheDocument();
            expect(selectClassEvent).toBeInTheDocument();

            await userEvent.selectOptions(selectClassEvent, EVENT.data.class_events[0].class_name);

        });

        await waitFor(() => {
            expect(bracketStore.getBracketDetails).toHaveBeenCalled();

            // Memeriksa informasi juara kompetensi telah dirender
            expect(screen.getByText("Final Result")).toBeInTheDocument();

            // Memeriksa bahwa braket telah dirender
            expect(screen.getByText("Quarterfinals")).toBeInTheDocument();
        });
        // --------------------------------------------------
    })


    it("Memeriksa bagian bracket di render dengan benar, (Order Bracket)", async () => {
        jest.mock('@mui/material/useMediaQuery',() => (true));
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValue({
            ...BracketOrder,
            status: 200,
        })

        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        })

        await waitFor(async () => {
            // Navigasi ke tab braket
            const tabBracket = screen.getByTestId("tab-braket");
            expect(tabBracket).toBeInTheDocument();
            tabBracket.click();
        });
        
        await waitFor(async () => {
            const selectClassEvent = document.getElementById("uncontrolled-native");
            expect(selectClassEvent).toBeInTheDocument();

            await userEvent.selectOptions(selectClassEvent, EVENT.data.class_events[0].class_name);
        });

        await waitFor(() => {
            expect(bracketStore.getBracketDetails).toHaveBeenCalled();

            // Memeriksa informasi juara kompetensi telah dirender
            expect(screen.getByText("Final Result")).toBeInTheDocument();

            // Memeriksa bahwa braket telah dirender
            expect(screen.getByTestId("order-elimination-table")).toBeInTheDocument();

            const matchDetailButton = screen.getAllByTestId("order-match-detail");
            expect(matchDetailButton.length).toEqual(BracketOrder.data.length);
        });

    })

    it("Memeriksa render bagian setting",async ()=>{

        jest.mock('@mui/material/useMediaQuery',() => (true));

        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        await waitFor(async () => {
            const tabSetting = screen.getByTestId("tab-setting");
            expect(tabSetting).toBeInTheDocument();
            await userEvent.click(tabSetting)
            expect(screen.getByText("Setting Pertandingan")).toBeInTheDocument();
        })

        await waitFor(async () => {
            await waitFor(() => expect(committeStore.getCommittee).toHaveBeenCalled());
            await waitFor(() => expect(userStore.searchUser).toHaveBeenCalled());
            expect(screen.getByText("Panitia Pertandingan")).toBeInTheDocument();
            const committeeRows = screen.getAllByTestId("committee-member-info");
            expect(committeeRows.length).toEqual(COMITTEE.data.length);
        });


        await waitFor(async () => {
            expect(screen.getByText("Data Pertandingan")).toBeInTheDocument();
            await waitFor(() => expect(addressStore.getProvince).toHaveBeenCalled());
            await waitFor(() => expect(sportStore.getSport).toHaveBeenCalled());

            const tournamentInput = screen.getByTestId("tournament-name");
            console.log(tournamentInput);
            expect(tournamentInput).toBeInTheDocument();
            // expect(tournamentInput).toBeDisabled();
            const editButton = screen.getByTestId("edit-tournament-data");
            expect(editButton).toBeInTheDocument();
            await userEvent.click(editButton);
            expect(tournamentInput).toBeEnabled();
        });

    })

    it("Memeriksa render bagain keuangan turnamen", async () => {
        jest.mock('@mui/material/useMediaQuery',() => (true));


        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        await waitFor(async () => {
            const tabKeuangan = screen.getByTestId("tab-keuangan");
            expect(tabKeuangan).toBeInTheDocument();
            tabKeuangan.click();

            expect(screen.getByText("Laporan Keuangan")).toBeInTheDocument();

            expect(paymentStore.getPaymentTotalForOwner).toHaveBeenCalled();
            expect(paymentStore.getPaymentForOwner).toHaveBeenCalled();

            expect(screen.getByTestId("payment-table")).toBeInTheDocument();

            await waitFor(() => {
                const paymentRows = screen.getAllByTestId("payment-row-data");
                expect(paymentRows.length).toEqual(PAYMENT_OWNER.data.length);
            })
        });
    })

})