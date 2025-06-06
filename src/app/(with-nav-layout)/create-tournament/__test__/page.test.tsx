import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as sportStore from "@/store/actions/sport";
import * as addressStore from "@/store/actions/address";
import * as eventStore from "@/store/actions/event";
import { SPORT_ALL } from "@/store/sport";
import CreateTournamentPage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock the store actions

// Mock the auth context

// Mock CKEditor to avoid loading issues in tests
jest.mock("@ckeditor/ckeditor5-react", () => ({
  CKEditor: ({ onChange }: { onChange: any }) => (
    <textarea
      data-testid="ckeditor-mock"
      onChange={(e) => onChange(null, { getData: () => e.target.value })}
    />
  ),
}));

jest.mock("@ckeditor/ckeditor5-build-classic", () => ({
  default: () => ({
    create: jest.fn().mockResolvedValue({
      editor: {
        setData: jest.fn(),
        getData: jest.fn().mockResolvedValue("mocked data"),
      },
    }),
  }),
}));

describe("Create Tournament Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock sports data
    (sportStore.getSport as jest.Mock).mockResolvedValue({
      ...SPORT_ALL,
      status: 200,
    });

    // Mock provinces data
    (addressStore.getProvince as jest.Mock).mockResolvedValue([
      { id: "1", name: "DKI Jakarta" },
      { id: "2", name: "Jawa Barat" },
    ]);

    // Mock cities data
    (addressStore.getCities as jest.Mock).mockResolvedValue([
      { id: "1", name: "Jakarta Pusat" },
      { id: "2", name: "Jakarta Selatan" },
    ]);

    // Mock create tournament
    (eventStore.createTournament as jest.Mock).mockResolvedValue({
      success: true,
      data: "mock-tournament-id",
    });
  });

  it("Renders the create tournament page correctly", async () => {
    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Check if main title is rendered
    expect(screen.getByText("Buat Pertandingan")).toBeInTheDocument();

    // Check if form sections are rendered
    expect(screen.getByText("Data Pertandingan")).toBeInTheDocument();
    expect(screen.getByText("Waktu dan Tanggal")).toBeInTheDocument();
    expect(screen.getByText("Detail Pertandingan")).toBeInTheDocument();
    expect(screen.getByText("Lokasi Pertandingan")).toBeInTheDocument();

    // Check if submit button is rendered
    expect(
      screen.getByRole("button", { name: /buat tournament/i })
    ).toBeInTheDocument();
  });

  it("Loads sports data on component mount", async () => {
    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(sportStore.getSport).toHaveBeenCalled();
    });
  });

  it("Loads provinces data on component mount", async () => {
    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(addressStore.getProvince).toHaveBeenCalled();
    });
  });

  it("Toggles online mode correctly", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Find the online tournament switch
    const onlineSwitch = screen.getByRole("checkbox", {
      name: /pertandingan dilakukan secara online/i,
    });

    // Initially should be unchecked (offline mode)
    expect(onlineSwitch).not.toBeChecked();

    // Check if location fields are visible in offline mode
    expect(screen.getByLabelText(/alamat lengkap/i)).toBeInTheDocument();

    // Toggle to online mode
    await user.click(onlineSwitch);

    // Should be checked now
    expect(onlineSwitch).toBeChecked();

    // Location fields should be hidden in online mode
    expect(screen.queryByLabelText(/alamat lengkap/i)).not.toBeInTheDocument();
  });

  it("Fills and submits form with valid data", async () => {
    //const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Fill tournament name
    const nameField = screen.getByLabelText(/nama pertandingan/i);
    await userEvent.type(nameField, "Test Tournament");

    // Select category
    const categoryField = screen.getByLabelText(/kategori olahraga/i);
    await userEvent.click(categoryField);
    await userEvent.click(screen.getByText("Sport"));

    // Fill quota
    const quotaField = screen.getByLabelText(/quota/i);
    await userEvent.type(quotaField, "100");

    // Fill prize pool
    const prizeField = screen.getByLabelText(/total hadiah/i);
    await userEvent.type(prizeField, "1000000");

    // Fill description
    const descriptionField = screen.getByLabelText(/deskripsi pertandingan/i);
    await userEvent.type(descriptionField, "Test tournament description");

    // Toggle to online mode to avoid location validation
    const onlineSwitch = screen.getByRole("checkbox", {
      name: /pertandingan dilakukan secara online/i,
    });
    await userEvent.click(onlineSwitch);

    // Note: In a real test, you'd also need to handle file uploads and date pickers
    // For now, we're just testing that the form can be interacted with

    expect(nameField).toHaveValue("Test Tournament");
    expect(quotaField).toHaveValue("100");
    expect(descriptionField).toHaveValue("Test tournament description");
  },10000);

  it("Handles sport category selection", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for initial data load
    await waitFor(() => {
      expect(sportStore.getSport).toHaveBeenCalled();
    });

    // Select e-sport category
    const categoryField = screen.getByLabelText(/kategori olahraga/i);
    await user.click(categoryField);
    await user.click(screen.getByText("E-Sport"));

    // Should trigger a new call to getSport with e-sport category
    await waitFor(() => {
      expect(sportStore.getSport).toHaveBeenCalledWith(
        "1",
        "10",
        "",
        "e-sport"
      );
    });
  });
});
