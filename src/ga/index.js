const Population = require('./population');
const Individual = require('./individual');
const config = require('../config');

module.exports = {
	evolve (population) {
		const newPopulation = new Population();

		console.log('Eletism: ' + this.elitism);
		// elitism
		let elitismOffSet = 0;
		if (config.elitism) {
			newPopulation.add(population.getFittest());
			elitismOffSet = 1;
		}

		console.log('############# Crossover #############');
		// crossover
		for (let i = elitismOffSet; i < population.size(); i++) {
			let parent1 = tournamentSelection(population);
			let parent2 = tournamentSelection(population);

			let child = crossover(parent1, parent2);
			newPopulation.add(child);

			console.log('Parente 1');
			parent1.printOnlyCities();
			console.log('Parente 2');
			parent2.printOnlyCities();
			console.log('Filho');
			child.printCities();
		}

		// mutate
		for (let i = elitismOffSet; i < newPopulation.size(); i++) {
			mutate(newPopulation.get(i));
		}

		console.log('Nova População');
		console.log(newPopulation.pritnOnylPupaltion());
		return newPopulation;
	}
};

function tournamentSelection (population) {
	console.log('Torneio');
	let tournament = new Population();

	for (let i = 0; i < config.tournamentSize; i++) {
		let random = Math.floor(Math.random() * population.size());
		tournament.add(population.get(random));
	}

	let best = tournament.getFittest();

	console.log(tournament.pritnOnylPupaltion());
	console.log('Melhor individuo: ' + best.printOnlyCities());
	return best;
}

function crossover (parent1, parent2) {
	let child = new Individual();

	let start = Math.floor(Math.random() * parent1.size());
	let end = Math.floor(Math.random() * parent1.size());

	// parent 1
	for (let i = 0; i < child.size(); i++) {
		// If our start position is less than the end position
		if (start < end && i > start && i < end) {
			child.setCity(i, parent1.getCity(i));
		} else if (start > end) {
			// If our start position is larger
			if (!(i < start && i > end)) {
				child.setCity(i, parent1.getCity(i));
			}
		}
	}

	// parent 2
	for (let i = 0; i < parent2.size(); i++) {
		// If child doesn't have the city add it
		if (!child.containsCity(parent2.getCity(i))) {
			// Loop to find a spare position in the child's tour
			for (let j = 0; j < child.size(); j++) {
				// Spare position found, add city
				if (child.getCity(j) == undefined) {
					child.setCity(j, parent2.getCity(i));
					break;
				}
			}
		}
	}

	return child;
}

function mutate (individual) {
	// Loop through tour cities
	for (let cityPos1 = 0; cityPos1 < individual.size(); cityPos1++) {
		// Apply mutation rate
		if (Math.random() < config.mutationRate) {
			// Get a second random position
			let cityPos2 = Math.floor(individual.size() * Math.random());

			// Get the cities at target position
			let city1 = individual.getCity(cityPos1);
			let city2 = individual.getCity(cityPos2);

			// Swap
			individual.setCity(cityPos2, city1);
			individual.setCity(cityPos1, city2);
		}
	}
}
