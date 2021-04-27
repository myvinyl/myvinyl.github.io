'use strict';

import csvUrl from './list.csv'

const CSV_DELIMITER = /#/;

const SUBLIST_INDICATOR = 'List';
const SUBLIST_INDICATOR_INDEX = 0;
const SUBLIST_NAME_INDEX = 1;

// do not process CSV header line
const LINES_TO_IGNORE = [0];

const isSubListStart = item => item[SUBLIST_INDICATOR_INDEX] && item[SUBLIST_INDICATOR_INDEX].trim() === SUBLIST_INDICATOR;

const splitLines = text => text.split(/\r\n|\r|\n/);

const splitLine = line => line.split(CSV_DELIMITER);

const csv2JsonArray = text => {
	const helpArray = [];
	splitLines(text).filter((_, index) => !LINES_TO_IGNORE.includes(index)).forEach(lineText => helpArray.push(splitLine(lineText)));

	const resultArray = [];
	let sublist;
	helpArray.forEach(item => {
		if (!item || item.length === 0 || item[0].trim() === "") {
			return;
		}

		if (isSubListStart(item)) {
			const subListName = item[SUBLIST_NAME_INDEX];
			if (subListName === "") {
				return;
			}

			sublist = { name: subListName, items: [] };
			resultArray.push(sublist);
		} else {
			sublist.items.push(item);
		}
	});
	return resultArray;
}

export const retrieveData = async () => {
	try {
		const response = await fetch(csvUrl);
		const cvsData = await response.text();
		return csv2JsonArray(cvsData);
	} catch (err) {
		console.log(err);
	}
};
