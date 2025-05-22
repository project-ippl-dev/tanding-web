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
import WrapperContext from "@/app/wrapper";

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
    const mockEventInfinityData = {...EVENT_INFINITY};
    mockEventInfinityData.status = 200;
    const sportsDataAll = {...SPORT_ALL};
    sportsDataAll.status = 200;
    (eventStore.getTournamentInfinity as jest.Mock).mockResolvedValue(mockEventInfinityData);

    (sportStore.getSport as jest.Mock).mockResolvedValue(sportsDataAll);
  });

  it("Menampilkan halaman secara normal", async () => {
    render(
      <WrapperContext>
          <Tournament />
      </WrapperContext>
    );
    const skeleton = document.querySelector('.MuiSkeleton-root');
    
    await waitFor(() => {
      expect(skeleton).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
    })

    await waitFor(() => {
      expect(skeleton).not.toBeInTheDocument();
    });

    // Merender jumlah kartu turnamen yang sesuai
    await waitFor(() => {
      const tournamentItems = screen.getAllByTestId("tournament-item");
      expect(tournamentItems.length).toEqual(EVENT_INFINITY.data.length);
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
