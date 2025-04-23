import PageTitleSection from "@/components/common/PageTitleSection";

export default function ClubManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PageTitleSection title="Join Club">
        Bergabung dengan club terbaik untukmu dan bermainlah bersama!
      </PageTitleSection>
      {children}
    </div>
  );
}