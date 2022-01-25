"use strict";

const Joi = require('joi');

const UserSchema = Joi.object({
    id: Joi.number(),
    email: Joi.string().email().required(),
    password: Joi.string().max(64, 'utf-8').required(),
    name: Joi.string().required()
});
const ReviewSchema = Joi.object({
    id: Joi.number(),
    content: Joi.string().required(),
    summary: Joi.string().default(null).description('Auto generated based on content'), //TODO: Read content with ML AI to guess
    recommended: Joi.bool().default(null).description('Auto generated based on content'), // TODO: Read content with ML AI to guess
    user: Joi.number().required().description('User id'),
    rating: Joi.number().min(0).max(5).required(),
    restaurant: Joi.number().required().description('Restaurant id')
});
const RestaurantSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    // image_name: Joi.string(),//.required(),
    location: Joi.string().required(),
    reviews: Joi.array().description('Array of review ids and summaries')
});

exports.UserSchema = UserSchema;
exports.RestaurantSchema = RestaurantSchema;
exports.ReviewSchema = ReviewSchema;
exports.all = [ UserSchema, RestaurantSchema, ReviewSchema ];

// export type User = {
//     _id: string;
//     email: Joi.EmailOptions;
//     password: string;
//     name: string;
// };
// export type Restaurant = {
//     _id: string,
//     name: string,
//     desc: string,
//     image: object,
//     location: string,
//     reviews: Number[]
// };
// export type Review = {
//     _id?: string,
//     content: string,
//     recommended: Boolean,
//     user: string,
//     restaurant: string,
//     rating: Number
// };