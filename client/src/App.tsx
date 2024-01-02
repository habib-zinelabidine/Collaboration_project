import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import SignIn from "./pages/Auth/components/SignInForm";
import SignUp from "./pages/Auth/components/SignUpForm";
import HomePage from "./pages/HomePage/HomePage";
import TopicDetails from "./pages/TopicDetails/TopicDetails";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:id" element={<TopicDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
