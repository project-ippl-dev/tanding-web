// Struktur tipe data untuk response komite event

export interface CommitteeMember {
  id: number;                // ID unik anggota komite
  role: string;              // Peran anggota dalam komite (misal: 'owner')
  user_id: string;           // UUID pengguna
  name: string;              // Nama lengkap anggota
}

export interface CommitteeResponse {
  message: string;           // Pesan status response
  data: CommitteeMember[];   // Daftar anggota komite
}



export interface CommitteeRole {
  user_id: string;
  role: "reviewer" | "contributor" | "admin"; // Tambahkan opsi lain jika diperlukan
}

export interface CreateCommitteeRoleData {
  data: CommitteeRole[];
}

