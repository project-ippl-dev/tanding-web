import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as eventStore from "@/store/actions/event";
import { EVENT_OWN } from "@/store/event";
import WrapperContext from "@/app/wrapper";
import { useRouter } from "next/navigation";
import OwnTournament from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Unit Testing Halaman List Own Tournament View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("Menampilkan halaman secara normal dan merender kartu turnamen yang sesuai", async () => {
    render(
      <WrapperContext>
        <OwnTournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getOwnTournament).toHaveBeenCalled();
      const tournamentItems = screen.getAllByTestId("tournament-own-item");
      expect(tournamentItems.length).toEqual(EVENT_OWN.data.length);
    });
  });

  it("Menampilkan pesan error saat gagal akses server API", async () => {
    (eventStore.getOwnTournament as jest.Mock).mockRejectedValueOnce(new Error("Error fetching data"));

    render(
      <WrapperContext>
        <OwnTournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getOwnTournament).toHaveBeenCalled();
      expect(screen.getByText("Gagal mengakses server")).toBeInTheDocument();
    });
  });

  it("Mengarahkan ke halaman detail saat kartu turnamen diklik", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    
    render(
      <WrapperContext>
        <OwnTournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getOwnTournament).toHaveBeenCalled();
      
      const tournamentItems = screen.getAllByTestId("tournament-own-item");
      
      // Test only the first item to avoid redundancy
      fireEvent.click(tournamentItems[0]);
      expect(mockPush).toHaveBeenCalledWith(`/my-event/${EVENT_OWN.data[0].id}`);
      
      // If you want to test all items, using a more concise approach:
      tournamentItems.forEach((item, index) => {
        fireEvent.click(item);
        expect(mockPush).toHaveBeenCalledWith(`/my-event/${EVENT_OWN.data[index].id}`);
      });
    });
  });
});