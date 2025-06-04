import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateClubPage from "../page";
import CreateClubLayout from "../layout";
import { createClub, uploadClubLogo } from "@/store/actions/club";
import { getAllSports } from "@/store/actions/sport";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context"; // Ditambahkan
import userEvent from "@testing-library/user-event";
import { MOCK_SPORT_ALL } from "@/store/sport";

const mockAuthData = {
  user_id: "1",
  clubs: [
    { id: "c1", name: "Club Satu", image: "" },
    { id: "c2", name: "Club Dua", image: "" },
  ],
};

jest.mock("@/store/actions/club", () => ({
  createClub: jest.fn(),
  uploadClubLogo: jest.fn(),
}));
jest.mock("@/store/actions/sport", () => ({
  getAllSports: jest.fn(),
}));
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: mockAuthData }),
  };
});

describe("Halaman Buat Club Baru", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getAllSports as jest.Mock).mockResolvedValue(MOCK_SPORT_ALL);
    (createClub as jest.Mock).mockResolvedValue({
      message: "store club success",
      data: "bbb8881f-97f2-48db-bea1-045872f884ea",
      status: 201,
    });
  });

  it("Menampilkan halaman dan form", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <CreateClubLayout>
            <CreateClubPage />
          </CreateClubLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(() =>
      expect(screen.getByText("Buat Club")).toBeInTheDocument()
    );
  });

  it("Menampilkan error saat data kosong", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <CreateClubLayout>
            <CreateClubPage />
          </CreateClubLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(async () => {
      const buttonComponent = screen.getByTestId("create-club-button");
      await userEvent.click(buttonComponent);
      expect(
        screen.getAllByText("Data harus diisi").length
      ).toBeLessThanOrEqual(4);
    });
  });

  it("Menampilkan gambar logo setelah di-upload", async () => {
    (uploadClubLogo as jest.Mock).mockResolvedValue(
      "https://dummyimage.com/100x100/000/fff.jpg"
    );
    render(
      <AuthProvider>
        <NotificationProvider>
          <CreateClubLayout>
            <CreateClubPage />
          </CreateClubLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(
      async () => {
        const fileInput = screen.getByTestId("upload-club-logo-input");
        const file = new File(["dummy content"], "test-image.png", {
          type: "image/png",
        });
        await userEvent.upload(fileInput, file);
        // const buttonComponent = await screen.findByTestId("upload-club-logo-button");
        // await userEvent.click(buttonComponent);
        const image = await screen.findByTestId("image-preview");
        expect(image).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 15000);

  it("Memberikan notifikasi sukses setelah form dikiri secara lengkap", async () => {
    (uploadClubLogo as jest.Mock).mockResolvedValue(
      "https://dummyimage.com/100x100/000/fff.jpg"
    );
    render(
      <AuthProvider>
        <NotificationProvider>
          <CreateClubLayout>
            <CreateClubPage />
          </CreateClubLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(
      async () => {
        fireEvent.change(screen.getByLabelText(/Nama Club/i), {
          target: { value: "Team X" },
        });
        fireEvent.change(screen.getByLabelText(/Singkatan Club/i), {
          target: { value: "TMX" },
        });
        fireEvent.change(screen.getByLabelText(/Phone/i), {
          target: { value: "082222222222" },
        });
        fireEvent.change(screen.getByLabelText(/Olahraga/i), {
          target: { value: "Mobile" },
        });
        const option = await screen.findByText("Mobile Legend");
        // Select the option
        await userEvent.click(option);
        const fileInput = screen.getByTestId("upload-club-logo-input");
        const file = new File(["dummy content"], "test-image.png", {
          type: "image/png",
        });
        await userEvent.upload(fileInput, file);

        const buttonComponent = screen.getByTestId("create-club-button");
        await userEvent.click(buttonComponent);
        expect(screen.getByText("Sukses membuat club!")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 15000);
});
