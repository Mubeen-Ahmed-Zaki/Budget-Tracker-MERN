import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </>
  );
};

export default App;
