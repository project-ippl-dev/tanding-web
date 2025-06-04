import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ClubPage from "../page";
import ClubManagementLayout from "../layout";
import { getAllClubs, getInviteRequest } from "@/store/actions/club";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context"; // Ditambahkan
import userEvent from "@testing-library/user-event";
import { CLUB_INVITE_DUMMY, MOCK_CLUB_DUMMY } from "@/store/club";

const mockAuthData = {
  user_id: "1",
  clubs: [
    { id: "c1", name: "Club Satu", image: "" },
    { id: "c2", name: "Club Dua", image: "" },
  ],
};

jest.mock("@/store/actions/club", () => ({
  getInviteRequest: jest.fn(),
  getAllClubs: jest.fn(),
}));

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: mockAuthData }),
  };
});

describe("Halaman Club", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getInviteRequest as jest.Mock).mockResolvedValue(CLUB_INVITE_DUMMY);
    (getAllClubs as jest.Mock).mockResolvedValue(MOCK_CLUB_DUMMY);
  });

  it("Menampilkan halaman secara normal", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(() =>
      expect(screen.getByText("Join Club")).toBeInTheDocument()
    );
  });

  it("Menampilkan tab bagian undangan club", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    const tabComponent = screen.getByTestId("inv-tab");
    await userEvent.click(tabComponent);
    const invClubTableElement = screen.getByTestId("club-invitation-table");
    await waitFor(() => {
      expect(invClubTableElement).toBeInTheDocument();
    });
  });

  it("Menampilkan tab bagian club kembali", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <ClubManagementLayout>
            <ClubPage />
          </ClubManagementLayout>
        </NotificationProvider>
      </AuthProvider>
    );
    const invTabComponent = screen.getByTestId("inv-tab");
    await userEvent.click(invTabComponent);
    const clubTabComponent = screen.getByTestId("club-tab");
    await userEvent.click(clubTabComponent);
    const clubTableElement = screen.getByTestId("club-table");
    await waitFor(() => {
      expect(clubTableElement).toBeInTheDocument();
    });
  });
});
