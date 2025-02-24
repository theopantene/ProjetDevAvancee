'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    async add(userId, movieId) {
        const { Favorite } = this.server.models();
        const existingFavorite = await Favorite.query().findOne({ userId, movieId });
        if (existingFavorite) {
            throw new Error('Movie is already in favorites');
        }
        return Favorite.query().insertAndFetch({ userId, movieId });
    }

    async remove(userId, movieId) {
        const { Favorite } = this.server.models();
        const favorite = await Favorite.query().findOne({ userId, movieId });
        if (!favorite) {
            throw new Error('Movie is not in favorites');
        }
        return Favorite.query().delete().where({ userId, movieId });
    }
};