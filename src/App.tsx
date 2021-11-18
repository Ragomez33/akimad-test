import React from 'react';
import './App.css';
import { AppBarComponent } from './modules/layout/AppBarComponent';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { UsersDetailsComponent } from './modules/users/usersDetails';
import { Home } from './modules/layout/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RepositoriesComponent } from './modules/repositories/RepositoriesComponent';

function App() {

  return (
    <div className="App">
      <AppBarComponent />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        />
    < BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/users-details/:login"
        element={<UsersDetailsComponent />}
      />
      <Route
        path="/repositories/:username"
        element={<RepositoriesComponent />}
      />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
