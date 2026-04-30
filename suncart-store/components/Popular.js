"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import products from '../data/products.json';

export default function Popular() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false); // New state to pause on hover
  const popularProducts = products.slice(0, 3);

  const brands = [
    { name: "SunShade", logo: "🕶️", desc: "Premium Eye Protection" },
    { name: "GlowGuard", logo: "🧴", desc: "Eco-Friendly Skincare" },
    { name: "IslandVibe", logo: "🏝️", desc: "Ethical Summer Wear" },
    { name: "AquaCarry", logo: "🎒", desc: "Waterproof Tech" }
  ];

  // ⏱️ Center Shifter Logic: Changes focus every 5 seconds
  useEffect(() => {
    if (isPaused) return; // Stop timer if user is interacting

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 5000); // 5 seconds as requested

    return () => clearInterval(interval);
  }, [isPaused]); // Restarts when hover ends

  return (
    <section 
      className="space-y-32 mb-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* 🔥 UNIQUE POPULAR PRODUCTS SHOWCASE */}
      <div className="relative py-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-sun/5 -rotate-2 rounded-[6rem] -z-10"></div>
        
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-tangerine text-white text-xs font-black uppercase tracking-[0.3em] mb-4 animate-bounce">
            Featured Deals
          </span>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-dragonfruit">
            The <span className="text-sun">Hot</span> List
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-4 px-4 min-h-[600px]">
          {popularProducts.map((product, index) => {
            const isActive = index === activeIndex;
            
            return (
              <div 
                key={product.id} 
                className={`
                  relative group w-full max-w-sm
                  transition-all duration-1000 ease-in-out
                  ${isActive 
                    ? 'lg:scale-110 z-30 lg:rotate-0' 
                    : index < activeIndex 
                      ? 'lg:scale-90 z-10 lg:-rotate-6 lg:-translate-x-4 opacity-60' 
                      : 'lg:scale-90 z-10 lg:rotate-6 lg:translate-x-4 opacity-60'
                  }
                  hover:opacity-100 hover:z-40
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-tr from-sun to-tangerine rounded-[3.5rem] blur-2xl transition-opacity duration-1000 ${isActive ? 'opacity-30 animate-spin-slow' : 'opacity-0'}`}></div>

                <div className={`relative bg-white rounded-[3.5rem] p-4 shadow-2xl border-4 transition-colors duration-1000 ${isActive ? 'border-sun' : 'border-white'}`}>
                   
                   <div className={`absolute top-6 left-6 z-20 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg transition-colors duration-1000 ${isActive ? 'bg-dragonfruit' : 'bg-neutral'}`}>
                      #{index + 1}
                   </div>

                   <div className="overflow-hidden rounded-[2.8rem] aspect-[4/5] relative bg-gray-50">
                      <img 
                          src={product.image} 
                          alt={product.name} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                   </div>

                   <div className="p-6 text-center">
                      <h3 className="font-black text-2xl text-neutral mb-1 uppercase tracking-tighter">{product.name}</h3>
                      <p className="text-dragonfruit font-black text-3xl mb-4">${product.price}</p>
                      
                      <Link 
                        href={`/products/${product.id}`} 
                        className={`btn btn-block border-none text-white rounded-2xl transition-all ${isActive ? 'bg-dragonfruit hover:bg-tangerine' : 'bg-neutral hover:bg-dragonfruit'}`}
                      >
                        {isActive ? 'Grab This Deal 🔥' : 'View Details'}
                      </Link>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ➕ EXTRA SECTION: SUMMER CARE TIPS */}
      <div className="relative mx-4">
        <div className="bg-gradient-to-br from-sun/40 to-tangerine/20 rounded-[4rem] p-12 overflow-hidden">
            {/* Floating decoration */}
            <div className="absolute -top-10 -right-10 text-9xl opacity-10 rotate-12">☀️</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <h2 className="text-5xl font-black text-dragonfruit mb-8 tracking-tighter">Summer Care 101</h2>
                    <ul className="space-y-6">
                        {[
                          { icon: "💧", title: "Hydration", text: "3 liters daily for that beach-ready glow." },
                          { icon: "🧴", title: "SPF 50+", text: "Your best friend. Reapply every 2 hours." },
                          { icon: "👒", title: "Protection", text: "Hats & Shades aren't just style; they're armor." }
                        ].map((tip, i) => (
                          <li key={i} className="flex gap-5 items-center group">
                              <span className="bg-white p-4 rounded-3xl text-2xl shadow-sm group-hover:rotate-12 transition-transform">{tip.icon}</span>
                              <div>
                                <h4 className="font-black text-neutral text-lg leading-none">{tip.title}</h4>
                                <p className="text-neutral/70 font-medium text-sm mt-1">{tip.text}</p>
                              </div>
                          </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white/50 backdrop-blur-md rounded-[3rem] p-10 shadow-xl border border-white/50 text-center">
                    <p className="text-2xl italic text-dragonfruit font-black leading-relaxed">
                      "A little glow is fine,<br/>but protection is divine! ✨"
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* 🏆 TOP BRANDS SECTION */}
      <div className="px-4">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
            <h2 className="text-2xl font-black text-neutral/30 uppercase tracking-[0.4em]">Official Partners</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-gray-200"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="group relative">
                <div className="absolute inset-0 bg-sun rounded-[2.5rem] translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform"></div>
                <div className="relative bg-white p-8 rounded-[2.5rem] border-2 border-neutral flex flex-col items-center text-center transition-transform group-hover:-translate-y-1">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">{brand.logo}</div>
                    <h4 className="font-black text-xl text-neutral">{brand.name}</h4>
                    <p className="text-[10px] text-tangerine font-black uppercase tracking-widest mt-2">{brand.desc}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}