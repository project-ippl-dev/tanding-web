import PageTitleSection from "@/components/common/PageTitleSection";

export default function ClubCreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PageTitleSection title="Buat Club">
        Pastikan seluruh form terisi dengan lengkap dan jelas demi keaslian data
      </PageTitleSection>
      {children}
    </div>
  );
}
