import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as eventStore from "@/store/actions/event";
import { AUTH_DATA } from "@/store/auth";
import WrapperContext from "@/app/wrapper";
import { EventOwnResponse } from "@/types/event.type";
import OwnTournament from "../page";
import { EVENT_OWN } from "@/store/event";
import { useRouter } from "next/navigation";


jest.mock("@/store/actions/event");
jest.mock("next/navigation"); // Pastikan mock digunakan

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: AUTH_DATA }),
  };
});

interface EventOwnInterface extends EventOwnResponse {
  status: number;
}


describe("Unit Testing Halaman List Tournament View", () => {    
  beforeEach(() => {
    jest.clearAllMocks();
    const mockEventData: EventOwnInterface = {
      ...EVENT_OWN,
      status: 200,
    };

    (eventStore.getOwnTournament as jest.Mock).mockResolvedValue(mockEventData);
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

    it("Menguji saat akses data API gagal",async()=>{
      (eventStore.getOwnTournament as jest.Mock).mockRejectedValue("Gagal mengakses server");
      render(
        <WrapperContext>
            <OwnTournament />
        </WrapperContext>
      );

      await waitFor(() => {
        expect(eventStore.getOwnTournament).toHaveBeenCalled();
      })

      await waitFor(() => {
        expect(screen.getByText("Gagal dalam mengakses sever")).toBeInTheDocument();
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

  /*

  it("Menguji jendela filter mobile",async ()=>{
    // Mocking useMediaQuery menjadi ukuran md
    jest.mock('@mui/material/useMediaQuery',() => (true));

    render(
      <WrapperContext>
          <Tournament />
      </WrapperContext>
    );
    const skeleton = document.querySelector('.MuiSkeleton-root');

    await waitFor(() => {
      expect(skeleton).not.toBeInTheDocument();
    })

    await waitFor(async () => {
      const filterButton = screen.getByTestId("filter-button-mobile-test");
      expect(filterButton).toBeInTheDocument();
      
      await userEvent.click(filterButton);
      waitFor(() => {
        // Window filter terbuka
        expect(screen.getByText("Tipe Olahraga")).toBeInTheDocument();
      })
    })
  })

  it("Menguji handle saat gagal akses server API Tournament", async () => {
    (eventStore.getTournamentInfinity as jest.Mock).mockRejectedValue(new Error("Error fetching data"));

    render(
      <WrapperContext>
          <Tournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
    })

    await waitFor(() => {
      expect(screen.getByText("Gagal mengakses server")).toBeInTheDocument();
    })
  })

  it("Menguji handle saat gagal akses server API Sport", async () => {
    (sportStore.getSport as jest.Mock).mockRejectedValue(new Error("Error fetching data"));

    render(
      <WrapperContext>
          <Tournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(sportStore.getSport).toHaveBeenCalled();
    })

    await waitFor(() => {
      expect(screen.getByText("Gagal mengakses server")).toBeInTheDocument();
    })
  })
  */
});
