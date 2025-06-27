import React, { useContext } from "react"
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa"
import { FaMessage } from "react-icons/fa6"
import { MdAddPhotoAlternate } from "react-icons/md"
import { IoMdSend } from "react-icons/io"
import { Context } from "../context/Context"
import policeLogo from "../assets/police-logo.png"

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context)

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div className="flex items-center justify-between text-xl p-5 text-[#5c4520]">
      <div className="flex items-center gap-3">
        <img src={policeLogo} alt="Police Logo" className="w-8 h-8 rounded-full" />
        <p className="font-bold">Andhra Pradhesh Police Mitra</p>
      </div>
      <FaUserCircle />
    </div>

      <div className="max-w-[900px] mx-auto">
        {!showResult ? (
          <>
            <div className="my-12 text-[56px] text-slate-500 font-semibold p-5">
              <p>
                <span className="bg-gradient-to-r from-[#c2a76b] to-[#7b5e28] bg-clip-text text-transparent">
                  Welcome, Officer.
                </span>
              </p>

              <p className="text-[#a18b61]">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                <p className="text-slate-700 text-lg">
                 Suggest top 10 crime series.
                </p>

                <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>

              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                <p className="text-slate-700 text-lg">
                  What is IPC section 302?
                </p>

                <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>

              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                <p className="text-slate-700 text-lg">
                  List top forensic labs in India."?
                </p>

                <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>

              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                <p className="text-slate-700 text-lg">
                 Summarize the FIR format.
                </p>

                <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>
            </div>
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            <div className="my-10 mx-0 flex items-center gap-5">
              <FaUserCircle className="text-3xl" />

              <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-5">
              <img src={policeLogo} alt="" className="w-8 rounded-[50%]" />

              {loading ? (
                <div className="w-full flex flex-col gap-2">
                  <hr className="rounded-md border-none bg-[#dbc9a2] bg-gradient-to-r from-[#c2a76b] via-[#ffffff] to-[#c2a76b] p-4 animate-scroll-bg" />
                  <hr className="rounded-md border-none bg-[#dbc9a2] bg-gradient-to-r from-[#c2a76b] via-[#ffffff] to-[#c2a76b] p-4 animate-scroll-bg" />
                  <hr className="rounded-md border-none bg-[#dbc9a2] bg-gradient-to-r from-[#c2a76b] via-[#ffffff] to-[#c2a76b] p-4 animate-scroll-bg" />
                </div>

              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="text-lg font-[400] leading-[1.8]"
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
          <div className="flex items-center justify-between gap-20 bg-gray-200 py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex gap-4 items-center">
              <MdAddPhotoAlternate className="text-2xl cursor-pointer" />
              <FaMicrophone className="text-2xl cursor-pointer" />
              {input && (
                <IoMdSend
                  onClick={() => onSent()}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>

          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-600">
            Police Mitra may display inaccurate info
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainContent
