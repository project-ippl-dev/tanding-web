import { render, screen, waitFor } from "@testing-library/react";
import PaymentPage from "../page";
import WrapperContext from "@/app/wrapper";
import { getAllPaymentForClub } from "@/store/actions/payment";

// Mock components
const mockPaymentList = () => <div data-testid="payment-list">Payment list content</div>;
const mockEmptyState = () => <div data-testid="empty-state">No payments found</div>;
const mockLoadingSpinner = () => <div data-testid="loading-spinner">Loading...</div>;

// Mock components and actions
jest.mock("@/store/actions/payment", () => ({
  getAllPaymentForClub: jest.fn(),
}));

jest.mock("../components/PaymentList", () => ({
  __esModule: true,
  default: (props) => mockPaymentList(),
}));

jest.mock("../components/EmptyState", () => ({
  __esModule: true,
  default: (props) => mockEmptyState(),
}));

jest.mock("../components/LoadingSpinner", () => ({
  __esModule: true,
  default: () => mockLoadingSpinner(),
}));

describe("Payment Page", () => {
  const mockPayments = [
    { id: "payment1", event_name: "Tournament 1", status: "pending" },
    { id: "payment2", event_name: "Tournament 2", status: "completed" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    // Never resolve the promise to keep the loading state
    (getAllPaymentForClub as jest.Mock).mockReturnValueOnce(new Promise(() => {}));

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("displays payment list when data is loaded", async () => {
    (getAllPaymentForClub as jest.Mock).mockResolvedValueOnce({
      data: mockPayments,
      status: 200,
    });

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getAllPaymentForClub).toHaveBeenCalled();
      expect(screen.getByTestId("payment-list")).toBeInTheDocument();
    });
  });

  it("displays empty state when no payments are available", async () => {
    (getAllPaymentForClub as jest.Mock).mockResolvedValueOnce({
      data: [],
      status: 200,
    });

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getAllPaymentForClub).toHaveBeenCalled();
      expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    });
  });

  it("shows error message when payment fetching fails", async () => {
    (getAllPaymentForClub as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <WrapperContext>
        <PaymentPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getAllPaymentForClub).toHaveBeenCalled();
      // Check if error message is displayed
      // You may need to adjust this selector based on your error UI
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });
  });
});
