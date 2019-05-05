const Population = require('./population');
const Individual = require('./individual');
const config = require('../config');

module.exports = {
	evolve (population) {
		const newPopulation = new Population();

		console.log('Eletismo: ' + (config.elitismelitism ? 'Acontece' : 'Não acontece'));
		console.log('\n');
		// elitism
		let elitismOffSet = 0;
		if (config.elitism) {
			newPopulation.add(population.getFittest());
			elitismOffSet = 1;
		}

		console.log('############# Crossover #############');
		// crossover
		for (let i = elitismOffSet; i < population.size() / 2; i++) {
			console.log('---- Torneio ----');
			let parent1 = tournamentSelection(population);
			let parent2 = tournamentSelection(population);

			let child1 = crossover(parent1, parent2);
			let child2 = crossover(parent1, parent2, true);

			if (config.populationSize - newPopulation.size() == 1) {
				newPopulation.add(child1);
			} else {
				newPopulation.add(child1);
				newPopulation.add(child2);
			}

			console.log('\n');
			console.log('Parente 1: ' + parent1.printOnlyCities());
			console.log('Parente 2: ' + parent2.printOnlyCities());
			console.log('Filho 1: ' + child1.printOnlyCities());
			console.log('Filho 2: ' + child2.printOnlyCities());
			console.log('\n');
		}

		// mutate
		for (let i = elitismOffSet; i < newPopulation.size(); i++) {
			mutate(newPopulation.get(i));
		}

		console.log('---- Nova População ----');
		console.log(newPopulation.pritnOnylPupaltion());
		console.log('\n');
		return newPopulation;
	}
};

function tournamentSelection (population) {
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

function crossover (parent1, parent2, invert = false) {
	let child = new Individual();

	if (!invert) {
		firstCrossover(parent1, child);
		secondCrossover(parent2, child);
	} else {
		firstCrossover(parent2, child);
		secondCrossover(parent1, child);
	}

	return child;
}

function firstCrossover (parent, child) {
	let start = Math.floor(Math.random() * parent.size());
	let end = Math.floor(Math.random() * parent.size());

	if (start > end) {
		temp = start;
		start = end;
		end = temp;
	}

	// parent 1
	for (let i = start; i <= end; i++) {
		child.setCity(i, parent.getCity(i));
	}

	return child;
}

function secondCrossover (parent, child) {
	// parent 2
	for (let i = 0; i < parent.size(); i++) {
		// If child doesn't have the city add it
		if (!child.containsCity(parent.getCity(i))) {
			// Loop to find a spare position in the child's
			for (let j = 0; j < child.size(); j++) {
				// Spare position found, add city
				if (child.getCity(j) == undefined) {
					child.setCity(j, parent.getCity(i));
					break;
				}
			}
		}
	}
}

function mutate (individual) {
	// Loop through tour cities
	for (let cityPos1 = 0; cityPos1 < individual.size(); cityPos1++) {
		// Apply mutation rate
		if (Math.random() < config.mutationRate) {
			console.log('---- Mutação no ' + cityPos1 + 'º gene ----');
			console.log('Antes: ' + individual.printOnlyCities());
			// Get a second random position
			let cityPos2 = Math.floor(individual.size() * Math.random());
			console.log('Troca: ' + individual.getCity(cityPos1).name + ' com ' + individual.getCity(cityPos2).name);
			// Get the cities at target position
			let city1 = individual.getCity(cityPos1);
			let city2 = individual.getCity(cityPos2);

			// Swap
			individual.setCity(cityPos2, city1);
			individual.setCity(cityPos1, city2);
			console.log('Depois: ' + individual.printOnlyCities());
			console.log('\n');
		}
	}
}
