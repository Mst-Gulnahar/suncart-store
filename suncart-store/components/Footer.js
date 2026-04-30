import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-sun text-neutral rounded-t-[3rem] mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-sm">
              SUN<br />CART
            </h2>
            <p className="text-neutral/80 font-bold italic max-w-xs">
              Your ultimate destination for summer essentials. Stay cool, stay protected, and shine bright.
            </p>
            <div className="flex gap-4 mt-2">
              {/* Social Links using Dragonfruit for high contrast against Sun */}
              <a href="#" className="w-10 h-10 rounded-full bg-dragonfruit flex items-center justify-center hover:bg-tangerine transition-all hover:scale-110 shadow-lg">
                <span className="text-white font-black text-xs">FB</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dragonfruit flex items-center justify-center hover:bg-tangerine transition-all hover:scale-110 shadow-lg">
                <span className="text-white font-black text-xs">IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dragonfruit flex items-center justify-center hover:bg-tangerine transition-all hover:scale-110 shadow-lg">
                <span className="text-white font-black text-xs">TW</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-black text-dragonfruit uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4 font-black text-neutral/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="font-black text-dragonfruit uppercase tracking-widest mb-6">Contact Info</h3>
            <ul className="flex flex-col gap-4 font-black text-neutral/70">
              <li className="flex flex-col">
                <span className="text-[10px] uppercase text-white bg-tangerine w-fit px-2 py-0.5 rounded-md mb-1">Email us</span>
                hello@suncart.com
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase text-white bg-tangerine w-fit px-2 py-0.5 rounded-md mb-1">Visit us</span>
                123 Beach Blvd, Miami, FL
              </li>
            </ul>
          </div>

          {/* Privacy & Legal Column */}
          <div>
            <h3 className="font-black text-dragonfruit uppercase tracking-widest mb-6">Legal</h3>
            <ul className="flex flex-col gap-4 font-black text-neutral/70">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black text-neutral/50 uppercase tracking-[0.2em]">
          <p>© 2026 SUN CART. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Made with <span className="text-dragonfruit animate-pulse">❤️</span> for Summer
          </p>
        </div>
      </div>
    </footer>
  );
}