// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import policeLogo from "../assets/police-logo.png"
// import { FaLock } from "react-icons/fa"

// const Login = () => {
//   const [identifier, setIdentifier] = useState("") // for email or mobile
//   const [password, setPassword] = useState("")
//   const navigate = useNavigate()

//   const handleLogin = (e) => {
//     e.preventDefault()
    
//     // You can add logic to check if identifier is email or mobile
//     const isEmail = /\S+@\S+\.\S+/.test(identifier)
//     const isMobile = /^[0-9]{10}$/.test(identifier)

//     if (!isEmail && !isMobile) {
//       alert("Please enter a valid email or 10-digit mobile number")
//       return
//     }

//     // Add actual login logic here
//     console.log("Logging in with:", { identifier, password })
//     navigate("/app")
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1e7d0] text-[#5c4520] p-6">
//       <div className="flex flex-col items-center gap-4 w-full max-w-sm border border-[#c2a76b] rounded-lg p-6 shadow-lg bg-[#f9f5eb]">
//         <img src={policeLogo} alt="Police Logo" className="w-16 h-16 rounded-full shadow-md" />

//         <div className="flex items-center gap-2 text-3xl font-bold text-[#5c4520]">
//           <FaLock className="text-[#7b5e28]" />
//           <h2>Login</h2>
//         </div>

//         <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-4">
//           <input
//             type="text"
//             placeholder="Email or Mobile Number"
//             className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <div className="text-right mb-4">
//             <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="bg-[#c2a76b] hover:bg-[#b09257] text-white font-semibold py-2 rounded-full shadow-md"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { loginApiCall } from "../utils/api"
import policeLogo from "../assets/police-logo.png"
import { FaLock } from "react-icons/fa"

const Login = () => {
  const navigate = useNavigate()

  const initialValues = {
    identifier: "",
    password: "",
  }

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .required("Email or Mobile Number is required")
      .test("is-valid", "Enter valid email or 10-digit mobile", function (value) {
        const emailPattern = /\S+@\S+\.\S+/
        const mobilePattern = /^[0-9]{10}$/
        return emailPattern.test(value) || mobilePattern.test(value)
      }),
    password: Yup.string().required("Password is required"),
  })

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    const isEmail = /\S+@\S+\.\S+/.test(values.identifier)
    const isMobile = /^[0-9]{10}$/.test(values.identifier)

    const payload = {
      password: values.password,
      ...(isEmail ? { email: values.identifier } : { username: values.identifier }),
    }

    const response = await loginApiCall(payload, "users/login")
    localStorage.setItem("token", response.data.token)
    navigate("/app")
  } catch (error) {
    setErrors({ identifier: "Invalid credentials or server error" })
  } finally {
    setSubmitting(false)
  }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1e7d0] text-[#5c4520] p-6">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm border border-[#c2a76b] rounded-lg p-6 shadow-lg bg-[#f9f5eb]">
        <img src={policeLogo} alt="Police Logo" className="w-16 h-16 rounded-full shadow-md" />

        <div className="flex items-center gap-2 text-3xl font-bold text-[#5c4520]">
          <FaLock className="text-[#7b5e28]" />
          <h2>Login</h2>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-full flex flex-col gap-4 mt-4">
              <Field
                name="identifier"
                placeholder="Email or Mobile Number"
                className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
              />
              <ErrorMessage name="identifier" component="div" className="text-red-500 text-sm" />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

              <div className="text-right mb-4">
                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#c2a76b] hover:bg-[#b09257] text-white font-semibold py-2 rounded-full shadow-md"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
