function clone (array) {
	const newArray = [];
	array.forEach(e => newArray.push(Object.assign({}, e)));

	return newArray;
}

module.exports = function (array) {
	const newArray = clone(array);

	for (var i = newArray.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = newArray[i];
		newArray[i] = newArray[j];
		newArray[j] = temp;
	}

	return newArray;
};
