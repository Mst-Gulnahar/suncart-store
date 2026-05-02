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
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="bg-sun/90 backdrop-blur-lg border-4 border-white rounded-full px-8 py-2 shadow-2xl flex items-center justify-between">
          
          {/* 🏠 Desktop/Tablet Links */}
          <div className="hidden lg:flex items-center gap-6 flex-1">
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
            {session && (
              <Link 
                href="/profile"
                className={`font-black text-sm uppercase tracking-tighter transition-all hover:text-dragonfruit ${
                  pathname === "/profile" ? "text-dragonfruit" : "text-white"
                }`}
              >
                My Profile
              </Link>
            )}
          </div>

          {/* ☀️ Center Logo */}
          <div className="flex-none px-4">
            <Link href="/">
               <div className="h-16 w-16 bg-white rounded-full p-1 border-2 border-dragonfruit flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                  <span className="text-3xl">☀️</span> 
               </div>
            </Link>
          </div>

          {/* 🔐 Desktop/Tablet User Controls */}
          <div className="hidden lg:flex items-center justify-end gap-4 flex-1">
            {!isPending && (
              <>
                {session ? (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl p-1.5 pr-3 rounded-full border border-white/40 shadow-inner group">
                    <Link href="/profile" className="avatar online hover:scale-110 transition-transform duration-300">
                      <div className="w-9 h-9 rounded-full ring-2 ring-white shadow-md">
                        <img 
                          src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
                          alt="user" 
                        />
                      </div>
                    </Link>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-white uppercase tracking-tighter border-r border-white/20 pr-3">
                        {session.user.name.split(' ')[0]}
                      </span>
                      <button onClick={handleLogout} className="flex items-center gap-1.5 font-black text-white hover:text-dragonfruit transition-colors">
                        <span className="text-[9px] uppercase tracking-widest">Log Out</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="px-6 py-2 bg-white text-sun rounded-full font-black text-sm hover:bg-dragonfruit hover:text-white transition-all shadow-md">Login</Link>
                    <Link href="/register" className="px-6 py-2 border-2 border-white text-white rounded-full font-black text-sm hover:bg-white hover:text-sun transition-all">Register</Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* 📱 Mobile/Tablet Menu Button */}
          <div className="lg:hidden flex-1 flex justify-end">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white bg-dragonfruit p-3 rounded-full shadow-lg active:scale-90 transition-transform"
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

        {/* 🚀 Mobile/Tablet Sun Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 relative overflow-hidden bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-sun animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none select-none">
              <span className="text-[250px] animate-spin-slow">☀️</span>
            </div>

            <div className="relative z-10 flex flex-col gap-6 items-center">
              
              {/* Profile Header for Mobile/Tablet */}
              {session && (
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 mb-4">
                  <div className="avatar online">
                    <div className="w-20 h-20 rounded-full ring-4 ring-sun shadow-xl">
                       <img src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} alt="user" />
                    </div>
                  </div>
                  <span className="text-xl font-black text-sun uppercase tracking-widest">{session.user.name}</span>
                </Link>
              )}

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl font-black tracking-tighter uppercase transition-colors ${pathname === link.href ? "text-dragonfruit" : "text-neutral/80"}`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Profile Link in Mobile List */}
              {session && (
                <Link href="/profile" onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl font-black tracking-tighter uppercase transition-colors ${pathname === "/profile" ? "text-dragonfruit" : "text-neutral/80"}`}
                >
                  My Profile
                </Link>
              )}
              
              <div className="w-full h-1 bg-sun/20 rounded-full my-2"></div>

              {!isPending && (
                <div className="w-full flex flex-col gap-4">
                  {session ? (
                    <button onClick={handleLogout} className="btn btn-block h-16 bg-dragonfruit text-white rounded-2xl font-black border-none text-lg flex items-center justify-center gap-3">
                      Exit 🚪
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