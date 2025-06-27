// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import policeLogo from "../assets/police-logo.png"

// const Register = () => {
//   const [name, setName] = useState("")
//   const [mobile, setMobile] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const navigate = useNavigate()

//   const handleRegister = (e) => {
//     e.preventDefault()
//     if (password === confirmPassword) {
//       // Add actual register logic here
//       const userData = {
//         name,
//         mobile,
//         email,
//         password,
//       }
//       console.log("User Registered:", userData)
//       navigate("/app")
//     } else {
//       alert("Passwords do not match")
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1e7d0] text-[#5c4520] p-6">
//       <div className="flex flex-col items-center gap-4 w-full max-w-sm border border-[#c2a76b] rounded-lg p-6 shadow-lg bg-[#f9f5eb]">
//         <img src={policeLogo} alt="Police Logo" className="w-16 h-16 rounded-full shadow-md" />
//         <h2 className="text-3xl font-bold">Register</h2>

//         <form onSubmit={handleRegister} className="w-full flex flex-col gap-4 mt-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Mobile Number"
//             className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             required
//             pattern="[0-9]{10}"
//             title="Enter a valid 10-digit mobile number"
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
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

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="p-3 rounded-lg border border-[#c2a76b] focus:outline-none focus:ring-2 focus:ring-[#c2a76b]"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="bg-[#c2a76b] hover:bg-[#b09257] text-white font-semibold py-2 rounded-full shadow-md"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register
// Updated Register.jsx with Formik & Yup integration
import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { signupApiCall } from  "../utils/api"
import policeLogo from "../assets/police-logo.png"

const Register = () => {
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password")
  })

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const payload = {
        name: values.name,
        username: values.mobile,
        email: values.email,
        password: values.password
      }
      await signupApiCall(payload, "users")
      navigate("/app")
    } catch (error) {
      setErrors({ email: "User already exists or server error" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1e7d0] text-[#5c4520] p-6">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm border border-[#c2a76b] rounded-lg p-6 shadow-lg bg-[#f9f5eb]">
        <img src={policeLogo} alt="Police Logo" className="w-16 h-16 rounded-full shadow-md" />
        <h2 className="text-3xl font-bold">Register</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-full flex flex-col gap-4 mt-4">
              <Field name="name" placeholder="Full Name" className="p-3 rounded-lg border" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

              <Field name="mobile" placeholder="Mobile Number" className="p-3 rounded-lg border" />
              <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />

              <Field name="email" type="email" placeholder="Email" className="p-3 rounded-lg border" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

              <Field name="password" type="password" placeholder="Password" className="p-3 rounded-lg border" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

              <Field name="confirmPassword" type="password" placeholder="Confirm Password" className="p-3 rounded-lg border" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

              <button type="submit" disabled={isSubmitting} className="bg-[#c2a76b] hover:bg-[#b09257] text-white font-semibold py-2 rounded-full shadow-md">
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register
