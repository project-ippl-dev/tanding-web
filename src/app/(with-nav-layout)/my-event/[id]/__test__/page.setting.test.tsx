import { EVENT } from "@/store/event";
import { COMITTEE } from "@/store/comittee";

import WrapperContext from "@/app/wrapper";
import * as eventStore from "@/store/actions/event";
import * as userStore from "@/store/actions/user";
import * as committeStore from "@/store/actions/committee";
import * as sportStore from "@/store/actions/sport";
import * as addressStore from "@/store/actions/address";
import * as classStore from "@/store/actions/classTournament";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OwnTournamentDetail from "../page";
import { CLASS_MULTIPLE, CLASS_RULES_MULTIPLE } from "@/store/class";
import { USER_SEARCH } from "@/store/user";


describe("Menguji proses pengeditan data class turnamen", () => {

    it("Menguji pembuatan kelas custom baru untuk turnamen",async ()=>{

        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );
        
        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        }); 
        
        // Mengakses tab setting
        const tabSetting = screen.getByTestId("tab-setting");
        expect(tabSetting).toBeInTheDocument();
        await userEvent.click(tabSetting)
        expect(screen.getByText("Setting Pertandingan")).toBeInTheDocument();
        expect(screen.getByText("Kelas Pertandingan")).toBeInTheDocument();

        // Membuka jendela tambah daftar kelas pertandingan
        EVENT.data.class_events.forEach((data) => {
            expect(screen.getByText(data.class_name)).toBeInTheDocument();
        })
        const addClassButton = screen.getByTestId("add-class-tournament");
        expect(addClassButton).toBeInTheDocument();
        await userEvent.click(addClassButton);

        // Membuka Jendela Daftar Kelas Pertandingan
        const addClassDialogButton = screen.getByText("DISINI");
        expect(addClassDialogButton).toBeInTheDocument();
        await userEvent.click(addClassDialogButton);

        // Memeriksa kesesuaian render dari jendela dialog
        expect(screen.getByText("Create Custom Class")).toBeInTheDocument();
        
        const formClassCustom = screen.getByTestId("dialog-custom-class");
        expect(formClassCustom).toBeInTheDocument();

        const allInput = formClassCustom.querySelectorAll("input");
        expect(allInput.length).toEqual(3); // Input nama dan harga

        const comboBox = formClassCustom.querySelectorAll("[role='combobox']");
        expect(comboBox.length).toEqual(2); // Input nama dan harga

        await userEvent.click(comboBox[0]);
        let listBox = screen.getByRole("listbox");
        expect(listBox.childNodes.length).toEqual(CLASS_RULES_MULTIPLE.data.length);

        await userEvent.click(comboBox[1]);
        listBox = screen.getByRole("listbox");
        expect(listBox.childNodes.length).toEqual(2);

        // Melakukan test submit form
        const payload = {
            name: "Kelas Baru",
            rules: CLASS_RULES_MULTIPLE.data[0].id,
            match_type: "single",
        }

        // menuliskan nama kelas
        await userEvent.type(allInput[0], payload.name);
        
        //memilih peraturan kelas
        await userEvent.click(comboBox[0]);
        listBox = screen.getByRole("listbox");
        await userEvent.click(listBox.childNodes[0]);
        
        // Pemilihan metode eliminasi
        await userEvent.click(comboBox[1]);
        listBox = screen.getByRole("listbox");
        await userEvent.click(listBox.childNodes[0]);

        const submitButton = screen.getByTestId("submit-custom-class");
        expect(submitButton).toBeInTheDocument();
        await userEvent.click(submitButton);
        // await waitFor(() => {
        //     expect(classStore.createClass).toHaveBeenCalledWith({
        //         sport_id: EVENT.data.sport_id,
        //         name: payload.name, // Assuming name is also required, common for class creation
        //         class_rule_id: payload.rules, // Assuming this is a required field
        //         class_type: "custom", // Example: 'custom'
        //         match_type: payload.match_type, // Example: 'single'
        //     })
        // })
    },10000)
    
    it("Menguji proses penambahan daftar kelas pertandingan",async ()=>{
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });
        

            const tabSetting = screen.getByTestId("tab-setting");
            expect(tabSetting).toBeInTheDocument();
            await userEvent.click(tabSetting)
            expect(screen.getByText("Setting Pertandingan")).toBeInTheDocument();
        

        // Memeriksa bagian setting kelas pertandingan telah dirender
            expect(screen.getByText("Kelas Pertandingan")).toBeInTheDocument();
            EVENT.data.class_events.forEach((data) => {
                expect(screen.getByText(data.class_name)).toBeInTheDocument();
            })
            const addClassButton = screen.getByTestId("add-class-tournament");
            expect(addClassButton).toBeInTheDocument();
            await userEvent.click(addClassButton);

        expect(screen.getByText("Tambah Kelas Tournament")).toBeInTheDocument();
        const classInput = screen.getByTestId("dialog-class-tournament");
        
            
            const comboBox = classInput.querySelectorAll('[role="combobox"]');
            expect(comboBox.length).toEqual(1);

            await userEvent.click(comboBox[0]);
        
        const payload = {
            class_id: CLASS_MULTIPLE.data[0].id,
            price: "10000",
        }

        const allInput = classInput.querySelectorAll("input");
        expect(allInput.length).toEqual(2);
        const listBox = screen.getByRole("listbox");
        expect(listBox).toBeInTheDocument();
        expect(listBox.childNodes.length).toEqual(CLASS_MULTIPLE.data.length);

        // Simulasi pengisian input
        await userEvent.click(listBox.childNodes[0]);
        await userEvent.type(allInput[1], payload.price);


        const submitButton = screen.getByText(/simpan/i);
        expect(submitButton).toBeInTheDocument();
        await userEvent.click(submitButton);
        expect(classStore.storeClassTournament).toHaveBeenCalledWith(
            EVENT.data.id,
            {data: [{
                class_id: payload.class_id,
                price: parseInt(payload.price)
            }]}
        );
    },10000)
    
    it("Menguji proses pengeditan data edit tournamen", async ()=>{
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );
        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });
        // Mengakses tab setting
        const tabSetting = screen.getByTestId("tab-setting");
        expect(tabSetting).toBeInTheDocument();
        await userEvent.click(tabSetting)

        // Mengakses tombol edit data turnamen
        const buttonEdit  = screen.getAllByTestId("edit-class-tournament");
        expect(buttonEdit.length).toEqual(EVENT.data.class_events.length);

        await userEvent.click(buttonEdit[0]);

        const dialogEditClass = screen.getByTestId("dialog-class-tournament");
        expect(dialogEditClass).toBeInTheDocument();

        const input = dialogEditClass.querySelectorAll("input");
        expect(input.length).toEqual(2); // Input nama dan harga
        await userEvent.clear(input[1]);
        await userEvent.type(input[1], "20000");

        
        const editButton = screen.getByTestId("dialog-class-tournament-submit");
        expect(editButton).toBeInTheDocument();
        await userEvent.click(editButton);
        expect(classStore.updatePriceClassTournament).toHaveBeenCalledWith(
            EVENT.data.id,
            EVENT.data.class_events[0].id,
            {price: 20000}
        )
    })

    it("Menguji prose penghapusan kelas turnamen", async ()=>{
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );
        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });
        // Mengakses tab setting
        const tabSetting = screen.getByTestId("tab-setting");
        expect(tabSetting).toBeInTheDocument();
        await userEvent.click(tabSetting)

        // Mengakses tombol hapus kelas turnamen
        
        const buttonEdit  = screen.getAllByTestId("edit-class-tournament");
        expect(buttonEdit.length).toEqual(EVENT.data.class_events.length);

        await userEvent.click(buttonEdit[0]);

        const dialogEditClass = screen.getByTestId("dialog-class-tournament");
        expect(dialogEditClass).toBeInTheDocument();

        const buttonDelete  = screen.getByTestId("delete-class-tournament");
        expect(buttonDelete).toBeInTheDocument();

        await userEvent.click(buttonDelete);

        expect(classStore.deleteClassTournament).toHaveBeenCalledWith(
            EVENT.data.id,
            EVENT.data.class_events[0].id
        )
    })
})


