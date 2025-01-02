import { Error, Landing, Register, Login, Activation } from "./pages";
// import {
//   AddJob,
//   AllJobs,
//   Profile,
//   SharedLayout,
//   Stats,
// } from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate/:uid/:token" element={<Activation />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
