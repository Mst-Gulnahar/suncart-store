import Link from 'next/link';
import products from '../data/products.json';

export default function Popular() {
  // Show exactly 3 popular products
  const popularProducts = products.slice(0, 3);

  const brands = [
    { name: "SunShade", logo: "🕶️", desc: "Premium Eye Protection" },
    { name: "GlowGuard", logo: "🧴", desc: "Eco-Friendly Skincare" },
    { name: "IslandVibe", logo: "🏝️", desc: "Ethical Summer Wear" },
    { name: "AquaCarry", logo: "🎒", desc: "Waterproof Tech" }
  ];

  return (
    <section className="space-y-24 mb-20">
      
      {/* 🔥 POPULAR PRODUCTS SECTION */}
      <div>
        <div className="flex flex-col mb-12 px-4">
          <span className="text-tangerine font-bold uppercase tracking-widest text-sm mb-2">Trending Now</span>
          <h2 className="text-5xl font-black tracking-tighter text-dragonfruit">🔥 Popular Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-[3rem] p-6 shadow-sm border-2 border-transparent hover:border-sun transition-all duration-500">
               <div className="overflow-hidden rounded-[2.5rem] mb-6 aspect-square relative">
                  <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
               </div>
               <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-2xl text-neutral leading-tight">{product.name}</h3>
                  <span className="text-2xl font-black text-dragonfruit">${product.price}</span>
               </div>
               <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-5 mt-4">
                  <div className="flex items-center gap-1.5 font-black text-sun bg-sun/10 px-3 py-1 rounded-full text-sm">
                      <span>★</span> {product.rating}
                  </div>
                  <Link href={`/products/${product.id}`} className="btn bg-dragonfruit border-none text-white rounded-2xl px-6 hover:bg-tangerine transition-colors">
                      View Details
                  </Link>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* ➕ EXTRA SECTION: SUMMER CARE TIPS */}
      <div className="bg-sun/20 rounded-[4rem] p-12 border-4 border-dashed border-sun/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-4xl font-black text-dragonfruit mb-6">☀️ Summer Care Tips</h2>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="bg-sun p-2 rounded-lg text-xl">💧</span>
                        <p className="text-neutral font-medium"><b>Hydration is Key:</b> Drink at least 3 liters of water to keep your skin glowing.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="bg-sun p-2 rounded-lg text-xl">🧴</span>
                        <p className="text-neutral font-medium"><b>SPF Always:</b> Reapply sunscreen every 2 hours, even on cloudy days.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="bg-sun p-2 rounded-lg text-xl">👒</span>
                        <p className="text-neutral font-medium"><b>Seek Shade:</b> Wear wide-brimmed hats during peak sun hours (10 AM - 4 PM).</p>
                    </li>
                </ul>
            </div>
            <div className="hidden lg:block bg-white rounded-[3rem] p-8 shadow-inner">
                <p className="italic text-tangerine font-bold text-center">"A little glow is fine, but protection is divine! ✨"</p>
            </div>
        </div>
      </div>

      {/* 🏆 TOP BRANDS SECTION */}
      <div>
        <h2 className="text-center text-3xl font-black text-dragonfruit mb-10 tracking-tight underline decoration-sun decoration-4 underline-offset-8">
            Our Top Brands
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div key={index} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow group">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{brand.logo}</div>
                <h4 className="font-black text-xl text-neutral">{brand.name}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}