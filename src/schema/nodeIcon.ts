import { HEX, Vec4 } from "./nodePrimitives";

/**
 * @TJS-examples ["icons/CompanyLogo.svg", {"path":"icons/CompanyLogo.svg","color":"#FF123456","backgroundColor":[86,52,18,255],"borderColor":"#FF3E3E3E"}]
 * @example
 * ```json
 * "icons/CompanyLogo.svg"
 * ```
 * @example
 * ```
 * "icon": {
 *      "path": "icons/CompanyLogo.svg",
 *      "color": "#FF123456",
 *      "backgroundColor": [86, 52, 18, 255],
 *      "borderColor": "#FF3E3E3E"
 *},
 *```
 */
export type IconType =
  | string
  | {
      /**
       * the icon location as with the simple syntax
       * @example "icons/CompanyLogo.svg"
       */
      path: string;
      /**
       * a color representation for the draw part of the icon’s shape
       * @example HEX
       * ```
       * "#FF123456"
       * ```
       * @example Vec4
       * ```
       * [86, 52, 18, 255]
       * ```
       */
      color: Vec4<number> | HEX;
      /**
       * a color representation for the part of the icon not containing its shape
       * * @example HEX
       * ```
       * "#FF123456"
       * ```
       * @example Vec4
       * ```
       * [86, 52, 18, 255]
       * ```
       */
      backgroundColor: Vec4<number> | HEX;
      /**
       * a color representation for the outline of the icon
       * @example HEX
       * ```
       * "#FF123456"
       * ```
       * @example Vec4
       * ```
       * [86, 52, 18, 255]
       * ```
       */
      borderColor: Vec4<number> | HEX;
    };
