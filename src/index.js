/**
 * Genetic Algorithm to solve The Travelling Salesman Problem.
 * Based on Becky Johnson Medium Post with changes on Selection Method.
 * https://medium.com/@becmjo/genetic-algorithms-and-the-travelling-salesman-problem-d10d1daf96a1
 */

const ga = require('./ga');
const Population = require('./ga/population');
const config = require('./config');

let population = new Population();
population.init();
const initialDistance = population.getFittest().calculateFitness();

console.log('Initial distance: ' + initialDistance);
console.log('############# Novas Gerações #############');
// Evolve population for 100 generations
for (let i = 0; i < config.generations; i++) {
	console.log('=> ' + (i + 1) + 'º Geração');
	population = ga.evolve(population);
}

console.log('Initial distance: ' + initialDistance);
console.log('Final distance: ' + population.getFittest().calculateFitness());
console.log('Solution:');
population.printIndividuals();
