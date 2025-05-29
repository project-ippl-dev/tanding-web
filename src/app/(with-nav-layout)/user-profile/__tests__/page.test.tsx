import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event"; // Tidak digunakan di tes spesifik ini
import UserProfile from "../page";
import * as profileStore from "@/store/actions/profile";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from '@/context/notification.context'; // Ditambahkan
import { userProfileData } from "@/store/profile";
import userEvent from "@testing-library/user-event";

jest.mock("@/store/actions/profile");

const mockAuthData = {
  user_id: "1",
  clubs: [
    { id: "c1", name: "Club Satu", image: "" },
    { id: "c2", name: "Club Dua", image: "" },
  ],
};

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: mockAuthData }),
  };
});

describe("Halaman UserProfile", () => {
    
  beforeEach(() => {
    jest.clearAllMocks();
    (profileStore.getProfileData as jest.Mock).mockResolvedValue({
      ...userProfileData,
      status: 200, // Simulasi status sukses
    });
  });

  it("Menampilkan halaman secara normal", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(() => expect(screen.getByText(userProfileData.data.name)).toBeInTheDocument());
  });

  it('Menampilkan DialogProfileBasic saat tombol edit diklik', async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);
    await waitFor(() => {
        // Memastikan form edit di render
      expect(screen.getByRole("button", { name: /simpan/i })).toBeInTheDocument();
    }, {interval: 1000});
  });

  it("Menampilkan notifikasi 'data kosong' saat tombol edit diklik dan fail fetch", async () => {
    (profileStore.getProfileData as jest.Mock).mockRejectedValue(new Error("Error fetching data"));

    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);
    await waitFor(() => {
        expect(screen.getByText(/Gagal memuat data/i)).toBeInTheDocument();
    })
  })

  it("Menangani error saat memuat data dan menampilkan notifikasi", async () => {
    (profileStore.getProfileData as jest.Mock).mockRejectedValue(new Error("Error fetching data"));

    render(
      <AuthProvider>
        <NotificationProvider> {/* UserProfile dibungkus dengan NotificationProvider */}
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(() => {
      // Memastikan notifikasi error muncul dengan pesan yang benar
      expect(screen.getByText("Gagal memuat data profil")).toBeInTheDocument();
    });
  });

  it("Menampilkan tulisan update profile saat, can_participate false", async () => {
    const editedResponse = {...userProfileData}
    editedResponse.data.can_participate = false;

    (profileStore.updateProfileData as jest.Mock).mockResolvedValue(editedResponse);

    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByText("Update Profile Sekarang")).toBeInTheDocument());
  });
});
