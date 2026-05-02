"use client";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Loading State
  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center bg-sun/5">
      <span className="loading loading-ring loading-lg text-sun"></span>
    </div>
  );

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sun/5 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-[4rem] shadow-2xl border-4 border-white overflow-hidden relative">
          
          {/* Top Decorative Banner */}
          <div className="h-40 bg-gradient-to-r from-sun via-tangerine to-dragonfruit"></div>
          
          <div className="px-10 pb-12 -mt-20 relative z-10 flex flex-col items-center">
            {/* Avatar with Ring Aesthetic */}
            <div className="w-40 h-40 rounded-full border-8 border-white shadow-xl overflow-hidden bg-gray-100 mb-6">
              <img 
                src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black text-neutral uppercase tracking-tighter leading-none mb-2">
                {session.user.name}
              </h1>
              <div className="badge badge-outline border-dragonfruit text-dragonfruit font-bold py-3 px-4 italic">
                {session.user.email}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-4">
              <Link 
                href="/profile/update" 
                className="btn btn-block bg-sun hover:bg-tangerine border-none text-neutral font-black text-lg rounded-2xl h-16 shadow-lg shadow-sun/20 transition-all hover:-translate-y-1"
              >
                Update Information ✨
              </Link>
              
              <Link 
                href="/" 
                className="btn btn-ghost text-neutral/40 hover:text-neutral font-bold uppercase tracking-widest text-xs"
              >
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Small Footer Detail */}
        <p className="text-center mt-8 text-neutral/20 font-black uppercase text-[10px] tracking-[0.2em]">
          SunCart Member Since 2026
        </p>
      </div>
    </div>
  );
}