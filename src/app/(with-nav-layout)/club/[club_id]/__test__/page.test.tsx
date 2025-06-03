import React from "react";
import * as navigation from "next/navigation";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClubDetailPage from "../page";
import ClubManagementLayout from "../../layout";
import {
  getJoinRequest,
  getMembersOfClub,
  getOneClub,
} from "@/store/actions/club";
import { searchUser } from "@/store/actions/user";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context"; // Ditambahkan
import userEvent from "@testing-library/user-event";
import {
  CLUB_JOIN_DATA,
  CLUB_MEMBER_DATA,
  CLUB_ONE_DATA,
  CLUB_ONE_DATA_JOINED,
  CLUB_ONE_DATA_PRIVILEGED,
} from "@/store/club";
import { USER_SEARCH } from "@/store/user";

const mockAuthData = {
  user_id: "1",
  clubs: [
    { id: "c1", name: "Club Satu", image: "" },
    { id: "c2", name: "Club Dua", image: "" },
  ],
};

jest.mock("@/store/actions/club");
jest.mock("@/store/actions/user");
jest.mock("next/navigation");
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: mockAuthData }),
  };
});

describe("Halaman Detail Club", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (navigation.useParams as jest.Mock).mockReturnValue({
      id: CLUB_ONE_DATA.data?.id,
    });
    (getMembersOfClub as jest.Mock).mockResolvedValue(CLUB_MEMBER_DATA);
    (searchUser as jest.Mock).mockResolvedValue({
      ...USER_SEARCH,
      status: 200,
    });
  });

  it("Menampilkan halaman secara normal", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(() =>
      expect(screen.getByText("Join Club")).toBeInTheDocument()
    );
  });

  it("Menampilkan tombol join club jika belum bergabung dengan club", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      const buttonComponent = screen.getByTestId("join-club-button");
      expect(buttonComponent).toBeInTheDocument();
    });
  });

  it("Menampilkan dialog join club saat tombol join club diklik", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(
      async () => {
        const buttonComponent = await screen.findByTestId("join-club-button");
        await userEvent.click(buttonComponent);
        const dialogElement = screen.queryByTestId("dialog-join-club-comp");
        expect(dialogElement).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 15000);

  it("Menyembunyikan tombol join club jika sudah bergabung dengan club", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA_JOINED);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      const buttonComponent = screen.queryByTestId("join-club-button");
      expect(buttonComponent).not.toBeInTheDocument();
    });
  });

  it("Menyembunyikan tab permintaan join club jika pengguna tidak memiliki privilege", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      const joinClubTab = screen.queryByTestId("join-club-tab");
      const searchUserComp = screen.queryByTestId("search-user-member");
      expect(joinClubTab).not.toBeInTheDocument();
      expect(searchUserComp).not.toBeInTheDocument();
    });
  });

  it("Menampilkan tab permintaan join club jika pengguna memiliki privilege", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA_PRIVILEGED);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(
      async () => {
        const joinClubTab = await screen.findByTestId("join-club-tab");
        const searchUserComp = await screen.findByTestId("search-user-member");
        expect(joinClubTab).toBeInTheDocument();
        expect(searchUserComp).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 15000);

  it("Memberi pengguna dengan privilege fungsi mencari pengguna", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA_PRIVILEGED);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      const inputField = screen.getByTestId(
        "invite-new-member-text-field"
      ) as HTMLInputElement;
      // const autocomplete = screen.getByTestId(
      //   "invite-new-member-autocomplete"
      // ) as HTMLInputElement;

      fireEvent.change(inputField, { target: { value: "Aditya" } });
      // expect(inputField.value).toBe("Aditya Lityanian Al Nasir 93934");
      expect(
        screen.getAllByText("Aditya Lityanian Al Nasir 93934").length
      ).toBeGreaterThanOrEqual(1);
      
    });
  });

  it("Menampilkan daftar permintaan join club jika tombol diklik", async () => {
    (getOneClub as jest.Mock).mockResolvedValue(CLUB_ONE_DATA_PRIVILEGED);
    (getJoinRequest as jest.Mock).mockResolvedValue(CLUB_JOIN_DATA);
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubDetailPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(async () => {
      const joinClubTab = await screen.findByTestId("join-club-tab");
      await userEvent.click(joinClubTab);
      const requestListTable = await screen.findByTestId("join-request-list");
      expect(requestListTable).toBeInTheDocument();
    });
  });
});
