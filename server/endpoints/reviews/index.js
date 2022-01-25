const {
    Router
} = require('express');
const app = Router();

const { restaurants, reviews, helper, ReviewSchema: Review } = require('../../db');

app.post('/', async (req, res, next) => {
    await Review.validateAsync(req.body);
    const {
        content,
        // summary,
        recommended,
        user_id,
        rating,
        restaurant_id 
    } = req.body;

    //const restReviews = (await reviews.select('*').eq('restaurant', id)).data.map(helper.create_review_from_db);

    return res.json(restReviews);
});

app.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    const restReviews = (await reviews.select('*').eq('restaurant', id)).data.map(helper.create_review_from_db) ?? [];

    return res.json(restReviews);
});

module.exports = app;