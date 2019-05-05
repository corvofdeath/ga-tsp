const Individual = require('./individual');
const shuffle = require('../utils/shuffle');
const cities = require('../cities').cities;

class Population {
	constructor (individuals) {
		this.individuals = individuals;
		this.individuals = [];
	}

	// a random start point
	init () {
		for (let i = 0; i < 8; i++) {
			let individual = new Individual();
			individual.setCities(shuffle(cities));
			this.individuals.push(individual);
		}

		console.log("############# População inicial #############");
		console.log(this.pritnOnylPupaltion());
		console.log("\n");
	}

	pritnOnylPupaltion() {
		const onlyCities = [];
		this.individuals.forEach(element => onlyCities.push(element.printOnlyCities()));

		return onlyCities;
	}

	getFittest () {
		let best;
		for (let i = 0; i < this.individuals.length - 1; i++) {
			const actual = this.individuals[i];
			const next = this.individuals[i + 1];

			if (actual.calculateFitness() <= next.calculateFitness()) best = actual;
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
