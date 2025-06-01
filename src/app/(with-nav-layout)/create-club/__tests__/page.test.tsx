import { render, screen } from "@testing-library/react";
import CreateClubPage from "../page";
import WrapperContext from "@/app/wrapper";
import CreateClubForm from "../_components/CreateClubForm";

// Mock dependencies
jest.mock("../_components/CreateClubForm", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Create Club Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CreateClubForm as jest.Mock).mockImplementation(() => <div data-testid="mock-create-club-form" />);
  });

  it("renders the CreateClubForm component", () => {
    render(
      <WrapperContext>
        <CreateClubPage />
      </WrapperContext>
    );

    // Verify that the container is rendered with expected styling
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
    
    // Verify that the CreateClubForm component is rendered
    expect(screen.getByTestId("mock-create-club-form")).toBeInTheDocument();
  });

  it("sets correct container styles", () => {
    render(
      <WrapperContext>
        <CreateClubPage />
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
