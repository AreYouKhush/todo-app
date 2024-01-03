import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import './index.css'
import Todo from './components/Todo.jsx';
import Login from './components/Login.jsx';
// import SignUp from './components/BasicSignUpForm.jsx';
import SignUp from './components/AdvancedSignUpForm.jsx';
import AppContext from './context.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Todo/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
    <RouterProvider router={router}></RouterProvider>
    </AppContext>
  </React.StrictMode>,
)
