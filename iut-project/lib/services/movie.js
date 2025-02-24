'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie) {
        const { Movie, User } = this.server.models();
        const createdMovie = await Movie.query().insertAndFetch(movie);
        const users = await User.query().where('role', 'user');
        const { mailService } = this.server.services();
        for (const user of users) {
            await mailService.sendMail(user.mail, 'New Movie Added', `A new movie titled "${createdMovie.title}" has been added.`);
        }
        return createdMovie;
    }

    async update(id, movie) {
        const { Movie, Favorite, User } = this.server.models();
        const updatedMovie = await Movie.query().patchAndFetchById(id, movie);
        const favorites = await Favorite.query().where('movieId', id);
        const { mailService } = this.server.services();
        for (const favorite of favorites) {
            const user = await User.query().findById(favorite.userId);
            await mailService.sendMail(user.mail, 'Movie Updated', `A movie titled "${updatedMovie.title}" in your favorites has been updated.`);
        }
        return updatedMovie;
    }

    list() {
        const { Movie } = this.server.models();
        return Movie.query();
    }

    delete(id) {
        const { Movie } = this.server.models();
        return Movie.query().deleteById(id);
    }
};