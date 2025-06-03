import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OwnTournamentDetail from "../page";
import { EVENT_PARTICIPANTS } from "@/store/event";
import { EventParticipant } from "@/types/event.type";

// IMPORTANT: The following mock data objects (EVENT_PARTICIPANTS) are assumed to be globally available
// or imported from a shared mock file (e.g., import { EVENT_PARTICIPANTS } from '../../../../../../store.mock';).
// Please ensure they are correctly defined and accessible in your test environment.

const MockTestELement = () => (
    <div>
        <OwnTournamentDetail />
    </div>
);

// formatCurrency might not be used in this file, but included for consistency if desired.

describe("Menguji render bagian peserta halaman", () => {
    it("Memeriksa bagian render partisipan turnamen muncul", async () => {
        // Assuming EVENT_PARTICIPANTS is a globally available mock object
        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );

            expect(eventStore.getTournamentDetail).toHaveBeenCalled();

            const tabPeserta = screen.getByTestId("tab-peserta");
            expect(tabPeserta).toBeInTheDocument();
            await userEvent.click(tabPeserta);

            expect(eventStore.getTournamentParticipants).toHaveBeenCalled();
            expect(screen.getByText("Daftar Peserta")).toBeInTheDocument();
        
        const clubParticipant = screen.getAllByTestId("club-participant");
        expect(clubParticipant.length).toEqual(EVENT_PARTICIPANTS.data.length);

        EVENT_PARTICIPANTS.data.forEach((data: EventParticipant) =>{ // Added :any for data
            const members = screen.getAllByTestId(`participant-${data.id}`);
            expect(members.length).toEqual(data.members.length);
        })
    });
});
