import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as eventStore from "@/store/actions/event";
import { AUTH_DATA } from "@/store/auth";
import { EVENT_OWN } from "@/store/event";
import WrapperContext from "@/app/wrapper";
import { EventOwnResponse } from "@/types/event.type";
import { useRouter } from "next/navigation";
import OwnTournament from "../page";

jest.mock("@/store/actions/event");

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: AUTH_DATA }),
  };
});

interface EventOwnMockResponse extends EventOwnResponse {
  status: number;
}


describe("Unit Testing Halaman List Own Tournament View", () => {    
  beforeEach(() => {
    jest.clearAllMocks();
    const mockEventOwnData:  EventOwnMockResponse= {
      ...EVENT_OWN,
      status: 200,
    };
    (eventStore.getOwnTournament as jest.Mock).mockResolvedValue(mockEventOwnData);

  });

  it("Menampilkan halaman secara normal", async () => {
    render(
      <WrapperContext>
          <OwnTournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getOwnTournament).toHaveBeenCalled();
    })

    // Merender jumlah kartu turnamen yang sesuai
    await waitFor(() => {
      const tournamentItems = screen.getAllByTestId("tournament-own-item");
      expect(tournamentItems.length).toEqual(EVENT_OWN.data.length);
    });
  });

  it("Menguji handle saat gagal akses server API Tournament", async () => {
    (eventStore.getOwnTournament as jest.Mock).mockRejectedValue(new Error("Error fetching data"));

    render(
      <WrapperContext>
          <OwnTournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getOwnTournament).toHaveBeenCalled();
    })

    await waitFor(() => {
      expect(screen.getByText("Gagal mengakses server")).toBeInTheDocument();
    })
  })

  
  it("Menguji url yang dibuat", async () => {
    const mockRoute = useRouter()
    
    render(
      <WrapperContext>
          <OwnTournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getOwnTournament).toHaveBeenCalled();
    })

    await waitFor(async () => {
      const tournamentItems = screen.getAllByTestId("tournament-own-item");

      tournamentItems.forEach((item,index) => {
        fireEvent.click(item);
        expect(mockRoute.push).toHaveBeenCalledWith(`/my-event/${EVENT_OWN.data[index].id}`);
      });
    })
  })
});
