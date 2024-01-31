import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import SignIn from "./pages/Auth/components/SignInForm";
import SignUp from "./pages/Auth/components/SignUpForm";
import HomePage from "./pages/HomePage/HomePage";
import TopicDetails from "./pages/TopicDetails/TopicDetails";
import TopicsHomePage from "./pages/HomePage/components/TopicsHomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/features/user";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {

    const user = localStorage.getItem("dataKey");
    dispatch(login(JSON.parse(user)));
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      document.querySelector("body").setAttribute("data-theme", "dark");
      localStorage.setItem("selectedTheme", "dark");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />}>
            <Route path="" element={<TopicsHomePage />} />
            <Route path="/home/topic/:id" element={<TopicDetails />} />
            <Route path="/home/profile" element={<Profile />} />
          </Route>
          <Route path="/home/:id" element={<TopicDetails />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
