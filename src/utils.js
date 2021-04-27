'use strict';

import $ from "jquery"

const SLEEVE_MAPPING = Object.freeze({
	none: "P",
	FS: "CS",
	plain: "P (plain only)",
	"plain?": "P (plain only?)"
});

const ARTIST = 0;
const TITLE = 1;
const YEAR = 2;
const SLEEVE = 3;
const LABEL = 4;
const COMMENT = 5;

const getItemIndex = (item, index) => item.length > index && item[index] && item[index] !== "" ? item[index].trim() : undefined;

export const createArtistTitle = item => {
	const artist = item[ARTIST];
	const title = item[TITLE];
	return artist.trim().toUpperCase() + " - " + title.trim().toUpperCase();
}

export const createYearLabel = item => {
	let text = '';
	const year = getItemIndex(item, YEAR);
	const label = getItemIndex(item, LABEL);
	if (year || label) {
		text += " (";
		if (year)
			text += year;
		if (year && label)
			text += " ";
		if (label)
			text += label.toUpperCase();
		text += ")";
	}
	return text;
}

export const createComment = item => {
	const comment = getItemIndex(item, COMMENT);
	if (comment) {
		return " (" + comment.toUpperCase() + ")";
	}
	return '';
}

export const createSleeve = item => {
	const sleeve = getItemIndex(item, SLEEVE);
	if (sleeve) {
		const sleeveMapping = SLEEVE_MAPPING[sleeve];
		return ", " + (sleeveMapping ?? sleeve);
	}
	return '';
}
