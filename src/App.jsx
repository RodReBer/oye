import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, JuegoUno } from "./routes/index"

const routes = [
  { path: '/', element: <Home /> },
  { path: '/juego-uno', element: <JuegoUno /> },
];

const App = () => {
  const routeElements = routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))
  return (
    <>
      <div className="h-full">
        <BrowserRouter>
          <Routes>{routeElements}</Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
