"use strict";

window.addEventListener('load', () => {
    const API_URL = 'http://localhost:3080/api/v1';
    /**
     * 
     * @param {{ id: number, name: string, description: string, location: string, reviews: [[{id: number, content: string, summary?: string, recommended: boolean, rating: number, restaurant: number}]], image_name: string }} r 
     */
    const createAndAddRestaurantCard = r => {
        const el = document.createElement('div');
        el.className = 'col';
        el.innerHTML = `<div class="card">
            <img src="${r.image_url}" class="card-img-top" alt="${r.image_name} picture">
            <div class="card-body">
                <h5 class="card-title">${r.name}</h5>
                <p class="card-text">${r.description}</p>

                <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4">
                    <button class="col btn btn-outline-info btn-sm">More details</button>
                    <button class="col btn btn-outline-info btn-sm">View on map</button>
                    <button class="col btn btn-outline-info btn-sm" data-bs-toggle="modal" data-bs-target="#reviews${r.id}">All reviews</button>
                    <button class="col btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop${r.id}">Review</button>
                </div>
            </div>`;

        document.querySelector('#add-review-modals')
            .appendChild(addReviewModal(r));
        document.querySelector('#reviews-modals')
            .appendChild(addReviewsModal(r));

        document.querySelector('#cards')
            .appendChild(el);
    };
    /**
     * 
     * @param {{ id: number, name: string, description: string, location: string, reviews: [[{id: number, content: string, summary?: string, recommended: boolean, rating: number, restaurant: number}]], image_name: string }} r 
     */
    const addReviewModal = r => {
        const el = document.createElement('div');
        el.className = 'modal fade';
        el.id = 'staticBackdrop' + r.id;
        // el.attributes.setNamedItem(createAttr('data-bs-backdrop', 'static'));
        el.attributes.setNamedItem(createAttr('data-bs-keyboard', 'false'));
        el.tabIndex = -1;
        el.attributes.setNamedItem(createAttr('aria-labelledby', 'staticBackdropLabel' + r.id));
        el.ariaHidden = 'true';

        const form = `<form id="rest-${r.id}" class="container needs-validation" novalidate method="post">
            <div class="row mb-3">
                <label for="inputContent${r.id}" class="col-sm-2 col-form-label">Content</label>
                <div class="col-sm-10">
                    <textarea max="200" class="form-control" id="inputContent${r.id}" name="content" required></textarea>
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputUsername${r.id}" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputUsername${r.id}" name="username" required>
                </div>
            </div>
            <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Rating</legend>
                <div class="col-sm-10">
                    <div class="form-check ">
                        <input class="form-check-input" type="radio" name="rating" id="rating1-${r.id}" value="1" required>
                        <label class="form-check-label" for="rating1-${r.id}">
                            1 star
                        </label>
                    </div>
                    <div class="form-check ">
                        <input class="form-check-input" type="radio" name="rating" id="rating2-${r.id}" value="2" required>
                        <label class="form-check-label" for="rating2-${r.id}">
                            2 star
                        </label>
                    </div>
                    <div class="form-check ">
                        <input class="form-check-input" type="radio" name="rating" id="rating3-${r.id}" value="3" required>
                        <label class="form-check-label" for="rating3-${r.id}">
                            3 star
                        </label>
                    </div>
                    <div class="form-check ">
                        <input class="form-check-input" type="radio" name="rating" id="rating4-${r.id}" value="4" required>
                        <label class="form-check-label" for="rating4-${r.id}">
                            4 star
                        </label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="rating" id="rating5-${r.id}" value="5" required>
                        <label class="form-check-label" for="rating5-${r.id}">
                            5 star
                        </label>
                        <div class="invalid-feedback">
                            You must select a rating
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="row mb-3">
                <div class="col-sm-10 offset-sm-2">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck1-${r.id}" required>
                        <label class="form-check-label" for="gridCheck1-${r.id}">
                            <small><i>I consent to the above details being published and able to be viewed by anyone on the internet</i></small>
                        </label>
                        <div class="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" class="btn btn-success">Post</button>
            </div>
        </form>`;

        el.innerHTML = `<div class="modal-dialog modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header container">
                    <h5 class="modal-title" id="staticBackdropLabel${r.id}">Add review</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container">
                    ${form}
                </div>
                <div class="modal-footer container">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>`;

        return el;
    };
    const createAttr = (name, value) => {
        const at = document.createAttribute(name);
        at.value = value;

        return at;
    };
    /**
     * 
     * @param {{ id: number, name: string, description: string, location: string, reviews: [[{id: number, content: string, summary?: string, recommended: boolean, rating: number, restaurant: number}]], image_name: string }} r 
     */
    const addReviewsModal = r => {
        const el = document.createElement('div');
        el.className = 'modal fade';
        el.id = 'reviews' + r.id;
        // el.attributes.setNamedItem(createAttr('data-bs-backdrop', 'static'));
        el.attributes.setNamedItem(createAttr('data-bs-keyboard', 'false'));
        el.tabIndex = -1;
        el.attributes.setNamedItem(createAttr('aria-labelledby', 'reviewsLabel' + r.id));
        el.ariaHidden = 'true';

        /**
         * 
         * @param {{id: number, content: string, summary?: string, recommended: boolean, rating: number, restaurant: number}} r 
         */
        const reviewElement = r => {
            const e = document.createElement('div');
            e.id = `res${r.restaurant}-rev${r.id}`;

            return e;
        };

        const content = `
            <div class="row row-cols-1 row-cols-md-3 g-4" style="margin: 0 auto;">
                ${r.reviews.map(reviewElement).join('')}
            </div>`;
        
        el.innerHTML = `<div class="modal-dialog modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header container">
                    <h5 class="modal-title" id="reviewsLabel${r.id}">All reviews</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container">
                    ${content}
                </div>
                <div class="modal-footer container">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>`;

        return el;
    };

    fetch(`${API_URL}/restaurants`)
        .then(r => r.json())
        .then(d => {
            d.forEach(createAndAddRestaurantCard);

            (function () {
                'use strict'

                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                const forms = document.querySelectorAll('.needs-validation');

                // Loop over them and prevent submission
                Array.prototype.slice.call(forms)
                    .forEach(f =>
                        f.addEventListener('submit', e => {
                            if (!f.checkValidity()) {
                                e.preventDefault();
                                e.stopPropagation();
                            }

                            f.classList.add('was-validated');
                        }, false));
            })();
        })
        .catch(err => {
            console.error(err);
        });
});