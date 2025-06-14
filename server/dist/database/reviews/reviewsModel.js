"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ReviewSchema = _mongoose["default"].Schema({
  food: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Foods"
  },
  restaurant: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Restaurants"
  },
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Users"
  },
  rating: {
    type: Number,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  isRestaurantReview: Boolean,
  isFoodReview: Boolean,
  photos: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Images"
  }]
}, {
  timestamps: true
});
var ReviewModel = exports.ReviewModel = _mongoose["default"].model("Reviews", ReviewSchema);