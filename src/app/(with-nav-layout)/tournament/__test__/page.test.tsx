import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as sportStore from "@/store/actions/sport";
import * as eventStore from "@/store/actions/event";
import { AUTH_DATA } from "@/store/auth";
import { EVENT_INFINITY } from "@/store/event";
import { SPORT_ALL } from "@/store/sport";
import Tournament from "../page";
import WrapperContext from "@/app/wrapper";
import { EventInfinityResponse } from "@/types/event.type";
import { SportResponseMultiple } from "@/types/sport.type";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";


jest.mock("@/store/actions/event");
jest.mock("@/store/actions/sport");
jest.mock('@mui/material/useMediaQuery', () => jest.fn()); // Mock useMediaQuery untuk ukuran layar mobile
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({ authData: AUTH_DATA }),
  };
});

interface EventInfinityMockResponse extends EventInfinityResponse {
  status: number;
}

interface SportMockResponse extends SportResponseMultiple{
  status: number;
}

describe("Unit Testing Halaman List Tournament View", () => {    
  beforeEach(() => {
    jest.clearAllMocks();
    (useMediaQuery as jest.Mock).mockReturnValue(true); // Mock useMediaQuery untuk ukuran layar desktop
    const mockEventInfinityData: EventInfinityMockResponse = {
      ...EVENT_INFINITY,
      status: 200,
    };
    const sportsDataAll:SportMockResponse = {
      ...SPORT_ALL,
      status: 200,
    };
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
      expect(sportStore.getSport).toHaveBeenCalled();
    })

    await waitFor(() => {
      expect(skeleton).not.toBeInTheDocument();
    })

    // Merender jumlah kartu turnamen yang sesuai
    await waitFor(() => {
      const tournamentItems = screen.getAllByTestId("tournament-item");
      expect(tournamentItems.length).toEqual(EVENT_INFINITY.data.length);
    });
  });

  it("Menguji jendela filter mobile",async ()=>{
    // Mocking useMediaQuery menjadi ukuran md
    (useMediaQuery as jest.Mock).mockReturnValue(false);
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
        const sportRadio = screen.getAllByTestId("sport-radio-filter-mobile");
        expect(sportRadio.length).toEqual(SPORT_ALL.data.length);
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

  it("Menguji tampilan informasi ketika tidak ada data tournamen", async () => {
      const mockedValue = {
        ...EVENT_INFINITY,
        status: 200,
        data: [],
      };
      (eventStore.getTournamentInfinity as jest.Mock).mockResolvedValue(mockedValue);

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
        expect(sportStore.getSport).toHaveBeenCalled();
      })

      await waitFor(() => {
        expect(skeleton).not.toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText("Data tidak ditemukan")).toBeInTheDocument();
      })
  })

  it("Menguji jumlah pilihan olahraga dalam filter yang sesuai", async () => {
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
        expect(sportStore.getSport).toHaveBeenCalled();
      })

      await waitFor(() => {
        expect(skeleton).not.toBeInTheDocument();
      })

      await waitFor(() => {
        const sportRadio = screen.getAllByTestId("sport-radio-filter");
        expect(sportRadio.length).toEqual(SPORT_ALL.data.length);
      })
  })
  
  it("Menguji url yang dibuat", async () => {
    const mockRoute = useRouter()
    
    render(
      <WrapperContext>
          <Tournament />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(sportStore.getSport).toHaveBeenCalled();
    })
    
    await waitFor(() => {
      expect(eventStore.getTournamentInfinity).toHaveBeenCalled();
    })

    await waitFor(async () => {
      const tournamentItems = screen.getAllByTestId("tournament-item");

      tournamentItems.forEach((item,index) => {
        fireEvent.click(item);
        expect(mockRoute.push).toHaveBeenCalledWith(`/tournament/${EVENT_INFINITY.data[index].id}`);
      });


    })
  })
});
