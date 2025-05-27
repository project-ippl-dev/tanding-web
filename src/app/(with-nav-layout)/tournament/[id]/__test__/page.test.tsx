import { EVENT, EVENT_INFINITY, EVENT_PARTICIPANTS } from "@/store/event";
import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";
import * as bracketStore from "@/store/actions/bracket";
import TournamentDetailPage from "../page";
import { render, screen, waitFor } from "@testing-library/react";
import * as navigation from "next/navigation";
import { BracketOrder, BracketSingle } from "@/store/bracket";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation");
jest.mock("@/store/actions/event");
jest.mock("@/store/actions/bracket");

describe('Tournament Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (eventStore.getTournamentInfinity as jest.Mock).mockResolvedValue({
            ...EVENT_INFINITY,
            status: 200,
        });

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

    it("Melakukan render daftar kartu turnamen", async()=>{
        render(
            <WrapperContext>
                <TournamentDetailPage />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
        })

        await waitFor(() => {
            const cardItem = screen.getAllByTestId("card-tournament-item");
            expect(cardItem.length).toEqual(EVENT_INFINITY.data.length);
        })
    })

    it("Memeriksa apakah bagian render partisipan turnamen muncul", async () => {
        render(
            <WrapperContext>
                <TournamentDetailPage />
            </WrapperContext>
        );
        
        await waitFor(() => {
            expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
        })

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
                <TournamentDetailPage />
            </WrapperContext>
        );

        // ----------------- Memeriksa Bagian single elimination -----------------
        await waitFor(() => {
            expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
        })

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

        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValue({
            ...BracketOrder,
            status: 200,
        })

        render(
            <WrapperContext>
                <TournamentDetailPage />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
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

    it("Memeriksa apakah halaman register telah dirender", async () => {

        const mockData = {
            ...EVENT,
            status: 200,
        };
        mockData.data.remark = "open";
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValue(mockData);

        render(
            <WrapperContext>
                <TournamentDetailPage />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        })

        await waitFor(async () => {

            // Minimal menunjukkan nama kompetensi
            expect(screen.getAllByText(EVENT.data.name)[0]).toBeInTheDocument();


            const tabRegister = screen.getByTestId("register-button");
            expect(tabRegister).toBeInTheDocument();
        });
    })

    it("Memeriksa apakah halaman register telah dirender", async () => {

        const mockData = {
            ...EVENT,
            status: 200,
        };
        mockData.data.remark = "open";
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValue(mockData);

        render(
            <WrapperContext>
                <TournamentDetailPage />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        })

        await waitFor(async () => {

            // Minimal menunjukkan nama kompetensi
            expect(screen.getAllByText(EVENT.data.name)[0]).toBeInTheDocument();


            const tabRegister = screen.getByTestId("register-button");
            expect(tabRegister).toBeInTheDocument();
        });
    })
})