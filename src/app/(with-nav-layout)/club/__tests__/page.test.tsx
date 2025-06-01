import { render, screen } from "@testing-library/react";
import ClubPage from "../page";
import WrapperContext from "@/app/wrapper";
import ClubPageContents from "../_components/ClubPageContents";

// Mock dependencies
jest.mock("..//_components/ClubPageContents", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Club Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (ClubPageContents as jest.Mock).mockImplementation(() => <div data-testid="mock-club-page-contents" />);
  });

  it("renders the ClubPageContents component", () => {
    render(
      <WrapperContext>
        <ClubPage />
      </WrapperContext>
    );

    // Verify that the container is rendered with expected styling
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
    
    // Verify that the ClubPageContents component is rendered
    expect(screen.getByTestId("mock-club-page-contents")).toBeInTheDocument();
  });

  it("sets correct container styles", () => {
    render(
      <WrapperContext>
        <ClubPage />
      </WrapperContext>
    );

    // Check if the container has the expected MUI Container props
    const container = screen.getByRole("main");
    expect(container).toHaveStyle("max-width: 1200px"); // lg size is typically 1200px
    
    // You can add more style assertions based on your actual implementation
    // Check for padding styles
    expect(container).toHaveStyle("padding-bottom: 50px");
    
    // This checks for responsive padding-top, but note that this is a simplified check
    // In an actual test, you might need to use theme-aware testing or simulate different viewport sizes
    expect(container).toHaveStyle("padding-top: 50px");
  });
});
