import { Colors } from "./types";

export const baseColors = {
    failure: "#ED4B9E",
    primary: "#34d399",
    primaryBright: "#53DEE9",
    primaryDark: "#0098A1",
    secondary: "#f87171",
    success: "#31D0AA",
    warning: "#FFB237",
    neutral: "#bbcdd8",
    neutralBright: "#E3E8EB",
    neutral100: "#8798A8",
    neutralBright100: "#F7F9FB",
    white: "#ffffff",
    gray: "#444444",
    black: "#000000",
    gray100: "#333333",
};

export const lightColors: Colors = {
    ...baseColors
};

export const darkColors: Colors = {
    ...baseColors
};