jest.mock('@mui/material/useMediaQuery',() => () => true);

import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";
import * as bracketStore from "@/store/actions/bracket";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OwnTournamentDetail from "../page";
import { BracketOrder, BracketSingle } from "@/store/bracket"; // These are used as mock data objects
import { EVENT } from "@/store/event";

// IMPORTANT: The following mock data objects (EVENT, BracketSingle, BracketOrder) 
// are assumed to be globally available or imported from a shared mock file 
// (e.g., import { EVENT, BracketSingleMock, BracketOrderMock } from '../../../../../../store.mock'; 
// and then use BracketSingleMock as BracketSingle, etc.).
// Please ensure they are correctly defined and accessible in your test environment.
// The import above `import { BracketOrder, BracketSingle } from "@/store/bracket";` might be for types,
// ensure the data objects with these names are in scope.

const MockTestELement = () => (
    <div>
        <OwnTournamentDetail />
    </div>
);

describe('Menguji render bagian bracket halaman', () => {
    it("Memeriksa bagian bracket di render dengan benar, (Single Elimination)", async () => {
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValueOnce({
            ...BracketSingle, // Assumes BracketSingle is a mock data object
            status: 200,
        });

        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

            const tabBracket = screen.getByTestId("tab-braket");
            expect(tabBracket).toBeInTheDocument();
            await userEvent.click(tabBracket);

            const selectClassEvent = document.getElementById("uncontrolled-native") as HTMLSelectElement | null;
            expect(screen.getByText("Bagan Turnamen")).toBeInTheDocument();
            expect(selectClassEvent).toBeInTheDocument();
            // Assuming EVENT is available and selectClassEvent is not null
            await userEvent.selectOptions(selectClassEvent!, EVENT.data.class_events[0].class_name);

            expect(bracketStore.getBracketDetails).toHaveBeenCalled();
            expect(screen.getByText("Final Result")).toBeInTheDocument();
            expect(screen.getByText("Quarterfinals")).toBeInTheDocument();
            expect(screen.getByText("Semifinals")).toBeInTheDocument();
            expect(screen.getByText("Final")).toBeInTheDocument();
    });

    it("Memeriksa bagian bracket di render dengan benar, (Order Bracket)", async () => {
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValueOnce({
            ...BracketOrder, // Assumes BracketOrder is a mock data object
            status: 200,
        });

        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

            const tabBracket = screen.getByTestId("tab-braket");
            await userEvent.click(tabBracket);
        
            const selectClassEvent = document.getElementById("uncontrolled-native") as HTMLSelectElement | null;
            // Assuming EVENT is available and selectClassEvent is not null
            await userEvent.selectOptions(selectClassEvent!, EVENT.data.class_events[0].class_name);

            expect(bracketStore.getBracketDetails).toHaveBeenCalled();
            expect(screen.getByText("Final Result")).toBeInTheDocument();
            expect(screen.getByTestId("order-elimination-table")).toBeInTheDocument();
            // Assuming BracketOrder (data object) is available
            const matchDetailButton = screen.getAllByTestId("order-match-detail");
            expect(matchDetailButton.length).toEqual(BracketOrder.data.length);
    });

    it("Memeriksa proses generate bracket", async () => {
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValueOnce({
            ...BracketSingle, // Assumes BracketSingle is a mock data object
            generate_status: false,
            "lock_status": false,
            status: 200,
        });
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValueOnce({
            ...EVENT, // Assumes EVENT is a mock data object
            data: {
                ...EVENT.data,
                remark: "closed",
            },
            status: 200,
        });

        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );
        

            const tabBracket = screen.getByTestId("tab-braket");
            await userEvent.click(tabBracket);

            const selectClassEvent = document.getElementById("uncontrolled-native") as HTMLSelectElement | null;
            await userEvent.selectOptions(selectClassEvent!, EVENT.data.class_events[0].class_name);

        await waitFor(() => {
            expect(bracketStore.getBracketDetails).toHaveBeenCalled();
        });

        const generateButton = screen.getByTestId("generate-bracket-button");
        expect(generateButton).toBeInTheDocument();
        await userEvent.click(generateButton);
            expect(bracketStore.generateBracket).toHaveBeenCalledWith({eventID: EVENT.data.id,classID: EVENT.data.class_events[0].id});
    });

    it.each([
        [BracketSingle, bracketStore.getBracketRandom], // BracketSingle is mock data
        [BracketOrder, bracketStore.getBracketRandom]  // BracketOrder is mock data
    ])("Memeriksa proses melakukan acak bracket", async (BracketData, getBracketRandomAll) => {
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValueOnce({
            ...BracketData, 
            "lock_status": false,
            status: 200,
        });
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValueOnce({
            ...EVENT,
            data: {
                ...EVENT.data,
                remark: "closed",
            },
            status: 200,
        });

        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );
        

            const tabBracket = screen.getByTestId("tab-braket");
            await userEvent.click(tabBracket);

            const selectClassEvent = document.getElementById("uncontrolled-native") as HTMLSelectElement | null;
            await userEvent.selectOptions(selectClassEvent!, EVENT.data.class_events[0].class_name);

        
        const randomBracketButton = screen.getByTestId("random-bracket-button");
        expect(randomBracketButton).toBeInTheDocument();
        await userEvent.click(randomBracketButton);
            expect(getBracketRandomAll).toHaveBeenCalledWith({
                eventID: EVENT.data.id,
                classID: EVENT.data.class_events[0].id,
            });
    });
    
    it.each([
        [BracketSingle, bracketStore.lockBracketSingle], // BracketSingle is mock data
        [BracketOrder, bracketStore.lockBracketOrder]    // BracketOrder is mock data
    ])("Memeriksa proses melakukan lock bracket", async (BracketData, expectFunctionCall) => {
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValueOnce({
            ...BracketData, 
            "lock_status": false,
            random: true, 
            status: 200,
        });
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValueOnce({
            ...EVENT,
            data: {
                ...EVENT.data,
                remark: "closed",
            },
            status: 200,
        });

        render(
            <WrapperContext> 
                <MockTestELement />
            </WrapperContext>
        );
        

            const tabBracket = screen.getByTestId("tab-braket");
            await userEvent.click(tabBracket);

            const selectClassEvent = document.getElementById("uncontrolled-native") as HTMLSelectElement | null;
            await userEvent.selectOptions(selectClassEvent!, EVENT.data.class_events[0].class_name);

        await waitFor(() => { expect(bracketStore.getBracketDetails).toHaveBeenCalled(); });

        const lockBracketButton = screen.getByTestId("lock-bracket-button");
        expect(lockBracketButton).toBeInTheDocument();
        await userEvent.click(lockBracketButton);
            expect(expectFunctionCall).toHaveBeenCalled();
    });

    it("Memeriksa proses melakukan Event turn lock", async () => {
        (bracketStore.getBracketDetails as jest.Mock).mockResolvedValueOnce({
            ...BracketSingle, 
            "lock_status": true, // Should be true if event can be locked
            status: 200,
        });
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValueOnce({
            ...EVENT,
            data: {
                ...EVENT.data,
                remark: "closed",
                event_turn_lock: false, 
            },
            status: 200,
        });

        render(
            <WrapperContext> 
                <MockTestELement />
            </WrapperContext>
        );
        

            const tabBracket = screen.getByTestId("tab-braket");
            await userEvent.click(tabBracket);

            const selectClassEvent = document.getElementById("uncontrolled-native") as HTMLSelectElement | null;
            await userEvent.selectOptions(selectClassEvent!, EVENT.data.class_events[0].class_name);

        await waitFor(() => { expect(bracketStore.getBracketDetails).toHaveBeenCalled(); });

        const lockTurnButton = screen.getByTestId("lock-turn-bracket-button");
        expect(lockTurnButton).toBeInTheDocument();
        await userEvent.click(lockTurnButton);
            expect(bracketStore.lockTurnBracketSingle).toHaveBeenCalledWith({ 
                eventID: EVENT.data.id,
                // class_id might not be needed for event turn lock, verify API
            });
    });
});
