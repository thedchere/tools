import React from 'react';
import './Assets/SCSS/style.scss';
import { Toaster } from 'react-hot-toast';
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Codesvg from './Tools/Codesvg';
import Index from './Home/Index';
import Circlesvg from './Tools/Circlesvg';
import GradientGenerate from './Tools/GradientGenerate';
import ResponsiveDesignTester from './Tools/ResponsiveDesignTester';


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
                         <Route path='*' element={<Index />} />
                         <Route path='/svg-to-code' element={<Codesvg pageTitle={'Convert SVG code'} />} />
                         <Route path='/svg-circle-progress' element={<Circlesvg pageTitle={'Circle Progress Generator'} />} />
                         <Route path='/gradient-generate' element={<GradientGenerate pageTitle={'Gradient Color Generate'} />} />
                         <Route path='/responsive-tester' element={<ResponsiveDesignTester />} />
                    </Route>

               </Routes>
               <Toaster />
          </Router>
     );
};

export default App;
