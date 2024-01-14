import { Route, Routes } from "react-router-dom";
import { FormWrapper, HistoryOfUpdates, UserList } from "./components";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="form" element={<FormWrapper />} />
          <Route path="list" element={<UserList />} />
          <Route
            path="history/:pasport"
            element={
              <ProtectedRoute>
                <HistoryOfUpdates />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
