"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1253],{

/***/ 1253:
/*!****************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/FunctionDeclarationVisitor.ts ***!
  \****************************************************************************/
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
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);
/* harmony import */ var _shared_function__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/function */ 392);








function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (!node.name) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_6__.NotImplementedException("Anonymous functions aren't supported yet");
    }
    let exported = false;
    if (node.modifiers) {
      for (const modifier of node.modifiers) {
        if (modifier.kind === (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).ExportKeyword) {
          exported = true;
        } else {
          throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_6__.NotImplementedException();
        }
      }
    }
    if (!env.getData("isTopLevel", true, false) && exported) {
      throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Cannot export a function that isn't on the top level", node);
    }
    const nodeName = node.name;
    const e = yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(nodeName, env);
    }));
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.assert)(e.identifier !== undefined, "identifier is undefined");
    const name = e.identifier;
    const {
      fType,
      infer
    } = yield (0,_shared_function__WEBPACK_IMPORTED_MODULE_7__.visitFunction)(node, env);
    if (!node.body) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_6__.NotImplementedException("Functions without body aren't supported yet");
    }
    env.add(name, {
      vType: fType,
      isLocal: true,
      isMutable: true
    }, exported);
    env.enterScope();
    env.pushReturnType(fType.retType);
    // FIXME: Wrong signature
    env.add("this", {
      vType: fType,
      isLocal: true,
      isMutable: true
    });
    for (const param of fType.params) {
      env.add(param.name, {
        vType: param.pType,
        isLocal: true,
        isMutable: true
      });
    }
    const retData = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.body, env);
    if (retData.returningStatement !== _utils_Bool3__WEBPACK_IMPORTED_MODULE_5__.Bool3.Yes && ![_types__WEBPACK_IMPORTED_MODULE_3__.VoidType.create(), _types__WEBPACK_IMPORTED_MODULE_3__.AnyType.create(), _types__WEBPACK_IMPORTED_MODULE_3__.UndefinedType.create()].some(t => fType.retType.contains(t))) {
      throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Function '${name}' must return a value of type '${fType.retType}'`, node);
    }
    env.popReturnType();
    env.leaveScope();
    if (infer && fType.retType.equals(_types__WEBPACK_IMPORTED_MODULE_3__.AnyType.create())) {
      /*
      TypeScript infers
      ```
      function f() {
          return 0;
      }
      ```
      to be of type `() => number` instead of `() => 0`
       */
      const inferredType = retData.inferredType.generalize();
      if (retData.returningStatement === _utils_Bool3__WEBPACK_IMPORTED_MODULE_5__.Bool3.No) {
        fType.retType = _types__WEBPACK_IMPORTED_MODULE_3__.VoidType.create();
      } else if (retData.returningStatement === _utils_Bool3__WEBPACK_IMPORTED_MODULE_5__.Bool3.Sometimes) {
        fType.retType = _types__WEBPACK_IMPORTED_MODULE_3__.UnionType.create([inferredType, _types__WEBPACK_IMPORTED_MODULE_3__.VoidType.create()]).simplify();
      } else {
        fType.retType = inferredType;
      }
    }
    return {
      inferredType: fType,
      returningStatement: _utils_Bool3__WEBPACK_IMPORTED_MODULE_5__.Bool3.No
    };
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);