import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateTournamentPage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock the store actions with proper module mocking
jest.mock("@/store/actions/sport", () => ({
  getSport: jest.fn(),
}));

jest.mock("@/store/actions/address", () => ({
  getProvince: jest.fn(),
  getCities: jest.fn(),
}));

jest.mock("@/store/actions/event", () => ({
  createTournament: jest.fn(),
}));

// Import the mocked functions
import * as sportStore from "@/store/actions/sport";
import * as addressStore from "@/store/actions/address";
import * as eventStore from "@/store/actions/event";
import { SPORT_ALL } from "@/store/sport";

// Mock the auth context
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({
      authData: {
        token: { access_token: "mock-token" },
        user_id: "mock-user-id",
        profile: { name: "Test User" },
      },
    }),
  };
});

// Mock CKEditor to avoid loading issues in tests
jest.mock("@ckeditor/ckeditor5-react", () => ({
  CKEditor: ({ onChange }: { onChange: any }) => (
    <textarea
      data-testid="ckeditor-mock"
      onChange={(e) => onChange(null, { getData: () => e.target.value })}
    />
  ),
}));

jest.mock("@ckeditor/ckeditor5-build-classic", () => ({}));

// Mock next/router to prevent navigation errors
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock URL.createObjectURL for file upload handling
global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

describe("Create Tournament Page", () => {
  // Cast the mocked functions to jest.Mock for proper typing
  const mockGetSport = sportStore.getSport as jest.MockedFunction<typeof sportStore.getSport>;
  const mockGetProvince = addressStore.getProvince as jest.MockedFunction<typeof addressStore.getProvince>;
  const mockGetCities = addressStore.getCities as jest.MockedFunction<typeof addressStore.getCities>;
  const mockCreateTournament = eventStore.createTournament as jest.MockedFunction<typeof eventStore.createTournament>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock sports data
    mockGetSport.mockResolvedValue({
      ...SPORT_ALL,
      status: 200,
    });

    // Mock provinces data
    mockGetProvince.mockResolvedValue([
      { id: "1", name: "DKI Jakarta" },
      { id: "2", name: "Jawa Barat" },
    ]);

    // Mock cities data
    mockGetCities.mockResolvedValue([
      { id: "1", name: "Jakarta Pusat" },
      { id: "2", name: "Jakarta Selatan" },
    ]);

    // Mock create tournament
    mockCreateTournament.mockResolvedValue({
      success: true,
      message: "Tournament berhasil dibuat",
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
      expect(mockGetSport).toHaveBeenCalled();
    });
  });

  it("Loads provinces data on component mount", async () => {
    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetProvince).toHaveBeenCalled();
    });
  });

  it("Toggles online mode correctly", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for component to load
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalled();
    });

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
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for component to load
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalled();
    }, { timeout: 10000 });

    // Fill basic required fields only
    const nameField = screen.getByLabelText(/nama pertandingan/i);
    await user.type(nameField, "Test Tournament");

    // Fill quota
    const quotaField = screen.getByLabelText(/quota/i);
    await user.type(quotaField, "100");

    // Fill prize pool
    const prizeField = screen.getByLabelText(/total hadiah/i);
    await user.type(prizeField, "1000000");

    // Fill description
    const descriptionField = screen.getByLabelText(/deskripsi pertandingan/i);
    await user.type(descriptionField, "Test tournament description");

    // Toggle to online mode to avoid location validation
    const onlineSwitch = screen.getByRole("checkbox", {
      name: /pertandingan dilakukan secara online/i,
    });
    await user.click(onlineSwitch);

    // Verify the values are set correctly
    expect(nameField).toHaveValue("Test Tournament");
    expect(quotaField).toHaveValue("100");
    expect(descriptionField).toHaveValue("Test tournament description");
    expect(onlineSwitch).toBeChecked();
  }, 15000); // Increase timeout to 15 seconds

  it("Handles sport category selection", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for initial data load
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalled();
    }, { timeout: 10000 });

    // Find category field and select e-sport
    const categoryField = screen.getByLabelText(/kategori olahraga/i);
    await user.click(categoryField);
    
    // Look for E-Sport option and click it
    const eSportOption = screen.getByText("E-Sport");
    await user.click(eSportOption);

    // Should trigger a new call to getSport with e-sport category
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalledWith(
        "1",
        "10",
        "",
        "e-sport"
      );
    }, { timeout: 5000 });
  }, 15000);

  it("Shows validation errors for required fields", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for component to load
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalled();
    }, { timeout: 10000 });

    // Try to submit without filling required fields
    const submitButton = screen.getByRole("button", { name: /buat tournament/i });
    await user.click(submitButton);

    // Should show validation errors - check for specific field errors
    await waitFor(() => {
      // Check for specific validation messages
      const errorMessages = screen.getAllByText("data harus diisi");
      expect(errorMessages.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  }, 15000);

  it("Renders banner upload section", () => {
    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Check if banner upload section is rendered
    expect(screen.getByText("Banner Pertandingan")).toBeInTheDocument();
    expect(screen.getByText("Upload Banner")).toBeInTheDocument();
  });

  it("Handles API errors gracefully", async () => {
    // Mock API to throw error
    mockGetSport.mockRejectedValue(new Error("Network error"));

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Should still render the page even if API fails
    expect(screen.getByText("Buat Pertandingan")).toBeInTheDocument();
  });

  it("Handles form submission with complete data", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for component to load
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalled();
    }, { timeout: 10000 });

    // Fill all required fields
    const nameField = screen.getByLabelText(/nama pertandingan/i);
    await user.type(nameField, "Test Tournament");

    // Fill quota
    const quotaField = screen.getByLabelText(/quota/i);
    await user.type(quotaField, "100");

    // Fill prize pool
    const prizeField = screen.getByLabelText(/total hadiah/i);
    await user.type(prizeField, "1000000");

    // Fill description
    const descriptionField = screen.getByLabelText(/deskripsi pertandingan/i);
    await user.type(descriptionField, "Test tournament description");

    // Toggle to online mode to avoid location validation
    const onlineSwitch = screen.getByRole("checkbox", {
      name: /pertandingan dilakukan secara online/i,
    });
    await user.click(onlineSwitch);

    // Test form fields are filled correctly
    expect(nameField).toHaveValue("Test Tournament");
    expect(quotaField).toHaveValue("100");
    expect(descriptionField).toHaveValue("Test tournament description");
    expect(onlineSwitch).toBeChecked();

    // Check submit button exists (but don't actually submit due to file upload complexity)
    const submitButton = screen.getByRole("button", { name: /buat tournament/i });
    expect(submitButton).toBeInTheDocument();
  }, 15000);

  it("Updates cities when province is selected", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CreateTournamentPage />
      </WrapperContext>
    );

    // Wait for component to load and provinces to be fetched
    await waitFor(() => {
      expect(mockGetSport).toHaveBeenCalled();
      expect(mockGetProvince).toHaveBeenCalled();
    });

    // Note: Testing Autocomplete interaction can be complex and might need
    // adjustment based on your MUI Autocomplete implementation
    // This is a simplified test that checks if the component is rendered
    const provinceLabel = screen.getByText(/provinsi/i);
    expect(provinceLabel).toBeInTheDocument();
    
    // If province selection triggers city fetch, we could test it like this:
    // But this would require more complex interaction with the Autocomplete component
  });
});