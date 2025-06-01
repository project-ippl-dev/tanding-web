import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RankingPage from "../page";
import { getSport } from "@/store/actions/sport";
import { getPowerListClub, getPowerListUser } from "@/store/actions/ranking";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context"; // Ditambahkan
import userEvent from "@testing-library/user-event";
import { SPORT_ALL } from "@/store/sport";
import { MOCK_RANKING_CLUB, MOCK_RANKING_USER } from "@/store/ranking";

const mockAuthData = {
  user_id: "1",
  clubs: [
    { id: "c1", name: "Club Satu", image: "" },
    { id: "c2", name: "Club Dua", image: "" },
  ],
};

jest.mock("@/store/actions/ranking");
jest.mock("@/store/actions/sport");

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: mockAuthData }),
  };
});

describe("Halaman Daftar Ranking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getSport as jest.Mock).mockResolvedValue(SPORT_ALL);
    (getPowerListClub as jest.Mock).mockResolvedValue(MOCK_RANKING_CLUB);
    (getPowerListUser as jest.Mock).mockResolvedValue(MOCK_RANKING_USER);
  });

  it("Menampilkan daftar ranking untuk club", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <RankingPage />
        </NotificationProvider>
      </AuthProvider>
    );

    // console.log(screen.debug());
    const radioClubRanking = await waitFor(
      () => screen.findByTestId("club-ranking-radio"),
      { timeout: 10000 }
    );
    await userEvent.click(radioClubRanking);
    expect(
      screen.getAllByText("Black Jaguar Taekwondo Club").length
    ).toBeGreaterThanOrEqual(1);
  }, 15000);

  it("Menampilkan daftar ranking untuk user", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <RankingPage />
        </NotificationProvider>
      </AuthProvider>
    );
    // console.log(screen.debug());
    const radioUserRanking = await waitFor(
      () => screen.findByTestId("user-ranking-radio"),
      { timeout: 10000 }
    );
    await userEvent.click(radioUserRanking);
    expect(screen.getAllByText("Angga Widianto").length).toBeGreaterThanOrEqual(
      1
    );
  }, 15000);
});
