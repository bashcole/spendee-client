import "styled-components";

import {SpendeeTheme} from "./config/constants/theme";

declare module "styled-components" {
    export interface DefaultTheme extends SpendeeTheme {}
}