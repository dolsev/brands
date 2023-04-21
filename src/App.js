import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Navbar from "./components/UI/Navbar/Navbar";
import './App.scss'
const Layout = ()=>{
    return (
        <div className='app'>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<Layout/>,
            children:[
                {
                    path:'/',
                    element:<Products/>
                },
                {
                    path:'/product/:id',
                    element:<Product/>
                }
            ]
        }
    ]
)

function App() {
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
