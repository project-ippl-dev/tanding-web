// src/app/(with-nav-layout)/payment/__test__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentPage from "../page";
import WrapperContext from "@/app/wrapper";
import { getAllPaymentForClub } from "@/store/actions/payment";

// Mock payment actions
jest.mock("@/store/actions/payment", () => ({
  getAllPaymentForClub: jest.fn(),
  getDetailPaymentForClub: jest.fn(),
  updatePaymentStatus: jest.fn(),
  storePayment: jest.fn(),
  getPaymentForOwner: jest.fn(),
  getPaymentTotalForOwner: jest.fn(),
  getPaymentForClubOwner: jest.fn(),
}));

const mockGetAllPaymentForClub = getAllPaymentForClub as jest.MockedFunction<
  typeof getAllPaymentForClub
>;

// Mock Next.js components
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({ id: "test-event-id" }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

const mockPaymentData = {
  message: "fetch all payment receipt in specific event success",
  data: [
    {
      id: "payment-1",
      event_id: "event-1",
      event_name: "Test Tournament",
      unique_number: 123,
      payment_link: "https://example.com/payment1.jpg",
      status: "approved" as const,
      club_id: "club-1",
      club_name: "Test Club",
      user_name: "John Doe",
      admin_name: "Admin User",
      club_owner: "Club Owner",
      total: 150000,
      created_at: "2023-01-01T00:00:00Z",
      class_events: [
        {
          id: "class-1",
          price: 150000,
          name: "Test Class",
        },
      ],
    },
    {
      id: "payment-2",
      event_id: "event-1",
      event_name: "Test Tournament",
      unique_number: 124,
      payment_link: "https://example.com/payment2.jpg",
      status: "waiting" as const,
      club_id: "club-2",
      club_name: "Another Club",
      user_name: "Jane Smith",
      admin_name: "Admin User",
      club_owner: "Another Owner",
      total: 200000,
      created_at: "2023-01-02T00:00:00Z",
      class_events: [
        {
          id: "class-2",
          price: 200000,
          name: "Another Class",
        },
      ],
    },
  ],
  current_page: 1,
  has_previous_page: false,
  has_next_page: false,
  previous_page: 0,
  next_page: 2,
  last_page: 1,
  total_item: 2,
};

const mockEmptyPaymentData = {
  message: "fetch all payment receipt in specific event success",
  data: [],
  current_page: 1,
  has_previous_page: false,
  has_next_page: false,
  previous_page: 0,
  next_page: 2,
  last_page: 1,
  total_item: 0,
};

describe("Unit Testing Payment Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Menampilkan halaman payment secara normal", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if payment data is displayed - based on actual UI structure
    await waitFor(() => {
      // Check for tournament names (multiple instances)
      const tournamentHeadings = screen.getAllByText("Test Tournament");
      expect(tournamentHeadings.length).toBeGreaterThan(0);
    });
  });

  it("Menampilkan state loading awal", () => {
    mockGetAllPaymentForClub.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    // Since there are no accessible roles during loading, check that no payment items exist yet
    const paymentItems = screen.queryAllByTestId(/payment-item-/);
    expect(paymentItems).toHaveLength(0);
    
    // Verify the mock was called (indicating the fetch attempt started)
    expect(mockGetAllPaymentForClub).toHaveBeenCalled();
  });

  it("Menampilkan pesan kosong ketika tidak ada payment", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockEmptyPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    // Check that no payment items are displayed
    await waitFor(() => {
      const paymentItems = screen.queryAllByTestId(/payment-item-/);
      expect(paymentItems).toHaveLength(0);
    });

    // Check for header showing count of 0
    await waitFor(() => {
      expect(screen.getByText("Registrasi (0)")).toBeInTheDocument();
    });
  });

  it("Menampilkan payment items dengan data yang benar", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      // Check for payment items using test IDs
      expect(screen.getByTestId("payment-item-payment-1")).toBeInTheDocument();
      expect(screen.getByTestId("payment-item-payment-2")).toBeInTheDocument();
    });
  });

  it("Menampilkan format currency yang benar", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
      expect(screen.getByText("Rp 200.000")).toBeInTheDocument();
    });
  });

  it("Menampilkan status payment yang benar", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      // Based on the error message, status appears as "Disetujui" and "Menunggu"
      expect(screen.getByText("Disetujui")).toBeInTheDocument();
      expect(screen.getByText("Menunggu")).toBeInTheDocument();
    });
  });

  it("Menguji klik pada payment item", async () => {
    const user = userEvent.setup();
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      const paymentItem = screen.getByTestId("payment-item-payment-1");
      expect(paymentItem).toBeInTheDocument();
    });

    // Click on the payment item
    const paymentItem = screen.getByTestId("payment-item-payment-1");
    await user.click(paymentItem);

    // Verify it's clickable (button element)
    expect(paymentItem.tagName).toBe("BUTTON");
  });

  it("Menguji handle error saat fetch payment", async () => {
    mockGetAllPaymentForClub.mockRejectedValue(new Error("Network error"));

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    // Check that no payment items are displayed when there's an error
    await waitFor(() => {
      const paymentItems = screen.queryAllByTestId(/payment-item-/);
      expect(paymentItems).toHaveLength(0);
    });

    // Since error handling might be different, just verify the API was called
    // and no data is displayed (which indicates error handling occurred)
    expect(mockGetAllPaymentForClub).toHaveBeenCalledTimes(1);
  });

  it("Menampilkan images dengan alt text yang benar", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      // Check for images with correct alt text
      const images = screen.getAllByAltText("Test Tournament");
      expect(images).toHaveLength(2);
      
      // Verify image sources
      expect(images[0]).toHaveAttribute("src", "https://example.com/payment1.jpg");
      expect(images[1]).toHaveAttribute("src", "https://example.com/payment2.jpg");
    });
  });

  it("Menampilkan jumlah total payment dalam header", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      // Check for header showing total count
      expect(screen.getByText("Registrasi (2)")).toBeInTheDocument();
    });
  });

  it("Menguji responsive layout styling", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      // Check if payment items have proper styling classes
      const paymentItem = screen.getByTestId("payment-item-payment-1");
      expect(paymentItem).toHaveClass("flex", "items-center");
    });
  });

  it("Menguji hover effects pada payment items", async () => {
    const user = userEvent.setup();
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      const paymentItem = screen.getByTestId("payment-item-payment-1");
      expect(paymentItem).toHaveClass("hover:bg-gray-50");
    });
  });

  it("Menampilkan data dengan struktur yang benar", async () => {
    mockGetAllPaymentForClub.mockResolvedValue(mockPaymentData);

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetAllPaymentForClub).toHaveBeenCalled();
    });

    await waitFor(() => {
      // Verify the payment item buttons contain the expected text content
      const paymentButton1 = screen.getByTestId("payment-item-payment-1");
      expect(paymentButton1).toHaveTextContent("Test Tournament");
      expect(paymentButton1).toHaveTextContent("Rp 150.000");
      expect(paymentButton1).toHaveTextContent("Disetujui");

      const paymentButton2 = screen.getByTestId("payment-item-payment-2");
      expect(paymentButton2).toHaveTextContent("Test Tournament");
      expect(paymentButton2).toHaveTextContent("Rp 200.000");
      expect(paymentButton2).toHaveTextContent("Menunggu");
    });
  });
});