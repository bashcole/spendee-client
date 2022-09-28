import base from "./base";
import { DefaultTheme } from "styled-components";
import { lightColors } from "./colors";

const lightTheme: DefaultTheme = {
    ...base,
    isDark: false,
    colors: lightColors,
};

export default lightTheme;