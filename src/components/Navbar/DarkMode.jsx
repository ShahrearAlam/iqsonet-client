import { useEffect, useState } from "react";
import { BsBrightnessHigh, BsFillMoonFill } from "react-icons/bs";

export default function DarkMode() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );

    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const darkmodeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <div>
            {theme === "dark" ? (
                <BsBrightnessHigh
                    id="darkmodelight-btn"
                    className="cursor-pointer text-[20px] text-slate-900/60 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50"
                    onClick={darkmodeSwitch}
                />
            ) : (
                <BsFillMoonFill
                    id="darkmodelight-btn"
                    className="cursor-pointer text-[20px] text-slate-900/60 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50"
                    onClick={darkmodeSwitch}
                />
            )}
        </div>
    );
}
