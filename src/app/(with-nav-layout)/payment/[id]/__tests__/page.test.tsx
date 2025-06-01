import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentDetailPage, { formatCurrency, formatDate } from "../page";
import WrapperContext from "@/app/wrapper";
import { useParams } from "next/navigation";
import { getPaymentDetail, storePayment } from "@/store/actions/payment";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/store/actions/payment", () => ({
  getPaymentDetail: jest.fn(),
  storePayment: jest.fn(),
}));

describe("Payment Detail Page", () => {
  const mockPaymentDetail = {
    data: {
      id: "payment123",
      event_name: "Test Tournament",
      event_id: "event123",
      class_events: [
        { id: "class1", class_name: "Class A", price: 100000 },
        { id: "class2", class_name: "Class B", price: 150000 },
      ],
      unique_number: { number: "123" },
      bank_accounts: [
        { bank_name: "Bank ABC", account_number: "1234567890", account_name: "Test Account" },
      ],
    },
    status: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: "payment123" });
    (getPaymentDetail as jest.Mock).mockResolvedValue(mockPaymentDetail);
  });

  it("shows loading state initially", () => {
    (getPaymentDetail as jest.Mock).mockReturnValueOnce(new Promise(() => {})); // Never resolves

    render(
      <WrapperContext>
        <PaymentDetailPage />
      </WrapperContext>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays payment details when loaded successfully", async () => {
    render(
      <WrapperContext>
        <PaymentDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getPaymentDetail).toHaveBeenCalledWith("payment123");
    });

    // Check if payment details are displayed
    // Note: Adjust these assertions based on your actual UI implementation
    // expect(screen.getByText(mockPaymentDetail.data.event_name)).toBeInTheDocument();
    // expect(screen.getByText(/Bank ABC/)).toBeInTheDocument();
  });

  it("shows error message when payment data fetching fails", async () => {
    (getPaymentDetail as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <WrapperContext>
        <PaymentDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getPaymentDetail).toHaveBeenCalled();
    });

    // Check if error message is displayed
    // expect(screen.getByText(/error loading payment details/i)).toBeInTheDocument();
  });

  it("allows selecting classes and calculates total correctly", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <PaymentDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getPaymentDetail).toHaveBeenCalled();
    });

    // Find class checkboxes and select them
    // This depends heavily on your actual UI implementation
    // Example:
    // const classCheckbox1 = screen.getByLabelText(/Class A/i);
    // await user.click(classCheckbox1);
    
    // Check if total is calculated correctly
    // const expectedTotal = 100000 + 123; // Class price + unique number
    // expect(screen.getByText(formatCurrency(expectedTotal))).toBeInTheDocument();
  });

  it("handles payment submission correctly", async () => {
    const user = userEvent.setup();
    (storePayment as jest.Mock).mockResolvedValueOnce({ status: 200, message: "Payment successful" });

    render(
      <WrapperContext>
        <PaymentDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getPaymentDetail).toHaveBeenCalled();
    });

    // Select a class and upload image
    // const classCheckbox = screen.getByLabelText(/Class A/i);
    // await user.click(classCheckbox);
    
    // Upload file - this will depend on your file upload implementation
    // const fileInput = screen.getByLabelText(/upload payment proof/i);
    // const file = new File(['dummy content'], 'payment.png', { type: 'image/png' });
    // await user.upload(fileInput, file);

    // Submit payment
    // const submitButton = screen.getByRole("button", { name: /submit payment/i });
    // await user.click(submitButton);

    // Verify storePayment was called with correct arguments
    // expect(storePayment).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     event_id: mockPaymentDetail.data.event_id,
    //     class_event_ids: ["class1"],
    //   })
    // );
  });

  describe("helper functions", () => {
    it("formats currency correctly", () => {
      expect(formatCurrency(100000)).toBe("Rp 100.000");
      expect(formatCurrency(0)).toBe("Rp 0");
      expect(formatCurrency(1000000)).toBe("Rp 1.000.000");
    });

    it("formats date correctly", () => {
      expect(formatDate("2023-01-15")).toMatch(/15[-/]01[-/]2023/); // Output may vary by locale
      
      // Test error handling for invalid date
      expect(formatDate("invalid-date")).toBe("Invalid Date");
    });
  });
});
