import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event"; // Tidak digunakan di tes spesifik ini
import * as sportStore from "@/store/actions/sport";
import * as eventStore from "@/store/actions/event";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from '@/context/notification.context'; // Ditambahkan
import { AUTH_DATA } from "@/store/auth";
import { EVENT_INFINITY } from "@/store/event";
import { SPORT_ALL } from "@/store/sport";
import Tournament from "../page";

jest.mock("@/store/actions/event");
jest.mock("@/store/actions/sport");

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: AUTH_DATA }),
  };
});

describe("Unit Testing Halaman List Tournament View", () => {
    
  beforeEach(() => {
    jest.clearAllMocks();
    (eventStore.getTournamentInfinity as jest.Mock).mockResolvedValue(EVENT_INFINITY);

    (sportStore.getSport as jest.Mock).mockResolvedValue(SPORT_ALL);
  });

  it("Menampilkan halaman secara normal", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <Tournament />
        </NotificationProvider>
      </AuthProvider>
    );

    
    await waitFor(() => {
      const childItems = screen.getAllByTestId('tournament-item');
      
      // Memeriksa jumlah item torunament yang di render
      expect(childItems.length).toEqual(EVENT_INFINITY.data.length);
      expect(screen.getByText("Tipe Olahraga")).toBeInTheDocument();
      expect(screen.getByText("Olahraga")).toBeInTheDocument();
    });

  });

/*
  
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
        expect(screen.getByText("Data profil Kosong")).toBeInTheDocument();
    })
  })

  it("Menangani error saat memuat data dan menampilkan notifikasi", async () => {
    (profileStore.getProfileData as jest.Mock).mockRejectedValue(new Error("Error fetching data"));

    render(
      <AuthProvider>
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
  */
});
