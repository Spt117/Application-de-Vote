import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Accueil from "./Pages/Accueil"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "../src/App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Demo from "./Pages/Demo"
import Erreur from "./Components/Erreur"
import Navbar from "./Components/Navbar"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
   <React.StrictMode>
      <div id="divP">
         <header>
            <Navbar />
         </header>
         <Router>
            <Routes>
               <Route exact path="/Demo" element={<Demo />}></Route>
               <Route exact path="" element={<Accueil />}></Route>
               <Route path="*" element={<Erreur />}></Route>
            </Routes>
         </Router>
      </div>
   </React.StrictMode>
)

reportWebVitals()
