import React, { useContext, useState } from 'react';

export const ThemeContext = React.createContext({
    theme: "light",
    updateTheme: () => { },
    isDarkTheme: false
});
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")
    const [isDark, setIsDark] = useState(theme === 'dark');

    return (
        <ThemeContext.Provider value={{
            theme,
            updateTheme: setTheme,
            isDarkTheme: isDark
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider

export const useTheme = () => {
    const { isDarkTheme,theme,updateTheme } = useContext(ThemeContext);
    return { isDarkTheme,theme,updateTheme };
};
