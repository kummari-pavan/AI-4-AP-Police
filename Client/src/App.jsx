// import React from "react"
// import Sidebar from "./components/Sidebar"
// import MainContent from "./components/MainContent"

// const App = () => {
//   return (
//     <>
//       <div className="flex animate-fadeIn duration-1000">
//         <Sidebar />
//         <MainContent />
//       </div>
//     </>
//   )
// }

// export default App
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import WelcomePage from "./components/welcomePage"
import Login from "./components/Login"
import Register from "./components/Register"
import DataTable from "./components/DataTable"


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route - Welcome Page */}
        <Route path="/" element={<WelcomePage />} />

        {/* Main Application */}
        <Route
          path="/app"
          element={
            <div className="flex animate-fadeIn duration-1000">
              <Sidebar />
              <MainContent />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Data" element={<DataTable />} />
      </Routes>
    </Router>
  )
}

export default App
