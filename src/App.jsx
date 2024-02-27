import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Draw from "./pages/Draw"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Draw />,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
