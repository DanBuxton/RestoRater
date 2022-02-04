"use strict";

const { SupabaseClient } = require("@supabase/supabase-js");

module.exports = class {
    /**
     * 
     * @param {SupabaseClient} db 
     */
    constructor(db) {
        this.db = db;
        this.restaurant_images = db.storage.from('restaurant-images');
    }

    /**
     * @param {string} name 
     * @private
     */
    get_image_uri = (name) => this.restaurant_images.getPublicUrl(name).data.publicURL;

    /**
     * 
     * @private
     * @param {string} name 
     * @param {string} description 
     * @param {string} location 
     * @param {string[]} reviews 
     * @param {string} image_name 
     */
     create_restaurant_object = (name, description, location, reviews, image_name) => ({
        id: 0,
        name,
        description,
        location,
        reviews: reviews ?? [],
        image_url: this.get_image_uri(image_name),
        image_name
    });
    // /**
    //  * 
    //  * @private
    //  * @param {string} name 
    //  * @param {string} description 
    //  * @param {string} location 
    //  * @param {string[]} reviews 
    //  * @param {string} image_url 
    //  */
    // create_review_object = (name, description, location, reviews, image_url) => ({
    //     id: 0,
    //     name,
    //     description,
    //     location,
    //     reviews: reviews ?? [],
    //     image_url
    // });

    /**
     * Create a JSON friendly object
     * @param {{ id?: number, name: string, description: string, location: string, reviews: [], image_name: string }} r 
     */
    create_restaurant_from_db = r => {
        const data = this.create_restaurant_object(r.name, r.description, r.location, r.reviews, r.image_name);
        if (r.id) data.id = r.id;
        return data;
    };

    // create_review_from_db = r => {
    //     const data = this.create_review_object(r.name, r.description, r.location, r.reviews, this.get_image_uri(r.image_name));
    //     if (r.id) data.id = r.id;
    //     return data;
    // }
}
