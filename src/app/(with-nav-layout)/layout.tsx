import Footer from "@/components/Footer/Footer";
import NavigationWrapper from "@/components/navbar/NavigationWrapper";

export default function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationWrapper>
      <main>{children}</main>
      <Footer />
    </NavigationWrapper>
  );
}
