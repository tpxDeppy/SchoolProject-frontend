import Link from "next/link";
import { useState } from "react";

const AddUpdateModal = ({
  buttonTitle,
  message,
  setMessage,
  closeButtonTitle,
  linkToPage,
  pageToGo,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        type="submit"
        onClick={() => setShowModal(true)}
      >
        {buttonTitle}
      </button>

      {message && showModal && (
        <>
          <div
            data-testid="success-modal"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 pb-3 flex-auto mx-auto">
                  {/* confirmation message */}
                  <p className="text-base font-semibold text-lg leading-7 text-gray-900">
                    {message}
                  </p>
                </div>

                <div className="flex items-center justify-end p-3 mx-auto border-t border-solid border-slate-300">
                  {buttonTitle !== "Update" && (
                    <button
                      className="text-cyan-600 background-transparent font-bold px-3 py-2 text-md hover:text-gray-900 outline-none focus:outline-none mr-1 mb-1" //"bg-cyan-600 text-white font-bold text-md px-3 py-2 rounded shadow hover:bg-cyan-500 hover:text-gray-900 outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setMessage("");
                      }}
                    >
                      {closeButtonTitle}
                    </button>
                  )}
                  <Link
                    className="bg-cyan-600 text-white font-bold text-md px-3 py-2 rounded shadow hover:bg-cyan-500 hover:text-gray-900 outline-none focus:outline-none mr-1 mb-1"
                    href={linkToPage}
                    onClick={() => setShowModal(false)}
                  >
                    Go to {pageToGo}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default AddUpdateModal;
