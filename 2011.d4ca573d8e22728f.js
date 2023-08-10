"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2011],{

/***/ 2011:
/*!************************************************************!*\
  !*** ../src/typechecker/visitor/statement/BlockVisitor.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);





const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let all = {
      doesReturn: _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.No,
      inferredType: _types__WEBPACK_IMPORTED_MODULE_2__.UnionType.create([])
    };
    env.enterScope();
    for (const stmt of node.statements) {
      const current = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(stmt, env);
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(current, "Statement return isn't defined");
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(current.inferredType, "Inferred type isn't defined");
      if (!env.config.allowUnreachableCode && all.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Yes) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("Unreachable code detected", stmt);
      }
      if (current.returningStatement === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Yes) {
        /*
        ```
        if (something) {
            return "s";
        }
         return 0;
        ```
        Return type: string | number
        Does return: yes
         */
        all.doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Yes;
        all.inferredType.add(current.inferredType);
        // We coud just return here since we know that the rest of the statements are unreachable
      } else if (current.returningStatement === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Sometimes) {
        if (all.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.No) {
          /*
          ```
          if (something) {
              return "s";
          }
          ```
          Return type: string
          Does return: sometimes
           */
          all.doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Sometimes;
          all.inferredType.add(current.inferredType);
        } else if (all.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Sometimes) {
          /*
          ```
          if (something) {
              return "s";
          }
          if (somethingElse) {
              return 0;
          }
          ```
          Return type: string | number
          Does return: sometimes
           */
          all.inferredType.add(current.inferredType);
        } else if (all.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Yes) {
          /*
          ```
          return 0;
          if (something) {
              return "s";
          }
          ```
          Return type: number
          Does return: yes
           */
        }
      }
    }
    env.leaveScope();
    return {
      returningStatement: all.doesReturn,
      inferredType: all.inferredType.types.length === 0 ? _types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create() : all.inferredType.simplify()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);