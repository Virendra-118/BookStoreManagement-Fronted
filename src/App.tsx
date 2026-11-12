
// import './App.css'
// import Login from './Pages/Login'
// import Registration from './Pages/Registration'

// function App() {


//   return (
//     <>
//       <div>
//         <h1>BookStoreManagement</h1>
//         <Login/>
//         <Registration/>
        
//       </div>
//     </>
//   )
// }

// export default App



import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

 import Login from './Pages/Login'
import Register from "./Pages/Registration";
 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

