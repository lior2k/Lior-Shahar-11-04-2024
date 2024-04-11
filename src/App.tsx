import './App.css';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/favorites', element: <Favorites /> },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
