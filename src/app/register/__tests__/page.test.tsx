import { render, screen } from '@testing-library/react';
import RegisterPage from '../page';
import WrapperContext from '@/app/wrapper';

// Mock the RegisterForm component
jest.mock('@/components/RegisterForm', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-register-form">Register Form</div>,
  };
});

describe('Register Page', () => {
  it('renders the register page with the correct layout', () => {
    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    // Check if the RegisterForm is rendered
    expect(screen.getByTestId('mock-register-form')).toBeInTheDocument();
    expect(screen.getByText('Register Form')).toBeInTheDocument();

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
        <RegisterPage />
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

    // Form container should be displayed
    const formContainer = screen.getAllByRole('presentation')[2];
    expect(formContainer).toHaveStyle({
      display: 'flex',
    });
  });
});
