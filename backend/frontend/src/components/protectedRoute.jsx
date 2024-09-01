import React from 'react'

import { Outlet } from "react-router-dom"
import useAdmin from '../zustand/useAdmin'
import Home from '../pages/home'

export default function ProtectedRoute() {
    const { admin } = useAdmin()
    return admin ? <Outlet /> : <Home />
}
