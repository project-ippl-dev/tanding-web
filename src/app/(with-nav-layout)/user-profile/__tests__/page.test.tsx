import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context";
import userEvent from "@testing-library/user-event"; // Tidak digunakan di tes spesifik ini
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "../page";
import { userProfileData } from "@/store/profile";
import * as profileStore from "@/store/actions/profile";



describe("Menguji rendering halaman user profile",()=>{
  it('Menampilkan DialogProfileBasic saat tombol edit diklik', async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);
        // Memastikan form edit di render
    expect(screen.getByRole("button", { name: /simpan/i })).toBeInTheDocument();
  });


  it("Menampilkan notifikasi 'data kosong' saat tombol edit diklik dan fail fetch", async () => {
    (profileStore.getProfileData as jest.Mock).mockRejectedValueOnce(new Error("Error fetching data"));

    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(profileStore.getProfileData).toHaveBeenCalled();
    })

        expect(screen.getByText(/Gagal memuat data/i)).toBeInTheDocument();

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);
  })

  it("Menampilkan halaman secara normal", async () => {


    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByText(userProfileData.data.name)).toBeInTheDocument());
  });
  

  it("Menangani error saat memuat data dan menampilkan notifikasi", async () => {
    (profileStore.getProfileData as jest.Mock).mockRejectedValueOnce(new Error("Error fetching data"));
    render(
      <AuthProvider>
        <NotificationProvider> {/* UserProfile dibungkus dengan NotificationProvider */}
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );
    await waitFor(() => {
      // Memastikan notifikasi error muncul dengan pesan yang benar
      expect(screen.getByText("Gagal memuat data profil")).toBeInTheDocument();
    });
  });

  it("Menampilkan tulisan update profile saat, can_participate false", async () => {
    const editedResponse = {...userProfileData}
    editedResponse.data.can_participate = false;

    (profileStore.updateProfileData as jest.Mock).mockResolvedValueOnce(editedResponse);

    render(
      <AuthProvider>
        <NotificationProvider>
          <UserProfile />
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByText("Update Profile Sekarang")).toBeInTheDocument());
  });

})

