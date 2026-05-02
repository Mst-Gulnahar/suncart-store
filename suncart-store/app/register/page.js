"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  
  // 👁️ State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoUrl = formData.get("photoUrl");
    
    const { data, error: authError } = await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
      image: photoUrl || undefined, 
      callbackURL: "/login", 
    });

    setIsPending(false);

    if (authError) {
      console.error("Registration failed:", authError);
      setError(authError.message || "An error occurred during registration."); 
    } else {
      console.log("User created successfully:", data);
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-sun/5 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-sun rounded-full opacity-20 animate-pulse"></div>

        <div className="p-10 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-dragonfruit tracking-tighter uppercase">Join the Club</h1>
            <p className="text-neutral/60 font-bold mt-2">Start your summer journey with SunCart</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 font-bold text-sm animate-bounce">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label font-black text-xs uppercase tracking-widest text-neutral/50">Full Name</label>
              <input 
                name="name" 
                type="text" 
                placeholder="Full Name" 
                className="input input-bordered rounded-2xl border-2 focus:border-tangerine outline-none" 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label font-black text-xs uppercase tracking-widest text-neutral/50">Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered rounded-2xl border-2 focus:border-tangerine outline-none" 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label font-black text-xs uppercase tracking-widest text-neutral/50">Photo URL (Optional)</label>
              <input 
                name="photoUrl" 
                type="url" 
                placeholder="https://..." 
                className="input input-bordered rounded-2xl border-2 focus:border-tangerine outline-none" 
              />
            </div>

            <div className="form-control">
              <label className="label font-black text-xs uppercase tracking-widest text-neutral/50">Create Password</label>
              <div className="relative">
                <input 
                  name="password" 
                  // 🔄 Toggle between password and text
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="input input-bordered w-full rounded-2xl border-2 focus:border-tangerine outline-none pr-12" 
                  required 
                />
                {/* 👁️ Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 hover:text-dragonfruit transition-colors"
                >
                  {showPassword ? (
                    <span className="text-xs font-black uppercase tracking-tighter">Hide</span>
                  ) : (
                    <span className="text-xs font-black uppercase tracking-tighter">Show</span>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className={`btn btn-block bg-dragonfruit hover:bg-tangerine border-none text-white rounded-2xl font-black text-lg mt-4 shadow-lg shadow-dragonfruit/20 transition-all ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : "Create Account 🌴"}
            </button>
          </form>

          <div className="divider font-bold text-neutral/30 my-8 uppercase text-xs tracking-[0.2em]">Or Sign Up With</div>

          <button 
            type="button"
            onClick={() => authClient.signIn.social({ provider: "google" })}
            className="btn btn-block btn-outline rounded-2xl border-2 border-neutral/10 hover:bg-neutral hover:text-white font-black group"
          >
            <span className="group-hover:scale-110 transition-transform">Google</span>
          </button>

          <p className="text-center mt-8 font-bold text-sm text-neutral/60">
            Already a member? <Link href="/login" className="text-tangerine hover:underline decoration-2">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}