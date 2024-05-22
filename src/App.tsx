import './App.css';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createHashRouter([
    { path: '/', element: <Home /> },
    { path: '/favorites', element: <Favorites /> },
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
};

export default App;
