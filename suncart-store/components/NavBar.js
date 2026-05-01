"use client";
import { useState } from "react";
import Link from 'next/link';
import { authClient } from "@/lib/auth-client"; 
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsMenuOpen(false);
          router.push("/login"); 
          router.refresh();
        },
      },
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "My Profile", href: "/profile" },
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="bg-sun/90 backdrop-blur-lg border-4 border-white rounded-full px-8 py-2 shadow-2xl flex items-center justify-between">
          
          {/* 🏠 Desktop Left Links */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`font-black text-sm uppercase tracking-tighter transition-all hover:text-dragonfruit ${
                  pathname === link.href ? "text-dragonfruit" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ☀️ Center Logo */}
          <div className="flex-none px-4">
            <Link href="/">
               <div className="h-16 w-16 bg-white rounded-full p-1 border-2 border-dragonfruit flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                  <span className="text-3xl">☀️</span> 
               </div>
            </Link>
          </div>

          {/* 🔐 Desktop Right Side */}
          <div className="hidden md:flex items-center justify-end gap-4 flex-1">
            {!isPending && (
              <>
                {session ? (
                  <div className="flex items-center gap-3 bg-white/30 p-1 pr-4 rounded-full border border-white/40">
                    <div className="avatar online">
                      <div className="w-8 h-8 rounded-full ring-2 ring-white">
                        <img 
                          src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
                          alt="user" 
                        />
                      </div>
                    </div>
                    <button onClick={handleLogout} className="font-black text-white hover:text-dragonfruit text-[10px] uppercase tracking-widest">
                      Log out 🚪
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="px-6 py-2 bg-white text-sun rounded-full font-black text-sm hover:bg-dragonfruit hover:text-white transition-all">Login</Link>
                    <Link href="/register" className="px-6 py-2 border-2 border-white text-white rounded-full font-black text-sm hover:bg-white hover:text-sun transition-all">Register</Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* 📱 Mobile Menu Button (Reverted to your clean SVG style) */}
          <div className="md:hidden flex-1 flex justify-end">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white bg-dragonfruit p-2 rounded-full shadow-lg active:scale-90 transition-transform"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* 🚀 Mobile Sun Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 relative overflow-hidden bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-sun animate-in fade-in zoom-in-95 duration-300">
            {/* Background Decorative Sun */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none select-none">
              <span className="text-[250px] animate-spin-slow">☀️</span>
            </div>

            <div className="relative z-10 flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl font-black tracking-tighter uppercase transition-colors ${
                    pathname === link.href ? "text-dragonfruit" : "text-neutral/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="w-full h-1 bg-sun/20 rounded-full my-2"></div>

              {!isPending && (
                <div className="w-full flex flex-col gap-4">
                  {session ? (
                    <button 
                      onClick={handleLogout}
                      className="btn btn-block h-16 bg-dragonfruit text-white rounded-2xl font-black border-none text-lg"
                    >
                      Log Out 🚪
                    </button>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-block h-16 bg-sun text-neutral rounded-2xl font-black border-none text-lg">Login</Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-block h-16 border-4 border-sun text-sun rounded-2xl font-black text-lg">Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}