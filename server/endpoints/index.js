"use strict";

const express = require('express');
// import rateLimit from 'express-rate-limit';
// import slowDown from 'express-slow-down';

require('dotenv').config();

// db: Uses monk for mongodb interaction
const { schemas, UserSchema, RestaurantSchema, ReviewSchema, categories, users, reviews, restaurant_images, helper } = require('../db');

const restaurantRoute = require('./restaurants');
const reviewRoute = require('./reviews');
const userRoute = require('./users');

const router = express.Router();

// TODO: Rate-limit, Cache etc


// TODO: Is this useful?
router.get('/schemas', (req, res, next) => {
    const result = [
        { for: Object.keys({ UserSchema })[0].replace('Schema', '').toLowerCase(), content: UserSchema.describe().keys },
        { for: Object.keys({ RestaurantSchema })[0].replace('Schema', '').toLowerCase(), content: RestaurantSchema.describe().keys },
        { for: Object.keys({ ReviewSchema })[0].replace('Schema', '').toLowerCase(), content: ReviewSchema.describe().keys }
    ];

    schemas.all.forEach(s => {
        const name = s;
    });

    // const n = schemas.all.length-1;
    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
        
    // }
    // //forEach(s=> result.push({ for: Object.keys({ s })[0].replace('Schema', ''), content: s.describe() }));

    return res.json(result);
});

router.get('/categories', (req, res, next) => {
    return res.json(categories);
});

router.use('/restaurants', restaurantRoute);
router.use('/reviews', reviewRoute);
router.use('/users', userRoute);

// router.get('/reviews', async (req, res, next) => {
//     return res.json(await reviews.find({}));
// });

// router.post('/reviews', async (req, res, next) => {
//     try {
//         await ReviewSchema.validateAsync(req.body);

//         // const { content, user, restaurant, rating } = req.body;
//         // const exists = await reviews.findOne({ content, user, restaurant });

//         const review: Review = req.body;
//         const exists = await reviews.findOne({ content: review.content, user: review.user, restaurant: review.restaurant });

//         if (exists) {
//             res.sendStatus(409); // Conflict(409)
//         }

//         const result = await reviews.insert(review);

//         return res.json(result);
//     } catch (error) {
//         return next(error);
//     }
// });

router.use((req, res, next) => {
    return res.sendStatus(400); // Unauthorized(401) or Forbidden(403) or Not acceptable(406) or Bad gateway(502)
});

exports.v1 = router;