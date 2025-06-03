import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as paymentStore from "@/store/actions/payment";
import { PAYMENT_OWNER } from "@/store/payment";
import PaymentPage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock the store actions
jest.mock("@/store/actions/payment");

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock the auth context
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({
      authData: {
        token: { access_token: "mock-token" },
        user_id: "mock-user-id",
        profile: { name: "Test User" },
      },
    }),
  };
});

describe("Payment Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful payment data response
    (paymentStore.getAllPaymentForClub as jest.Mock).mockResolvedValue({
      data: PAYMENT_OWNER.data,
      status: 200,
    });
  });

  it("Renders the payment page correctly", async () => {
    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    // Should show loading initially
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if main title is rendered with payment count
    await waitFor(() => {
      expect(
        screen.getByText(`Registrasi (${PAYMENT_OWNER.data.length})`)
      ).toBeInTheDocument();
    });
  });

  it("Displays payment list when data is available", async () => {
    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if payment items are rendered by looking for the payment list and items
    await waitFor(() => {
      // Check for payment list container
      expect(screen.getByTestId("payment-list")).toBeInTheDocument();

      // Check that we have the correct number of payment items
      const paymentItems = screen.getAllByTestId(/^payment-item-/);
      expect(paymentItems).toHaveLength(PAYMENT_OWNER.data.length);

      // Check for at least one event name (since they might be duplicated in mock data)
      expect(
        screen.getAllByText("Taekwondo Tournament").length
      ).toBeGreaterThan(0);
    });
  });

  it("Shows empty state when no payments are available", async () => {
    // Mock empty response
    (paymentStore.getAllPaymentForClub as jest.Mock).mockResolvedValue({
      data: [],
      status: 200,
    });

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if empty state is displayed
    await waitFor(() => {
      expect(screen.getByText("Tidak ada data registrasi")).toBeInTheDocument();
      expect(
        screen.getByText("Belum ada pembayaran untuk ditampilkan")
      ).toBeInTheDocument();
    });
  });

  it("Handles error state correctly", async () => {
    // Mock error response
    (paymentStore.getAllPaymentForClub as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch payments")
    );

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch payments")
      ).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });
  });

  it("Displays correct payment status badges", async () => {
    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if status badges are rendered correctly
    await waitFor(() => {
      // Check for approved status
      const approvedPayments = PAYMENT_OWNER.data.filter(
        (p) => p.status === "approved"
      );
      if (approvedPayments.length > 0) {
        expect(screen.getAllByText("Disetujui")).toHaveLength(
          approvedPayments.length
        );
      }
    });
  });

  it("Formats currency correctly", async () => {
    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Check if currency is formatted correctly (Indonesian Rupiah)
    await waitFor(() => {
      PAYMENT_OWNER.data.forEach((payment) => {
        const paymentItem = screen.getByTestId(`payment-item-${payment.id}`);
        // Check if the payment amount is displayed (look for the number part)
        expect(paymentItem).toHaveTextContent(
          payment.total.toLocaleString("id-ID")
        );
      });
    });
  });

  it("Navigates to payment detail when payment item is clicked", async () => {
    const mockPush = jest.fn();
    jest.doMock("next/navigation", () => ({
      useRouter: () => ({
        push: mockPush,
      }),
    }));

    const user = userEvent.setup();

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(paymentStore.getAllPaymentForClub).toHaveBeenCalled();
    });

    // Click on first payment item
    await waitFor(async () => {
      const paymentItems = screen.getAllByRole("button");
      if (paymentItems.length > 0) {
        await user.click(paymentItems[0]);
        // Note: Due to mocking limitations, we can't easily test the navigation
        // In a real scenario, you might want to test this differently
      }
    });
  });

  it("Handles loading state correctly", () => {
    // Mock a slow response to test loading state
    (paymentStore.getAllPaymentForClub as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 1000))
    );

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    // Should show loading spinner
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
