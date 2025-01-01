import { Error, Landing, Register, ProtectedRoute } from "./pages";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
