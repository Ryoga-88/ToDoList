// import Header from "./components/Header";
// import Search from "./components/Search";
"use client";
import React, { useState } from "react";
import Login from "./login/page";

export default function MainPage() {
  return (
    <>
      <Login />
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/createtodo" element={<CreateToDo />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //     <Route path="/logout" element={<Logout />}></Route>
    //   </Routes>
    //   {/* <div className="bg-black">
    //     <Header />
    //   </div>

    //   <Search /> */}
    // </Router>
  );
}
