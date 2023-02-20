import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
	getRestaurant(id) {
		if (!id) {
			return;
		}

		// eslint-disable-next-line consistent-return
		return favoriteRestaurants.find((restaurant) => restaurant.id === id);
	},

	getAllRestaurants() {
		return favoriteRestaurants;
	},

	putRestaurant(restaurant) {
		// eslint-disable-next-line no-prototype-builtins
		if (!restaurant.hasOwnProperty('id')) {
			return;
		}

		// pastikan id ini belum ada dalam daftar favoriteMovies
		if (this.getRestaurant(restaurant.id)) {
			return;
		}

		favoriteRestaurants.push(restaurant);
	},

	deleteRestaurant(id) {
		// cara boros menghapus film dengan meng-copy film yang ada
		// kecuali film dengan id == id
		favoriteRestaurants = favoriteRestaurants.filter(
			(restaurant) => restaurant.id !== id
		);
	},

	async searchRestaurants(query) {
		return this.getAllRestaurants().filter((restaurant) => {
			const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
			const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
			const loweredCaseQuery = query.toLowerCase();
			const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
			return jammedRestaurantName.indexOf(jammedQuery) !== -1;
		});
	},
};

describe('Favorite Movie Array Contract Test Implementation', () => {
	// eslint-disable-next-line no-return-assign
	afterEach(() => (favoriteRestaurants = []));

	itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
