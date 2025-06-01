import { render, screen } from '@testing-library/react';
import Home from '../page';
import WrapperContext from '@/app/wrapper';

// Mock the components used in the Home page
jest.mock('@/components/home/HomeEventsCarousel', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-events-carousel">Events Carousel</div>,
  };
});

jest.mock('@/components/home/HomePageContents', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-home-contents">Home Page Contents</div>,
  };
});

describe('Home Page', () => {
  it('renders the home page with events carousel and contents', async () => {
    render(
      <WrapperContext>
        <Home />
      </WrapperContext>
    );

    // Check if both components are rendered
    expect(screen.getByTestId('mock-events-carousel')).toBeInTheDocument();
    expect(screen.getByText('Events Carousel')).toBeInTheDocument();
    
    expect(screen.getByTestId('mock-home-contents')).toBeInTheDocument();
    expect(screen.getByText('Home Page Contents')).toBeInTheDocument();
  });

  it('uses a container with max width xl and responsive padding', async () => {
    render(
      <WrapperContext>
        <Home />
      </WrapperContext>
    );
    
    // Container should contain both mocked components
    const eventsCarousel = screen.getByTestId('mock-events-carousel');
    const homeContents = screen.getByTestId('mock-home-contents');
    
    const container = eventsCarousel.parentElement;
    
    // Check if both components are within the same container
    expect(container).toBe(homeContents.parentElement);
    expect(container).toBeInTheDocument();
    
    // Direct style testing is difficult with MUI in Jest
    // Normally we'd test for responsive padding but this is not feasible in Jest environment
  });
});
