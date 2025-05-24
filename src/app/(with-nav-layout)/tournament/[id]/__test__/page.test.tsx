import { EVENT, EVENT_INFINITY, EVENT_PARTICIPANTS } from "@/store/event";
import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";
import TournamentDetailPage from "../page";
import { render, screen, waitFor } from "@testing-library/react";
import * as navigation from "next/navigation";

jest.mock("next/navigation");

jest.mock("@/store/actions/event");

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
})