
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import Dashboard from './pages/Dashboard.jsx';

import Profile from './pages/Profile.jsx';



function App() {

    return (
        <>
            {/* <h1 className='bg-amber-300 m-10 text-center text-xl'>this is setup to test the tailwind</h1> */}
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path='/' element={<Layout/>}>
                    {/* these will render inside <Outlet /> */}
                    <Route index element={<Home />} />
                    {/* <Route path="about" element={<AboutPage />} /> */}
                    {/* <Route path="contact" element={<ContactPage />} /> */}
                    <Route path='dashboard' element={<Dashboard />} />
                    {/* <Route path="/auth/v1/callback" element={<AuthCallback />} /> */}
                    {/* <Route path="/auth-callback" element={<h1>Callback Page Hit</h1>} /> */}
                    <Route path='/profile' element={<Profile/>} />

                </Route>
                <Route path="login" element={<Login />} />
                <Route path='signup' element={<Signup />} />
               
            </Routes>
        </>
    )
}

export default App
