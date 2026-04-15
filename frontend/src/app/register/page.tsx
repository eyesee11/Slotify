import Link from "next/link";
import { motion } from "framer-motion";

const SLOTIFY_BLUE = "#0069FF";

const SlotifyLogo = () => (
  <Link href="/" className="flex items-center gap-2 mb-8">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill={SLOTIFY_BLUE} />
      <path
        d="M20.5 10.5C18.8 9.5 16.8 9 14.8 9.3C11.3 9.8 8.5 12.8 8.5 16.5C8.5 20.5 11.8 23.5 16 23.5C17.5 23.5 18.9 23 20 22.2"
        stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      <path d="M20 14L23.5 16.5L20 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-bold text-[22px] tracking-tight" style={{ color: SLOTIFY_BLUE }}>
      Slotify
    </span>
  </Link>
);

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-32 relative z-10 bg-white">
        <div className="mx-auto w-full max-w-[420px]">
          <SlotifyLogo />
          
          <h2 className="mt-8 text-3xl font-extrabold text-slate-900 mb-2">Create your account</h2>
          <p className="text-sm text-gray-500 mb-8">
            Start scheduling meetings without the back-and-forth emails.
          </p>

          <div className="space-y-4">
            <button className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-all">
              <span className="text-[20px]">🌍</span>
              Sign up with Google
            </button>
            <button className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-all">
               <div className="grid grid-cols-2 gap-[1px] w-[18px] h-[18px] pointer-events-none">
                  <div className="bg-[#f25022]" />
                  <div className="bg-[#7fba00]" />
                  <div className="bg-[#00a4ef]" />
                  <div className="bg-[#ffb900]" />
               </div>
              Sign up with Microsoft
            </button>
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-400">or sign up with email</span>
            </div>
          </div>

          <form className="mt-8 space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0069FF] focus:border-[#0069FF] sm:text-sm transition-colors"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  placeholder="Create a password"
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0069FF] focus:border-[#0069FF] sm:text-sm transition-colors"
                />
              </div>
            </div>
            
            <div className="text-[13px] text-gray-500 leading-relaxed">
              By creating an account, you agree to our <a href="#" className="text-[#0069FF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0069FF] hover:underline">Privacy Policy</a>.
            </div>

            <div>
              <Link href="/event-types">
              <button
                type="button"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#0069FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0069FF] transition-all hover:shadow-lg hover:shadow-blue-500/30"
              >
                Create Account
              </button>
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center text-[13px]">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/login" className="font-semibold text-[#0069FF] hover:text-blue-700">
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side background visual */}
      <div className="hidden lg:block relative flex-1 overflow-hidden bg-[#0A2540]">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/30 mix-blend-multiply" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[140px] opacity-30 mix-blend-screen" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[150px] opacity-40 mix-blend-screen" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-24 z-10 pb-20">
           <h2 className="text-4xl lg:text-[52px] font-bold text-white leading-[1.1] mb-6">
             Your time is<br/>valuable.
           </h2>
           <p className="text-xl text-cyan-100/80 mb-12 max-w-[420px]">
             We make scheduling the easiest part of your work day. Share your link and let people book when it works for both of you.
           </p>

           <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full max-w-[440px]">
             <div className="flex gap-4">
                 <div className="text-[28px]">🚀</div>
                 <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Get started in seconds</h4>
                    <p className="text-cyan-100/70 text-sm">Sign up, connect your calendar, and you're ready to share your link with the world.</p>
                 </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
