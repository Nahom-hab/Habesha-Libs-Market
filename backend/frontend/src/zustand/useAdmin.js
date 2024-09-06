import { create } from 'zustand';

const useAdmin = create((set) => {
    // Get `isEng` value from localStorage or default to true if not found
    const storedIsEng = JSON.parse(localStorage.getItem("isEng"));
    const initialIsEng = storedIsEng !== null ? storedIsEng : true;

    return {
        admin: JSON.parse(localStorage.getItem("Admin")),
        setAdmin: (admin) => set({ admin }),
        isEng: initialIsEng,
        setIsEng: (isEng) => set({ isEng }),
    };
});

export default useAdmin;
