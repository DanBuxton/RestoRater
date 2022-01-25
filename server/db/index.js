"use strict";

// import monk from 'monk';

const Schemas = require('./schemas');

exports.RestaurantSchema = Schemas.RestaurantSchema;
exports.UserSchema = Schemas.UserSchema;
exports.ReviewSchema = Schemas.ReviewSchema;

const { createClient } = require('@supabase/supabase-js');

const env = require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URI;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

const db = createClient(supabaseUrl, supabaseKey);
exports.restaurants = db.from('restaurant');
exports.users = db.from('user');
exports.reviews = db.from('review');
exports.restaurant_images = db.storage.from('restaurant-images');

exports.categories = {
    food_type: ['fast food', 'a la carte', 'table d\'hote', 'Asian', 'Caribbean', 'Oriental', 'Italian', 'American', 'traditional'],
    ambience: ['family meal', 'romantic dinner', 'kids meals', 'business lunches', 'view'],
    meal_type: ['breakfast', 'lunch', 'dinner', 'supper', 'take out'],
    other: ['expense per head', 'quality of the food', 'ambience of the experience', 'quality of service', 'cleanliness', 'speed of service', 'value for money']
};

exports.schemas = Schemas;

const Helper = require('./helper');
exports.helper = new Helper(db);