"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/", 
    });

    if (authError) {
      setError(authError.message || "Invalid email or password");
      setLoading(false);
    } else {
      console.log("Login successful:", data);
      router.push("/"); 
      router.refresh(); 
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-sun/5 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl border-4 border-sun overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-sun rounded-full opacity-20 animate-pulse"></div>

        <div className="p-10 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-dragonfruit tracking-tighter uppercase">Welcome Back</h1>
            <p className="text-neutral/60 font-bold mt-2">The sun missed you!</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 font-bold text-sm animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="form-control">
              <label className="label font-black text-xs uppercase tracking-widest text-neutral/40 text-left">Your Email</label>
              <input 
                name="email" 
                type="email" 
                placeholder="nima@example.com" 
                className="input input-bordered bg-gray-50 rounded-2xl border-2 focus:border-sun outline-none transition-all" 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label font-black text-xs uppercase tracking-widest text-neutral/40 text-left">Password</label>
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered bg-gray-50 rounded-2xl border-2 focus:border-sun outline-none transition-all" 
                required 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`btn btn-block bg-sun hover:bg-tangerine border-none text-neutral font-black text-lg shadow-lg shadow-sun/20 rounded-2xl transition-all ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : 'Sign In ☀️'}
            </button>
          </form>

          <div className="divider my-8 font-bold text-neutral/20 text-xs tracking-widest uppercase">OR SOCIAL LOGIN</div>

          <button 
            onClick={handleGoogleLogin}
            type="button"
            className="btn btn-block bg-white border-2 border-neutral/10 rounded-2xl font-black shadow-sm hover:bg-neutral hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">Continue with Google</span>
          </button>

          <p className="text-center mt-10 font-bold text-sm text-neutral/60">
            New to SunCart? <Link href="/register" className="text-dragonfruit hover:underline decoration-2">Create an Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}