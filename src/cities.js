const distances = [
	//A  B   C   D   E   F   G   H
	[ 0, 42, 61, 30, 17, 82, 31, 11 ],
	[ 42, 0, 14, 87, 28, 70, 19, 33 ],
	[ 61, 14, 0, 20, 81, 21, 08, 29 ],
	[ 30, 87, 20, 0, 34, 33, 91, 10 ],
	[ 17, 28, 81, 34, 0, 41, 34, 82 ],
	[ 82, 70, 21, 33, 41, 0, 19, 32 ],
	[ 31, 19, 08, 91, 34, 19, 0, 59 ],
	[ 11, 33, 29, 10, 82, 32, 59, 0 ]
];

exports.getDistance = (x, y) => {
	return distances[x][y];
};

exports.cities = [
	{
		name  : 'A',
		index : 0
	},
	{
		name  : 'B',
		index : 1
	},
	{
		name  : 'C',
		index : 2
	},
	{
		name  : 'D',
		index : 3
	},
	{
		name  : 'E',
		index : 4
	},
	{
		name  : 'F',
		index : 5
	},
	{
		name  : 'G',
		index : 6
	},
	{
		name  : 'H',
		index : 7
	}
];
