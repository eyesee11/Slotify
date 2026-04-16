import Link from "next/link";
import { motion } from "framer-motion";

const SLOTIFY_BLUE = "#0069FF";

const SlotifyLogo = () => (
  <Link href="/" className="flex items-center gap-2 mb-8">
    <img 
      src="/logo.png" 
      alt="Slotify Logo" 
      className="w-9 h-9 object-contain" 
    />
    <span className="font-bold text-[28px] tracking-tight" style={{ color: SLOTIFY_BLUE }}>
      Slotify
    </span>
  </Link>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-32 relative z-10 bg-white">
        <div className="mx-auto w-full max-w-[420px]">
          <SlotifyLogo />
          
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-sm font-semibold text-amber-800 mb-1">Attention Judges:</h3>
            <p className="text-sm text-amber-700">
              You don&apos;t need to input your own credentials! Dummy credentials are 
              already pre-filled so you can quickly test the application. In case you clear them:
            </p>
            <div className="mt-2 text-xs text-amber-800 bg-amber-100/50 p-2 rounded-lg font-mono font-medium">
              Email: default@example.com<br/>
              Password: admin123
            </div>
          </div>

          <h2 className="mt-8 text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">
            Log in to your account to manage your schedule.
          </p>

          <div className="space-y-4">
            <button className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-all">
              <span className="text-[20px]">🌍</span>
              Log in with Google
            </button>
            <button className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-all">
               <div className="grid grid-cols-2 gap-[1px] w-[18px] h-[18px] pointer-events-none">
                  <div className="bg-[#f25022]" />
                  <div className="bg-[#7fba00]" />
                  <div className="bg-[#00a4ef]" />
                  <div className="bg-[#ffb900]" />
               </div>
              Log in with Microsoft
            </button>
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-400">or log in with email</span>
            </div>
          </div>

          <form className="mt-8 space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  defaultValue="default@example.com"
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0069FF] focus:border-[#0069FF] sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  defaultValue="admin123"
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0069FF] focus:border-[#0069FF] sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#0069FF] focus:ring-[#0069FF] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[13px] text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-[13px]">
                <a href="#" className="font-semibold text-[#0069FF] hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Link href="/event-types">
              <button
                type="button"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#0069FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0069FF] transition-all hover:shadow-lg hover:shadow-blue-500/30"
              >
                Log in
              </button>
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center text-[13px]">
            <span className="text-gray-500">Don't have an account? </span>
            <Link href="/register" className="font-semibold text-[#0069FF] hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side background visual */}
      <div className="hidden lg:block relative flex-1 overflow-hidden bg-[#1A3A5C]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 mix-blend-multiply" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] opacity-30 mix-blend-screen" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-24 z-10 pb-20">
           <h2 className="text-4xl lg:text-[52px] font-bold text-white leading-[1.1] mb-6">
             The easiest way<br/>to schedule.
           </h2>
           <p className="text-xl text-blue-100/80 mb-12 max-w-[400px]">
             Manage your availability, speed up your workflow, and stay on top of your meetings with Slotify.
           </p>

           <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full max-w-[440px]">
             <div className="flex gap-4">
                 <div className="text-[28px]">✨</div>
                 <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Over 20M users</h4>
                    <p className="text-blue-100/70 text-sm">Join millions connecting with others through seamless scheduling.</p>
                 </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
