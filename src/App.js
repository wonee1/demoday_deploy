// import React from "react";
// import HomePage from "./pages/HomePage";

// function App() {
//   return (
//     <div className="App">
//       <HomePage />
//     </div>
//   );
// }

// export default App;
// src/App.js
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateGroupPage from "./pages/CreateGroupPage";
import PrivateAccessPage from "./pages/PrivateAccessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route
          path="/groups/:groupId/private-access"
          element={<PrivateAccessPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
