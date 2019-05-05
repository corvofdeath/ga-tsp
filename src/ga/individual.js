const distance = require('../cities').getDistance;

class Individual {
	constructor (permutation, fitness) {
		this.fitness = fitness;
		this.permutation = permutation;

		this.permutation = new Array(8);
	}

	setCities (cities) {
		this.permutation = cities;
	}

	addCity (city) {
		this.permutation.push(city);
	}

	setCity (index, city) {
		this.permutation[index] = city;
	}

	getCity (index) {
		return this.permutation[index];
	}

	size () {
		return this.permutation.length;
	}

	containsCity (city) {
		for (let a of this.permutation) {
			if (a && a.name === city.name) return true;
		}

		return false;
	}

	printCities () {
		console.log(this.permutation);
	}

	printOnlyCities () {
		const cities = [];
		this.permutation.forEach(element => cities.push(element.name));
		return cities;
	}

	/**
	 * Calculate the total distance between each city.
	 * The less value, the better.
	 */
	calculateFitness () {
		if (this.fitness && this.fitness !== 0) return this.fitness;

		this.fitness = 0;
		for (let i = 0; i < this.permutation.length - 1; i++) {
			let city = this.permutation[i];
			let nextCity = this.permutation[i + 1];
			this.fitness += distance(city.index, nextCity.index);
		}

		return this.fitness;
	}
}

module.exports = Individual;