describe("Menguji proses pendaftaran panitia",()=>{
    it("Menguji proses pendaftaran panitia turnamen",async ()=>{
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );

        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

            const tabSetting = screen.getByTestId("tab-setting");
            expect(tabSetting).toBeInTheDocument();
            await userEvent.click(tabSetting)
            expect(screen.getByText("Setting Pertandingan")).toBeInTheDocument();

        await waitFor(async () => {
            await waitFor(() => expect(committeStore.getCommittee).toHaveBeenCalled());
            await waitFor(() => expect(userStore.searchUser).toHaveBeenCalled());
            expect(screen.getByText("Panitia Pertandingan")).toBeInTheDocument();
            const committeeRows = screen.getAllByTestId("committee-member-info");
            expect(committeeRows.length).toEqual(COMITTEE.data.length);
        });
    })

    it("Menguji penambahan panitia tunrnamen", async()=>{
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );
        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        });

            const tabSetting = screen.getByTestId("tab-setting");
            expect(tabSetting).toBeInTheDocument();
            await userEvent.click(tabSetting)
            expect(screen.getByText("Setting Pertandingan")).toBeInTheDocument();

        const addButton = screen.getByTestId("add-committee-button");
        expect(addButton).toBeInTheDocument();
        await userEvent.click(addButton);

        const formComittee = screen.getByTestId("form-assign-role");
        expect(formComittee).toBeInTheDocument();
        
        const comboBox = formComittee.querySelectorAll('[role="combobox"]');
        expect(comboBox.length).toEqual(2); // ComboBox untuk memilih panitia dan peran

        const input = formComittee.querySelectorAll("input");
        expect(input.length).toEqual(2); // Input nama panitia

        await userEvent.click(comboBox[0])
        let listBox = screen.getByRole("listbox");
        expect(listBox).toBeInTheDocument();
        expect(listBox.childNodes.length).toEqual(USER_SEARCH.data.length);
        await userEvent.click(listBox.childNodes[0])

        await userEvent.click(comboBox[1])
        listBox = screen.getByRole("listbox");
        expect(listBox.childNodes.length).toEqual(2);
        await userEvent.click(listBox.childNodes[0])

        const submitButton = screen.getByTestId("committee-assign-button");
        expect(submitButton).toBeInTheDocument();
        await userEvent.click(submitButton);

        expect(committeStore.createCommittee).toHaveBeenCalledWith(
            EVENT.data.id,
            {data:
                [{
                    user_id: USER_SEARCH.data[0].id,
                    role: "admin"
                }]
            }
        );

        expect(committeStore.getCommittee).toHaveBeenCalledWith(EVENT.data.id);
    })
})

