"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    router.push("/login");
  };

  return (
    <>
      <div className="bg-teal-600 py-4 fixed top-0 left-0 w-full z-30 sm:static">
        <nav className="flex flex-wrap items-center justify-between mx-14">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigation("/home")}
              className="text-white font-bold flex items-center gap-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
                stroke="currentColor"
              >
                <path
                  d="M19 3C20.1046 3 21 3.88316 21 4.9726L21 8.33992C21 9.42936 20.1046 10.3125 19 10.3125H16C14.8954 10.3125 14 9.42936 14 8.33992L14 4.9726C14 3.88316 14.8954 3 16 3L19 3Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 3C3.89543 3 3 3.88316 3 4.9726L3.00001 8.33992C3.00001 9.42936 3.89544 10.3125 5.00001 10.3125H8.00001C9.10458 10.3125 10 9.42936 10 8.33992L10 4.9726C10 3.88316 9.10457 3 8 3L5 3Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13.6875C20.1046 13.6875 21 14.5707 21 15.6601V19.0274C21 20.1168 20.1046 21 19 21H16C14.8954 21 14 20.1168 14 19.0274L14 15.6601C14 14.5707 14.8954 13.6875 16 13.6875H19Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.00001 13.6875C3.89544 13.6875 3.00001 14.5707 3.00001 15.6601L3.00001 19.0274C3.00001 20.1168 3.89544 21 5.00001 21H8.00001C9.10458 21 10 20.1168 10 19.0274L10 15.6601C10 14.5707 9.10458 13.6875 8.00001 13.6875H5.00001Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Task Grid
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowPopup(true)}
              className="text-white font-bold"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* ポップアップ */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">ログアウトしますか？</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                いいえ
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
