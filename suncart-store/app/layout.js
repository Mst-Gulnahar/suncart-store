import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/NavBar"; // Import the new Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SunCart | Summer Essentials",
  description: "Your one-stop shop for summer vibes and skincare.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="suncart" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-28"> {/* Added pt-28 to clear the fixed navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}