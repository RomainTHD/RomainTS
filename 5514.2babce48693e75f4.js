"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[5514],{

/***/ 5514:
/*!*****************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/InterfaceDeclarationVisitor.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);






function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (node.modifiers) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__.NotImplementedException();
    }
    const e = yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.name, env);
    }));
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.assert)(e.identifier !== undefined, "identifier is undefined");
    const name = e.identifier;
    const resType = _types__WEBPACK_IMPORTED_MODULE_3__.ObjectType.create([]);
    if (node.heritageClauses) {
      for (const heritage of node.heritageClauses) {
        if (heritage.token === (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).ImplementsKeyword) {
          throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Cannot implement interfaces", heritage);
        }
        for (const hType of heritage.types) {
          const parent = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(hType, env);
          if (!parent.identifier) {
            throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("An interface can only extend an identifier or qualified-name", hType);
          }
          const parentType = env.lookupType(parent.identifier);
          if (!parentType) {
            const v = env.lookup(parent.identifier);
            if (v) {
              throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`'${parent.identifier}' refers to a value, but is being used as a type here`, hType);
            } else {
              throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Cannot find type '${parent.identifier}'`, hType);
            }
          }
          if (!(parentType instanceof _types__WEBPACK_IMPORTED_MODULE_3__.PropertyAccessor)) {
            throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Expected interface, got '${parentType}'`, hType);
          }
          parentType.ownProperties.forEach(prop => {
            if (resType.hasOwnProperty(prop.name)) {
              if (!prop.pType.contains(resType.getOwnProperty(prop.name).pType)) {
                throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Interface '${name}' incorrectly extends parent '${parent.identifier}', type '${prop.name}' is not assignable to parent type '${resType.getOwnProperty(prop.name).pType}'`, hType);
              }
            }
            resType.add({
              ...prop,
              fromParent: true
            });
          });
        }
      }
    }
    for (const member of node.members) {
      const prop = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(member, env);
      (0,_utils__WEBPACK_IMPORTED_MODULE_4__.assert)(prop, `Expected property, got '${prop}'`);
      (0,_utils__WEBPACK_IMPORTED_MODULE_4__.assert)(prop.name, `Expected property name, got '${prop.name}'`);
      (0,_utils__WEBPACK_IMPORTED_MODULE_4__.assert)(prop.pType, `Expected property type, got '${prop.pType}'`);
      if (resType.hasOwnProperty(prop.name)) {
        const other = resType.getOwnProperty(prop.name);
        if (other.fromParent && !prop.pType.contains(other.pType)) {
          throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Property '${prop.name}' with type '${prop.pType}' is not assignable to parent type '${resType.getOwnProperty(prop.name).pType}'`, member);
        }
      }
      resType.add(prop);
    }
    env.addType(name, resType);
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);