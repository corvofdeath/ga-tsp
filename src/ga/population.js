const Individual = require('./individual');
const shuffle = require('../utils/shuffle');
const cities = require('../cities').cities;
const config = require('../config');

class Population {
	constructor (individuals) {
		this.individuals = individuals;
		this.individuals = [];
	}

	// a random start point
	init () {
		for (let i = 0; i < config.populationSize; i++) {
			let individual = new Individual();
			individual.setCities(shuffle(cities));
			this.individuals.push(individual);
		}

		console.log('############# População inicial #############');
		console.log(this.pritnOnylPupaltion());
		console.log('\n');
	}

	pritnOnylPupaltion () {
		const onlyCities = [];
		this.individuals.forEach(element => onlyCities.push(element.printOnlyCities()));

		return onlyCities;
	}

	getFittest () {
		let best = this.individuals[0];

		for (let i = 1; i < this.individuals.length; i++) {
			if (best.calculateFitness() <= this.individuals[i].calculateFitness()) best = this.individuals[i];
		}

		return best;
	}

	size () {
		return this.individuals.length;
	}

	get (index) {
		return this.individuals[index];
	}

	add (individual) {
		this.individuals.push(individual);
	}

	printIndividuals () {
		this.getFittest().printCities();
	}
}

module.exports = Population;
