import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute, Team } from "./pages";
import {
  AllStories,
  Profile,
  SharedLayout,
  AddStory,
  Resources,
} from "./pages/dashboard";
import EditStory from "./pages/dashboard/EditStory";

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
          <Route path="/" element={<AllStories />} />
          <Route path="add-story" element={<AddStory />} />
          <Route path="edit-story" element={<EditStory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resources" element={<Resources />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
