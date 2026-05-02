"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const newName = formData.get("name");
    const newImage = formData.get("image");

    await authClient.updateUser({
      name: newName,
      image: newImage,
    }, {
      onSuccess: () => {
        router.push("/profile");
        router.refresh();
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-dragonfruit/5 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl border-4 border-dragonfruit p-10">
        <h2 className="text-3xl font-black text-dragonfruit mb-8 tracking-tighter uppercase text-center">
          Refresh Your Glow
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="form-control">
            <label className="label font-black text-xs uppercase text-neutral/40">New Display Name</label>
            <input 
              name="name" 
              defaultValue={session?.user?.name}
              className="input input-bordered bg-gray-50 rounded-2xl border-2 focus:border-dragonfruit" 
              placeholder="Enter your name"
              required 
            />
          </div>

          <div className="form-control">
            <label className="label font-black text-xs uppercase text-neutral/40">Photo URL</label>
            <input 
              name="image" 
              defaultValue={session?.user?.image}
              className="input input-bordered bg-gray-50 rounded-2xl border-2 focus:border-dragonfruit" 
              placeholder="https://..."
              required 
            />
          </div>

          <button 
            disabled={loading}
            className="btn btn-block bg-dragonfruit text-white border-none rounded-2xl font-black text-lg h-16 shadow-lg shadow-dragonfruit/20"
          >
            {loading ? "Updating..." : "Save Changes 🌴"}
          </button>
        </form>
      </div>
    </div>
  );
}