import products from '../../../data/products.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProductDetails({ params }) {
  // In Next.js 15+, params is a Promise that must be awaited
  const { id } = await params;

  // Find the product based on the awaited ID
  const product = products.find((p) => p.id.toString() === id);

  // If product doesn't exist, throw 404
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 font-black text-tangerine hover:text-dragonfruit transition-colors mb-8 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* 📸 Image Section - Constrained Size */}
        <div className="relative group max-w-xl mx-auto lg:mx-0 w-full">
          {/* Decorative Background Blobs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-sun/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-raspberry/10 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Constrained Container: aspect-square and max-height prevents the "too big" feeling */}
          <div className="relative overflow-hidden rounded-[4rem] border-4 border-white shadow-2xl bg-white aspect-square max-h-[500px] md:max-h-[600px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* 📝 Content Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="badge border-none bg-sun text-white font-black px-4 py-3 mb-4 uppercase tracking-widest text-xs">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-neutral leading-none tracking-tighter mb-2">
              {product.name}
            </h1>
            <p className="text-tangerine font-black text-xl uppercase tracking-widest italic">
              By {product.brand}
            </p>
          </div>

          {/* Pricing & Rating Row */}
          <div className="flex items-center gap-8 mb-10">
            <div className="text-5xl font-black text-dragonfruit">
              ${product.price}
            </div>
            <div className="h-12 w-[2px] bg-gray-200 rotate-12"></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-sun text-2xl">
                {"★".repeat(Math.floor(product.rating))}
                <span className="text-gray-300">{"★".repeat(5 - Math.floor(product.rating))}</span>
              </div>
              <span className="font-bold text-gray-400 text-sm">{product.rating} / 5.0 Rating</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border-2 border-gray-50 mb-10">
            <h3 className="font-black text-neutral text-xl mb-3">Product Description</h3>
            <p className="text-gray-500 leading-relaxed font-medium italic">
              {product.description}
            </p>
          </div>

          {/* Stock & Action */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className={`px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter border-2 ${product.stock > 0 ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
              {product.stock > 0 ? `In Stock: ${product.stock} Units` : 'Out of Stock'}
            </div>
            
            <button className="flex-1 btn bg-dragonfruit hover:bg-tangerine border-none text-white h-16 rounded-3xl text-xl font-black shadow-xl shadow-dragonfruit/20 transition-all active:scale-95">
              Add to Cart — ${product.price}
            </button>
          </div>

          {/* Extra Mini-Features */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {['Free Shipping', 'Easy Returns', 'UV Protected'].map((feature, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl text-center">
                <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}