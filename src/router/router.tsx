import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("@/pages/Auth/login.page"));
const Register = lazy(() => import("@/pages/Auth/register.page"));
const Layout = lazy(() => import("@/pages/Auth/layout"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/auth",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <Login />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    }
])