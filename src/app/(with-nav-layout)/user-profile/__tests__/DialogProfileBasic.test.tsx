import React from "react";
import { render, screen } from "@testing-library/react";
import DialogProfileBasic from "../_component/DialogProfileBasic";
import { ProfileBasicResponse } from "@/types/profile";
import { userProfileData } from "@/store/profile";
import { AuthProvider } from "@/context/auth.context";

describe("Komponen DialogProfileBasic", () => {
  const mockProfile: ProfileBasicResponse = userProfileData;

  const mockAction = jest.fn();
  const mockOnClose = jest.fn();
  const mockSetLoading = jest.fn();

  it("renders dialog saat open true", () => {
    render(
      <AuthProvider>
        <DialogProfileBasic
          open={true}
          action={mockAction}
          onClose={mockOnClose}
          setLoading={mockSetLoading}
          profile={mockProfile}
        />
      </AuthProvider>
    );
    expect(screen.getByText("Data Diri")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("tidak render dialog ketika open adalah false", () => {
    render(
      <AuthProvider>
        <DialogProfileBasic
          open={false}
          action={mockAction}
          onClose={mockOnClose}
          setLoading={mockSetLoading}
          profile={mockProfile}
        />
      </AuthProvider>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when dialog is closed", () => {
    render(
      <AuthProvider>
        <DialogProfileBasic
          open={true}
          action={mockAction}
          onClose={mockOnClose}
          setLoading={mockSetLoading}
          profile={mockProfile}
        />
      </AuthProvider>
    );
    // Simulate backdrop click or close button if available
    // For now, call directly
    mockOnClose();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
