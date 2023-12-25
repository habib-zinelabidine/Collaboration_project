import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import SignIn from "./pages/Auth/components/SignInForm"
import SignUp from "./pages/Auth/components/SignUpForm"

function App() {

  return (
  <Router>
    <Routes>
      <Route path="/" element={< Auth />}>
        <Route path="signup" element={< SignUp />}/>
        <Route path="signin" element={< SignIn />}/>
      </Route>
    </Routes>
  </Router>
  )
}

export default App
