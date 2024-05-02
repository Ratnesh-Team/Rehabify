import { THEME_ENUM } from '@/constants/theme.constant'
import {
    Direction,
    Mode,
    ColorLevel,
    NavMode,
    ControlSize,
    LayoutType,
} from '@/@types/theme'

export type ThemeConfig = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    controlSize: ControlSize
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig ={
  "themeColor": "orange",
  "direction": "ltr",
  "mode": "light",
  "primaryColorLevel": 400,
  "cardBordered": true,
  "panelExpand": false,
  "controlSize": "md",
  "navMode": "transparent",
  "layout": {
    "type": "modern",
    "sideNavCollapse": false
  },
}
