(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/components/sushi_preset_full_info/sushi-preset-full-info-display.js":
/*!*********************************************************************************!*\
  !*** ./src/components/sushi_preset_full_info/sushi-preset-full-info-display.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SushiPresetFullInfoDisplay; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _buttons_plus_minus_input_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../buttons/plus-minus-input-button */ "./src/components/buttons/plus-minus-input-button.js");
/* harmony import */ var _image_components_thumbnail_image_crop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../image_components/thumbnail-image-crop */ "./src/components/image_components/thumbnail-image-crop.js");
/* harmony import */ var _assets_helpers_helper_functions_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/helpers/helper-functions-index */ "./src/assets/helpers/helper-functions-index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(function (theme) {
  return {
    displayContainer: {
      width: '95%',
      margin: 'auto',
      display: 'flex',
      flexWrap: 'wrap'
    },
    card: {
      display: 'inline-block',
      width: 350
    },
    platterName: {
      maxWidth: '40vw'
    },
    displayFlex: {
      display: 'flex',
      margin: '15px 0 15px'
    },
    displayInlineFlex: {
      display: 'inline-flex'
    },
    ingredientSection: {
      width: '90%',
      margin: 'auto'
    },
    blackText: {
      color: '#212529'
    },
    marginBottom: {
      marginBottom: '2rem'
    }
  };
});
function SushiPresetFullInfoDisplay(props) {
  var preset = props.preset,
      addPresetToCartMethod = props.addPresetToCartMethod,
      itemsInCart = props.itemsInCart;
  var classes = useStyles();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      orderNumber = _React$useState2[0],
      setOrderNumber = _React$useState2[1];

  function renderColumnInfo(info) {
    if (info) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
        item: true,
        sm: 12,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, Object(_assets_helpers_helper_functions_index__WEBPACK_IMPORTED_MODULE_7__["capitalizeFirstLetter"])(info.label)), info.content.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: i
        }, "".concat(item.amount, " kpl - ").concat(item.name));
      }));
    }
  }

  function handleOnClick() {
    addPresetToCartMethod(orderNumber, preset);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "platter-full-info-container"
  }, preset && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Breadcrumbs"], {
    "aria-label": "breadcrumb"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: classes.blackText
  }, "Olet t\xE4\xE4ll\xE4\xE4: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
    color: "inherit",
    to: "/"
  }, "Etusivu"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
    color: "inherit",
    to: "/platterit"
  }, "Platterit"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    className: classes.blackText
  }, preset.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    container: true,
    spacing: 2,
    className: classes.marginBottom
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    item: true,
    sm: 6,
    lg: 5
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_image_components_thumbnail_image_crop__WEBPACK_IMPORTED_MODULE_6__["default"], {
    src: preset.image,
    alt: preset.name,
    customClass: "cover-cropped",
    size: "100",
    unit: "%",
    minWidth: "280px"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    item: true,
    className: "platter-info",
    sm: 6,
    lg: 6
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: classes.platterName
  }, Object(_assets_helpers_helper_functions_index__WEBPACK_IMPORTED_MODULE_7__["capitalizeFirstLetter"])(preset.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, preset.numberOfPieces && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "".concat(preset.numberOfPieces, " kpl - ")), "Hinta ".concat(preset.price.toFixed(2), " \u20AC")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    variant: "caption"
  }, "Product code: ".concat(preset._id)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "add-to-cart-group-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons_plus_minus_input_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    defaultInput: orderNumber,
    inputUnit: "kpl",
    onInputChange: setOrderNumber,
    customClass: classes.displayInlineFlex
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "contained",
    color: "primary",
    className: "add-to-cart-button",
    onClick: handleOnClick
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons__WEBPACK_IMPORTED_MODULE_3__["ShoppingCart"], null), ' ', "Add to Cart")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    container: true,
    spacing: 2
  }, renderColumnInfo(preset.leftInfo), renderColumnInfo(preset.rightInfo)))), preset.sushiPieceIngredients.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ingredient-section"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Ingredients"), preset.sushiPieceIngredients.map(function (piece, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: i
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, piece.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Ingredients: ".concat(piece.ingredients)));
  }))));
}

/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map