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

export const displayFooter = itemCount => {
	$("#foot").append("(" + itemCount + " items)");
}

export const displayContents = subListsAnchors => {
	let text = "<ul>";
	subListsAnchors.forEach(anchor => {
		text += '<li><a href="#' + anchor + '">' + anchor + '</a></li>'
	});
	text += "</ul>";

	$("#content").append(text);
}

const getItemIndexOrUndefined = (item, index) => item.length > index && item[index] && item[index] !== "" ? item[index].trim() : undefined;

const createArtistTitle = item => {
	const artist = item[ARTIST];
	const title = item[TITLE];
	return artist.trim().toUpperCase() + " - " + title.trim().toUpperCase();
}

const createYearLabel = item => {
	let text = '';
	const year = getItemIndexOrUndefined(item, YEAR);
	const label = getItemIndexOrUndefined(item, LABEL);
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

const createComment = item => {
	const comment = getItemIndexOrUndefined(item, COMMENT);
	if (comment) {
		return " (" + comment.toUpperCase() + ")";
	}
	return '';
}

const createSleeve = item => {
	const sleeve = getItemIndexOrUndefined(item, SLEEVE);
	if (sleeve) {
		const sleeveMapping = SLEEVE_MAPPING[sleeve];
		return ", " + (sleeveMapping ?? sleeve);
	}
	return '';
}

export const displayLists = dataArray => {
	let isEven = true, text = "";
	dataArray.forEach(subList => {
		text += '<h2><a name="' + subList.name + '">' + subList.name + '</a></h2>';
		subList.items.forEach(item => {
			isEven = isEven ? false : true;
			text += "<div class='entry " + (isEven ? "even" : "odd") + "'>";
			text += createArtistTitle(item) + createYearLabel(item) + createSleeve(item) + createComment(item);
			text += "</div>";
		});
	});
	$("#output").append(text);
}
