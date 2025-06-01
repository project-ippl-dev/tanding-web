import { render, screen } from "@testing-library/react";
import ClubDetailPage from "../page";
import WrapperContext from "@/app/wrapper";
import ClubDetailPageContents from "../_components/ClubDetailPageContents";

// Mock dependencies
jest.mock("../_components/ClubDetailPageContents", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Club Detail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (ClubDetailPageContents as jest.Mock).mockImplementation(() => <div data-testid="mock-club-detail-contents" />);
  });

  it("renders the ClubDetailPageContents component", () => {
    render(
      <WrapperContext>
        <ClubDetailPage />
      </WrapperContext>
    );

    // Verify that the container is rendered with expected styling
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
    
    // Verify that the ClubDetailPageContents component is rendered
    expect(screen.getByTestId("mock-club-detail-contents")).toBeInTheDocument();
  });

  it("sets correct container styles", () => {
    render(
      <WrapperContext>
        <ClubDetailPage />
      </WrapperContext>
    );

    // Check if the container has the expected MUI Container props
    const container = screen.getByRole("main");
    expect(container).toHaveStyle("max-width: 1200px"); // lg size is typically 1200px
    
    // You can add more style assertions based on your actual implementation
    // This is just a basic example
  });
});
