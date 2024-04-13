import './App.css';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WeatherProvider from './Context/WeatherProvider';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/favorites', element: <Favorites /> },
]);

const App = () => {
    return (
        <WeatherProvider>
            <RouterProvider router={router} />
        </WeatherProvider>
    );
};

export default App;
