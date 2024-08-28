import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Codesvg from './Tools/Codesvg';
import Index from './Home/Index';


function App() {

     // Login page.....
     function Layout() {
          return (
               <>
                    <Outlet />
               </>
          );
     }


     return (
          <Router>
               <Routes>


                    <Route element={<Layout />}>
                         <Route path='/' element={<Index />} />
                         <Route path='/ai' element={<Codesvg />} />
                    </Route>

               </Routes>
               <Toaster />
          </Router>
     );
};

export default App;
