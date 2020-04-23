import React, { createContext, useState, useEffect } from "react";
const context = createContext(null);

const MenuBarStatusProvider = ({ children }) => {
    const [isHaveSideMenu, setIsHaveSideMenu] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);

    return (
        <context.Provider value={{
            setIsHaveSideMenu,
            isHaveSideMenu,
            isDisplay,
            setIsDisplay
        }}>
            {children}
        </context.Provider>
    );
};

MenuBarStatusProvider.context = context;

export default MenuBarStatusProvider;