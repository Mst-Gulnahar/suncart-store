import Link from 'next/link';
import products from '../data/products.json';

export default function Home() {
  // Display all 6 products in the card section
  const allProducts = products.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
     {/* 🌅 HERO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        
        {/* Main Banner */}
        <div className="md:col-span-2 relative group overflow-hidden rounded-[3.5rem] min-h-[400px] md:min-h-[480px] bg-sun shadow-xl">
          
          {/* The Store Hood */}
          <div 
            className="absolute top-0 left-0 w-full h-16 z-20"
            style={{
              backgroundColor: '#DA1C5C', 
              maskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 20" preserveAspectRatio="none"><path d="M0,0 v10 c10,10 20,10 30,0 c10,10 20,10 30,0 c10,10 20,10 30,0 c10,10 20,10 30,0 v-10 Z" fill="black"/></svg>')`,
              maskSize: '100% 100%',
              WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 20" preserveAspectRatio="none"><path d="M0,0 v10 c10,10 20,10 30,0 c10,10 20,10 30,0 c10,10 20,10 30,0 c10,10 20,10 30,0 v-10 Z" fill="black"/></svg>')`,
              WebkitMaskSize: '100% 100%'
            }}
          ></div>

          {/* Hero Image */}
          <img 
            src="/img/hero.png" 
            alt="Summer Essentials" 
            className="absolute inset-0 w-full h-full object-cover brightness-95"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-start p-8 md:p-12 z-10">
            <span className="badge border-none bg-raspberry text-white font-bold mb-4 px-4 py-3">
              SUMMER SALE 50% OFF
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-6 drop-shadow-2xl">
              SUN<br/>CART
            </h1>
            <Link href="/products" className="btn bg-tangerine border-none text-white hover:bg-dragonfruit rounded-full px-10 md:px-12 shadow-2xl scale-105 md:scale-110">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Hot Deals */}
        <div className="md:col-span-2 lg:col-span-1 bg-sunset rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden border-4 border-white shadow-xl min-h-[300px]">
            <h2 className="text-5xl md:text-6xl font-black text-white rotate-[-8deg] drop-shadow-lg leading-tight">
                Hot <br/> Deals 🔥
            </h2>
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-sun/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-raspberry/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </section>

      {/* 📦 PRODUCT CARDS SECTION */}
      <section className="mb-20">
        <div className="flex justify-between items-baseline mb-12 px-4">
          <h2 className="text-5xl font-black tracking-tighter text-dragonfruit">Summer Essentials</h2>
          <p className="text-tangerine font-bold text-lg hidden md:block">Freshly picked for you ✨</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {allProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Outer card */}
              <div className="bg-white rounded-[3rem] p-5 shadow-sm group-hover:shadow-xl transition-all duration-500 border-2 border-transparent group-hover:border-raspberry/10 relative overflow-hidden flex flex-col flex-1">
                 
                 {/* Product Image Container */}
                 <div className="overflow-hidden rounded-[2.5rem] mb-6 aspect-square w-full relative">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                 </div>

                 {/* Content */}
                 <div className="px-3 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 mr-2">
                            <h3 className="font-black text-2xl text-neutral leading-tight line-clamp-1">{product.name}</h3>
                            <p className="text-xs font-bold text-tangerine uppercase tracking-[0.2em] mt-1">{product.brand}</p>
                        </div>
                        <span className="text-3xl font-black text-dragonfruit flex-shrink-0">${product.price}</span>
                    </div>

                    <div className="mt-auto pt-5 border-t border-dashed border-gray-200">
                      <div className="flex justify-between items-center pb-2">
                        <div className="flex items-center gap-1.5 font-black text-sun bg-sun/10 px-3 py-1 rounded-full text-sm">
                            <span>★</span> {product.rating}
                        </div>
                        <Link href={`/products/${product.id}`} className="btn bg-dragonfruit border-none text-white btn-md rounded-2xl px-8 hover:bg-tangerine transition-colors">
                            Details
                        </Link>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}