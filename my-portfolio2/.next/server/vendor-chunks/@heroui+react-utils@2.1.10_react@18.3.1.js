"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@heroui+react-utils@2.1.10_react@18.3.1";
exports.ids = ["vendor-chunks/@heroui+react-utils@2.1.10_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/../node_modules/.pnpm/@heroui+react-utils@2.1.10_react@18.3.1/node_modules/@heroui/react-utils/dist/chunk-3XT5V4LF.mjs":
/*!******************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@heroui+react-utils@2.1.10_react@18.3.1/node_modules/@heroui/react-utils/dist/chunk-3XT5V4LF.mjs ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createContext: () => (/* binding */ createContext2)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@13.5.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\"use client\";\n\n// src/context.ts\n\nfunction createContext2(options = {}) {\n  const {\n    strict = true,\n    errorMessage = \"useContext: `context` is undefined. Seems you forgot to wrap component within the Provider\",\n    name\n  } = options;\n  const Context = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);\n  Context.displayName = name;\n  function useContext2() {\n    var _a;\n    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(Context);\n    if (!context && strict) {\n      const error = new Error(errorMessage);\n      error.name = \"ContextError\";\n      (_a = Error.captureStackTrace) == null ? void 0 : _a.call(Error, error, useContext2);\n      throw error;\n    }\n    return context;\n  }\n  return [Context.Provider, useContext2, Context];\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BoZXJvdWkrcmVhY3QtdXRpbHNAMi4xLjEwX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQGhlcm91aS9yZWFjdC11dGlscy9kaXN0L2NodW5rLTNYVDVWNExGLm1qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQytCO0FBQy9CLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixrQkFBa0IsZ0RBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2Q0FBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1wb3J0Zm9saW8vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BoZXJvdWkrcmVhY3QtdXRpbHNAMi4xLjEwX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQGhlcm91aS9yZWFjdC11dGlscy9kaXN0L2NodW5rLTNYVDVWNExGLm1qcz8wOTUyIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvY29udGV4dC50c1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0MihvcHRpb25zID0ge30pIHtcbiAgY29uc3Qge1xuICAgIHN0cmljdCA9IHRydWUsXG4gICAgZXJyb3JNZXNzYWdlID0gXCJ1c2VDb250ZXh0OiBgY29udGV4dGAgaXMgdW5kZWZpbmVkLiBTZWVtcyB5b3UgZm9yZ290IHRvIHdyYXAgY29tcG9uZW50IHdpdGhpbiB0aGUgUHJvdmlkZXJcIixcbiAgICBuYW1lXG4gIH0gPSBvcHRpb25zO1xuICBjb25zdCBDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh2b2lkIDApO1xuICBDb250ZXh0LmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgZnVuY3Rpb24gdXNlQ29udGV4dDIoKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgIGlmICghY29udGV4dCAmJiBzdHJpY3QpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICBlcnJvci5uYW1lID0gXCJDb250ZXh0RXJyb3JcIjtcbiAgICAgIChfYSA9IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSA9PSBudWxsID8gdm9pZCAwIDogX2EuY2FsbChFcnJvciwgZXJyb3IsIHVzZUNvbnRleHQyKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuICByZXR1cm4gW0NvbnRleHQuUHJvdmlkZXIsIHVzZUNvbnRleHQyLCBDb250ZXh0XTtcbn1cblxuZXhwb3J0IHtcbiAgY3JlYXRlQ29udGV4dDIgYXMgY3JlYXRlQ29udGV4dFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../node_modules/.pnpm/@heroui+react-utils@2.1.10_react@18.3.1/node_modules/@heroui/react-utils/dist/chunk-3XT5V4LF.mjs\n");

/***/ })

};
;