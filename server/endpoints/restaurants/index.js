"use strict";

const supportedFileExts = [ 'jpeg', 'jpg', 'png' ];

const { restaurants, reviews, helper, RestaurantSchema: Restaurant } = require('../../db');
const { Router } = require('express');

const { rm } = require('fs');

const multer = require('multer');
const upload = multer({
    dest: __dirname + '/uploads',
    fileFilter: (req, file, cb) => {

        if (supportedFileExts.includes(file.mimetype.split('/')[1].toLowerCase())) cb(null, true);
        else {
            const tmp = supportedFileExts.join(', '),
            msg = tmp.substring(0,tmp.lastIndexOf(',')) + ' and ' + supportedFileExts.at(-1);

            const err = new Error(`Unsupported file format: only ${msg} are supported`);
            err.stack = null;
            cb(err);
        }
    },
});

const app = Router();

//https://stackoverflow.com/a/15773267
app.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) return next({message: 'Must have an image'});

        await Restaurant.validateAsync(req.body);

        const {
            name,
            description,
            catagories,
            location
        } = req.body, bdy = req.body;

        console.log(bdy, req.file);

        res.json(bdy);

    } catch (error) {
        next(error);
    } finally {
        //TODO: Delete the saved image
        if (req.file)
            rm(req.file.path, err => {
                if (err) {
                    if (global.isDev) throw err;
                    else return;
                }
            });

        return;
    }
});
app.get('/', async (req, res, next) => {
    const results = (await restaurants.select('*')).data;
    let data = [];

    for (const r of results) {
        data.push(helper.create_restaurant_from_db(r));
    }

    // results.forEach(r => data.push(helper.create_restaurant_from_db(r)));

    return res.json(data);
});
app.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    const r = (await restaurants.select('*').eq('id', id).single()).data;

    return res.json(helper.create_restaurant_from_db(r));
});

// app.get('/:id/reviews', async (req, res, next) => {
//     const {
//         id
//     } = req.params;

//     const restReviews = (await reviews.select('*').eq('restaurant', id)).data.map(helper.create_review_from_db);

//     // const r = (await reviews.select('*').eq('r', id).single()).data;

//     return restReviews;
// });
// router.get('/:id/image', async (req, res, next) => {
//     const { id } = req.params;

//     const data = (await restaurants.select('image_name').eq('id', id).single()).data;/*, {projection: { image: 1 }});*/

//     return res.json(get_image_data('restaurant-images', data.image_name).publicURL);
// });

module.exports = app;