"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[5976],{

/***/ 5976:
/*!****************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/VariableDeclarationVisitor.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);



function visit(_x, _x2, _x3) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env, {
    isLocal,
    isMutable
  }) {
    env.setValueSide(___WEBPACK_IMPORTED_MODULE_1__.ValueSide.LValue);
    const name = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    env.setValueSide(___WEBPACK_IMPORTED_MODULE_1__.ValueSide.RValue);
    let vType = null;
    if (node.type) {
      // `let x: number ...`
      vType = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.type, env);
    }
    if (node.initializer) {
      let exprType = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.initializer, env);
      if (vType) {
        // `let x: number = ...`
        if (!vType.contains(exprType)) {
          throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Type '${exprType}' is not assignable to type '${vType}'`, node);
        }
      } else {
        if (isMutable && exprType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.LiteralType) {
          // `let x = 0`: `x` should be a `number`
          vType = exprType.literal.vType;
        } else {
          // `let x = ...`
          vType = exprType;
        }
      }
    } else {
      if (!vType) {
        // `let x;` is equivalent to `let x: any;`
        vType = _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create();
      }
    }
    const other = env.lookup(name);
    if (other) {
      if (other.isLocal) {
        if (other.isFromCurrentScope) {
          if (other.isMutable) {
            throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Redeclaration of let '${name}'`, node);
          } else {
            throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Redeclaration of const '${name}'`, node);
          }
        }
      } else if (isLocal) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Redeclaration of var '${name}'`, node);
      }
    }
    env.add(name, {
      vType,
      isLocal,
      isMutable
    });
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);