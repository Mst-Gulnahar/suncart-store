import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 🪄 The Trick: Combined bg-sun/80 with backdrop-blur-md */}
        <nav className="bg-sun/80 backdrop-blur-md border-4 border-raspberry rounded-full px-8 py-2 shadow-2xl flex items-center justify-between">
          
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            <Link href="/" className="font-black text-white hover:text-raspberry transition-colors tracking-tight drop-shadow-sm">
              Home
            </Link>
            <Link href="/products" className="font-black text-white hover:text-raspberry transition-colors tracking-tight drop-shadow-sm">
              Shop
            </Link>
          </div>

          {/* Center Logo - Circular Frame */}
          <div className="flex-none px-4">
            <Link href="/">
               <div className="relative group">
                  {/* Circular White Badge for Logo */}
                  <div className="h-16 w-16 bg-white rounded-full p-1 border-2 border-raspberry flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 shadow-lg">
                    <img 
                        src="/img/logo.png" 
                        alt="SunCart Logo" 
                        className="w-full h-full object-cover rounded-full"
                    />
                  </div>
               </div>
            </Link>
          </div>

          {/* Right Links & Actions */}
          <div className="hidden md:flex items-center justify-end gap-8 flex-1">
            <Link href="/deals" className="font-black text-white hover:text-raspberry transition-colors tracking-tight drop-shadow-sm">
              Deals
            </Link>
            <div className="relative">
              <button className="btn btn-circle btn-ghost text-white hover:bg-raspberry/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}