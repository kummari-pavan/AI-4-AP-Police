// import React from "react"
// import policeLogo from "../assets/police-logo.png"
// import { useNavigate } from "react-router-dom"

// const WelcomePage = () => {
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1e7d0] text-[#5c4520] p-6">
//       <div className="flex flex-col items-center gap-4">
//         <img
//           src={policeLogo}
//           alt="Police Logo"
//           className="w-20 h-20 rounded-full shadow-md"
//         />

//         <h1 className="text-5xl font-bold bg-gradient-to-r from-[#c2a76b] to-[#7b5e28] bg-clip-text text-transparent">
//           Welcome to Police Mitra
//         </h1>

//         <p className="text-lg text-[#7b5e28] font-medium text-center max-w-md">
//           An AI-powered assistant for modern policing — enabling better support,
//           faster insights, and smarter responses.
//         </p>

//         <div className="flex gap-6 mt-8">
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-[#c2a76b] hover:bg-[#b09257] text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
//           >
//             Login
//           </button>

//           <button
//             onClick={() => navigate("/register")}
//             className="border border-[#c2a76b] text-[#5c4520] font-semibold py-2 px-6 rounded-full hover:bg-[#c2a76b] hover:text-white shadow-md transition-all duration-300"
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WelcomePage

import React from "react"
import policeLogo from "../assets/police-logo.png"
import ap from "../assets/ap.webp"
import cm from "../assets/cm.jfif"
import naralokesh from "../assets/naralokesh.jpg"
import { useNavigate } from "react-router-dom"

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f1e7d0] text-[#5c4520] p-6">
        <img
        src={ap}
        alt="Top Left"
        className="absolute top-4 left-4 w-20 h-20 object-cover rounded-full shadow-md"
        />

        <div className="absolute top-4 right-4 flex gap-4">
        <img
            src={cm}
            alt="Top Right 1"
            className="w-20 h-20 object-cover rounded-full shadow-md"
        />
        <img
            src={naralokesh}
            alt="Top Right 2"
            className="w-20 h-20 object-cover rounded-full shadow-md"
        />
        </div>

      <div className="flex flex-col items-center gap-4">
        <img
          src={policeLogo}
          alt="Police Logo"
          className="w-20 h-20 rounded-full shadow-md"
        />

        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#c2a76b] to-[#7b5e28] bg-clip-text text-transparent">
          Welcome to Police Mitra
        </h1>

        <p className="text-lg text-[#7b5e28] font-medium text-center max-w-md">
          An AI-powered assistant for modern policing — enabling better support,
          faster insights, and smarter responses.
        </p>

        <div className="flex gap-6 mt-8">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#c2a76b] hover:bg-[#b09257] text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-[#c2a76b] text-[#5c4520] font-semibold py-2 px-6 rounded-full hover:bg-[#c2a76b] hover:text-white shadow-md transition-all duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
