import Navbar from "../../components/Navbar/Navbar";
import LenisProvider from "../../components/LenisProvider/LenisProvider";
import Footer from "../../components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </LenisProvider>
  );
}
