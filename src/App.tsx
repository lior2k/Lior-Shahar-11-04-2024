import './App.css';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WeatherProvider from './Context/WeatherProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/favorites', element: <Favorites /> },
]);

const App = () => {
    return (
        <WeatherProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </WeatherProvider>
    );
};

export default App;
