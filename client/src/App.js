import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import {
  AllJobs,
  Profile,
  SharedLayout,
  AddJob,
  Resources,
} from "./pages/dashboard";
import EditJob from "./pages/dashboard/EditStory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<AllJobs />} />
          <Route path="add-story" element={<AddJob />} />
          <Route path="edit-story" element={<EditJob />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resources" element={<Resources />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