describe("Menguji pengeditan data detail turnamen", ()=>{
    it("Menguji proses mengedit data turnamen",async ()=>{
        render(
            <WrapperContext>
                <OwnTournamentDetail />
            </WrapperContext>
        );
        await waitFor(() => {
            expect(eventStore.getTournamentDetail).toHaveBeenCalled();
        })

            const tabSetting = screen.getByTestId("tab-setting");
            expect(tabSetting).toBeInTheDocument();
            await userEvent.click(tabSetting)
            expect(screen.getByText("Setting Pertandingan")).toBeInTheDocument();

        // Memeriksa bagian setting kelas pertandingan telah dirender
            expect(screen.getByText("Data Pertandingan")).toBeInTheDocument();
            await waitFor(() => expect(addressStore.getProvince).toHaveBeenCalled());
            await waitFor(() => expect(sportStore.getSport).toHaveBeenCalled());

            const formEditTournament = screen.getByTestId("form-edit-tournament");
            expect(formEditTournament).toBeInTheDocument();

            const allInput = formEditTournament.querySelectorAll("input,select,textarea");
            expect(allInput.length).toEqual(14); // Input nama, tanggal, waktu, lokasi, deskripsi, dan sport

            const tournamentInput = screen.getByTestId("tournament-name");
            expect(tournamentInput).toBeInTheDocument();
            // expect(tournamentInput).toBeDisabled();
            const editButton = screen.getByTestId("edit-tournament-data");
            expect(editButton).toBeInTheDocument();
            await userEvent.click(editButton);
            
            // Memulai proses pengeditan data turnamen
            expect(tournamentInput).toBeEnabled();

            const submitButton = screen.getByTestId("submit-edit-tournament");
            expect(submitButton).toBeInTheDocument();
            await userEvent.click(submitButton);
            expect(eventStore.updateTournamentDetail).toHaveBeenCalled()
    })
})

describe("Menguji render bagian Setting halaman", () => {
    it("Memeriksa render bagian setting",async ()=>{
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

        // Memeriksa bagian setting kelas pertandingan telah dirender
        await waitFor(async () => {
            expect(screen.getByText("Kelas Pertandingan")).toBeInTheDocument();
            EVENT.data.class_events.forEach((data) => {
                expect(screen.getByText(data.class_name)).toBeInTheDocument();
            })
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
            expect(tournamentInput).toBeInTheDocument();
            // expect(tournamentInput).toBeDisabled();
            const editButton = screen.getByTestId("edit-tournament-data");
            expect(editButton).toBeInTheDocument();
            await userEvent.click(editButton);
            expect(tournamentInput).toBeEnabled();
        });

    })
})
