import { render, screen } from '@testing-library/react';
import LoginPage from '../page';
import WrapperContext from '@/app/wrapper';

// Mock the LoginForm component
jest.mock('@/components/LoginForm', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-login-form">Login Form</div>,
  };
});

describe('Login Page', () => {
  it('renders the login page with the correct layout', () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    // Check if the LoginForm is rendered
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();
    expect(screen.getByText('Login Form')).toBeInTheDocument();

    // Check if the illustration is displayed (only on medium and above screens)
    const illustration = screen.getByAltText('Illustration');
    expect(illustration).toBeInTheDocument();
    
    // Basic layout checks
    const boxes = screen.getAllByRole('presentation'); // MUI Box elements typically have role="presentation"
    expect(boxes.length).toBeGreaterThanOrEqual(3); // Main container + illustration container + form container
  });

  it('has responsive layout structure', () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    // Main container should be a flex container
    const mainContainer = screen.getAllByRole('presentation')[0];
    expect(mainContainer).toHaveStyle({
      display: 'flex',
      minHeight: '100vh',
    });

    // Illustration container should exist and have the correct background color
    const illustrationContainer = screen.getAllByRole('presentation')[1];
    expect(illustrationContainer).toHaveStyle({
      backgroundColor: '#e3f2fd',
    });
  });
});
