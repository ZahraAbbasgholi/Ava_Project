import * as Router from "react-router-dom";
import SpeechConversion from "./components/SpeechConversion/SpeechConversion.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Archive from './components/Archive/Archive.jsx';

function App() {

  return (
    <>
      <Router.BrowserRouter>
        <Router.Routes>
          <Router.Route path="/" element={<SpeechConversion />}>
            {" "}
          </Router.Route>
          <Router.Route path="/archive" element={<Archive />}>
            {" "}
          </Router.Route>
        </Router.Routes>
      </Router.BrowserRouter>
    </>
  )
}

export default App
