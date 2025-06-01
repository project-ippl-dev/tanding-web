import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OwnTournamentDetail from '../page';
import WrapperContext from '@/app/wrapper';
import * as eventStore from '@/store/actions/event';
import { EVENT } from '@/store/event';

// Mock the tab panels
jest.mock('../_components/Preview', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="preview-panel">Preview Panel</div>,
  };
});

jest.mock('../_components/Participant', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="participant-panel">Participant Panel</div>,
  };
});

jest.mock('../_components/Bracket', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="bracket-panel">Bracket Panel</div>,
  };
});

jest.mock('../_components/Setting', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="settings-panel">Settings Panel</div>,
  };
});

jest.mock('../_components/Keuangan', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="finance-panel">Finance Panel</div>,
  };
});

describe('OwnTournamentDetail Page - Main Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (eventStore.getTournamentDetail as jest.Mock).mockResolvedValue({
      ...EVENT,
      status: 200,
    });
  });

  it('renders the tournament detail correctly', async () => {
    render(
      <WrapperContext>
        <OwnTournamentDetail />
      </WrapperContext>
    );

    // Wait for the API call to complete
    await waitFor(() => {
      expect(eventStore.getTournamentDetail).toHaveBeenCalled();
    });

    // Check if tournament name is displayed
    await waitFor(() => {
      expect(screen.getByText(EVENT.data.name)).toBeInTheDocument();
    });

    // Check if the tabs are rendered
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(5); // Preview, Peserta, Braket, Keuangan, Pengaturan
  });

  it('shows error notification when tournament detail fetch fails', async () => {
    (eventStore.getTournamentDetail as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <WrapperContext>
        <OwnTournamentDetail />
      </WrapperContext>
    );

    // Wait for the API call to complete
    await waitFor(() => {
      expect(eventStore.getTournamentDetail).toHaveBeenCalled();
    });

    // Check for error notification
    await waitFor(() => {
      expect(screen.getByText(/gagal memuat detail turnamen/i)).toBeInTheDocument();
    });
  });

  it('switches between tabs correctly', async () => {
    render(
      <WrapperContext>
        <OwnTournamentDetail />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getTournamentDetail).toHaveBeenCalled();
    });

    // Check that Preview tab is active by default
    expect(screen.getByTestId('preview-panel')).toBeInTheDocument();

    // Click on Peserta tab
    const tabs = screen.getAllByRole('tab');
    await userEvent.click(tabs[1]); // Peserta tab

    // Check that Participant panel is now displayed
    await waitFor(() => {
      expect(screen.getByTestId('participant-panel')).toBeInTheDocument();
    });

    // Click on Braket tab
    await userEvent.click(tabs[2]);
    await waitFor(() => {
      expect(screen.getByTestId('bracket-panel')).toBeInTheDocument();
    });

    // Click on Keuangan tab
    await userEvent.click(tabs[3]);
    await waitFor(() => {
      expect(screen.getByTestId('finance-panel')).toBeInTheDocument();
    });

    // Click on Pengaturan tab
    await userEvent.click(tabs[4]);
    await waitFor(() => {
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
    });
  });

  it('displays tournament information properly', async () => {
    render(
      <WrapperContext>
        <OwnTournamentDetail />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(eventStore.getTournamentDetail).toHaveBeenCalled();
    });

    // Check for tournament details
    await waitFor(() => {
      const sportElement = screen.getByText(new RegExp(EVENT.data.sport_name, 'i'));
      expect(sportElement).toBeInTheDocument();
      
      // Location should be displayed
      const locationElement = screen.getByText(new RegExp(EVENT.data.location === 'online' ? 'online' : EVENT.data.location, 'i'));
      expect(locationElement).toBeInTheDocument();
      
      // Date information should be displayed (this might be formatted in the UI)
      // So we check if some date information is present
      expect(screen.getByText(/Tanggal/i)).toBeInTheDocument();
    });
  });
});
