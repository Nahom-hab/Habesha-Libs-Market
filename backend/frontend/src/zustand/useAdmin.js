import { create } from 'zustand'

const useAdmin = create((set) => ({
    admin: JSON.parse(localStorage.getItem("Admin")),
    setAdmin: (admin) => set({ admin }),
    isEng: JSON.parse(localStorage.getItem("isEng")),
    setIsEng: (isEng) => set({ isEng }),
}))

export default useAdmin
