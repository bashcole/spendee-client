import {MediaQueries, Breakpoints, Spacing, Shadows} from "./types";

export const breakpointMap: { [key: string]: number } = {
    xs: 370,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

const mediaQueries: MediaQueries = {
    xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
    sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
    md: `@media screen and (min-width: ${breakpointMap.md}px)`,
    lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
    xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
    xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
};

const spacing: any = {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem"
}

export const shadows: Shadows = {
    base: "0 4px 8px 0 rgb(48 82 120 / 8%)",
    hover: "0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 10%), 0 10px 10px -5px rgb(0 0 0 / 4%)"
};

export default {
    siteWidth: 1200,
    breakpoints,
    mediaQueries,
    spacing,
    shadows
};