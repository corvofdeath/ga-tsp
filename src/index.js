/**
 * Generic Algorithm to solve The Travelling Salesman Problem.
 * Based on Becky Johnson Medium Post with changes on Selection Method.
 * https://medium.com/@becmjo/genetic-algorithms-and-the-travelling-salesman-problem-d10d1daf96a1
 */

const ga = require('./ga');
const Population = require('./ga/population');

let population = new Population();
population.init();

console.log('Initial distance: ' + population.getFittest().calculateFitness());

// Evolve population for 100 generations
for (let i = 0; i < 100; i++) {
	population = ga.evolve(population);
}

console.log('Final distance: ' + population.getFittest().calculateFitness());
console.log('Solution:');
population.printIndividuals();
