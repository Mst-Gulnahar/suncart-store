"use client";
import Link from 'next/link';
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="bg-sun/80 backdrop-blur-md border-4 border-white rounded-full px-8 py-2 shadow-2xl flex items-center justify-between">
          
          {/* 🏠 Left Links */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            <Link href="/" className="font-black text-white hover:text-dragonfruit transition-colors tracking-tight drop-shadow-sm">
              Home
            </Link>
            <Link href="/products" className="font-black text-white hover:text-dragonfruit transition-colors tracking-tight drop-shadow-sm">
              Products
            </Link>
            <Link href="/profile" className="font-black text-white hover:text-dragonfruit transition-colors tracking-tight drop-shadow-sm">
              My Profile
            </Link>
          </div>

          {/* ☀️ Center Logo */}
          <div className="flex-none px-4">
            <Link href="/">
               <div className="relative group">
                  <div className="h-16 w-16 bg-white rounded-full p-1 border-2 border-dragonfruit flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 shadow-lg">
                    <span className="text-2xl">☀️</span> 
                  </div>
               </div>
            </Link>
          </div>

          {/* 🔐 Right Side */}
          <div className="hidden md:flex items-center justify-end gap-4 flex-1">
            {!isPending && (
              <>
                {session ? (
                  <div className="flex items-center gap-3 bg-white/20 p-1 pr-4 rounded-full border border-white/30">
                    <div className="avatar online">
                      <div className="w-8 h-8 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                        <img 
                          src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
                          alt="user" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 font-black text-white hover:text-dragonfruit text-sm transition-colors uppercase tracking-widest"
                    >
                      Log out
                      {/* 🚪 Exit Door Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="px-6 py-2 bg-white text-sun rounded-full font-black hover:bg-dragonfruit hover:text-white transition-all shadow-md"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/register" 
                      className="px-6 py-2 border-2 border-white text-white rounded-full font-black hover:bg-white hover:text-sun transition-all"
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-white bg-dragonfruit p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}