import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OwnTournamentDetail from "../page";
import { EVENT } from "@/store/event";
import { AUTH_DATA } from "@/store/auth";

const MockTestELement = () => (
    <div>
        <OwnTournamentDetail />
    </div>
);

interface clubData {
    name: string;
    id: string;
}


describe("Menguji render bagian register halaman", () => {
    it("Memeriksa bagian render Register turnamen", async () => {
        // Assuming EVENT is a globally available mock object
        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        await waitFor(async () => {
            expect(screen.getAllByText(EVENT.data.name)[0]).toBeInTheDocument();
            const tabRegister = screen.getByTestId("register-button");
            expect(tabRegister).toBeInTheDocument();
        });
    });

    it.each([
        ["open", "Daftar Kompetisi"],
        ["soon", "Segera Hadir"],
        ["done", "Kompetisi Selesai"],
        ["closed", "Pendaftaran Ditutup"],
        ["ongoing", "Kompetisi Sedang Berlangsung"],
    ])("Memeriksa render setiap tombol resgitrasi turname", async(tournamentState: string, expected)=>{
        // Assuming EVENT is a globally available mock object
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValueOnce({
            ...EVENT,
            data: {
                ...EVENT.data,
                remark: tournamentState,
            },
            status: 200,
        });

        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        )

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        await waitFor(async () => {
            expect(screen.getByText(expected)).toBeInTheDocument();
        });
    });

    it("Memeriksa seluruh opsi submit register form telah sesuai", async () => {
        // Assuming EVENT and AUTH_DATA are globally available mock objects
        (eventStore.getTournamentDetail as jest.Mock).mockResolvedValueOnce({
            ...EVENT,
            data:{
                ...EVENT.data,
                remark: "open",
            },
            status: 200,
        })

        render(
            <WrapperContext>
                <MockTestELement />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

        await waitFor(async () => {
            const tabRegister = screen.getByTestId("register-button");
            expect(tabRegister).toBeInTheDocument();
            await userEvent.click(tabRegister);
        });

        await waitFor(async () => {
            const registerForm = screen.getByTestId("register-dialog");
            const comboBox = registerForm.querySelectorAll('[role="combobox"]');

            expect(comboBox.length).toEqual(3);

            await userEvent.click(comboBox[0]);
            EVENT.data.class_events.forEach((data: {class_name: string, match_type: string}) => { // Added :any for data if type is not inferred
                const targetText = `${data.class_name} - ${data.match_type} elimination`
                expect(screen.getByText(targetText)).toBeInTheDocument();
            })

            await userEvent.click(comboBox[1]);
            AUTH_DATA.data.clubs.forEach((data: clubData) => { // Added :any for data
                expect(screen.getAllByText(data.name).length).toBeGreaterThan(0);
            })

            const submitButton = screen.getByTestId("register-submit");
            expect(submitButton).toBeInTheDocument(); 
        });
    });
});
