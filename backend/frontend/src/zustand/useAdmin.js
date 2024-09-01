import { create } from 'zustand'

const useAdmin = create((set) => ({
    admin: JSON.parse(localStorage.getItem("Admin")),
    setAdmin: (admin) => set({ admin }),
}))

export default useAdmin
