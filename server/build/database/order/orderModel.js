"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var OrderSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Users"
  },
  orderDetails: [{
    food: {
      type: _mongoose["default"].Types.ObjectId,
      ref: "Foods"
    },
    quantity: {
      type: Number,
      required: true
    },
    paymode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      "default": "Placed"
    },
    paymentDetails: {
      itemTotal: {
        type: Number,
        required: true
      },
      promo: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        required: true
      }
    }
  }]
}, {
  timestamps: true
});
var OrderModel = exports.OrderModel = _mongoose["default"].model("Orders", OrderSchema);