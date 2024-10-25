import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <Suspense>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>
);
