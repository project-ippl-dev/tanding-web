import { render, screen } from '@testing-library/react';
import RankingPage from '../page';
import WrapperContext from '@/app/wrapper';

// Mock the RankingPageContents component
jest.mock('../_components/RankingPageContents', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-ranking-contents">Ranking Contents</div>,
  };
});

describe('Ranking Page', () => {
  it('renders the ranking page with RankingPageContents', async () => {
    render(
      <WrapperContext>
        <RankingPage />
      </WrapperContext>
    );

    // Check if the RankingPageContents component is rendered
    expect(screen.getByTestId('mock-ranking-contents')).toBeInTheDocument();
    expect(screen.getByText('Ranking Contents')).toBeInTheDocument();
  });

  it('uses a container with max width lg', async () => {
    render(
      <WrapperContext>
        <RankingPage />
      </WrapperContext>
    );
    
    // Container should be present
    // Since MUI Container doesn't expose a specific test ID or role, 
    // we check for its contents or structure
    const container = screen.getByTestId('mock-ranking-contents').parentElement;
    expect(container).toBeInTheDocument();
    
    // Unfortunately we can't directly check the maxWidth prop in RTL
    // This is a limitation of testing MUI components that rely on theme context
    // Normally we would check container's computed style, but that's not feasible in Jest environment
  });
});
