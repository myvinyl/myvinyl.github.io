'use strict';

require('file-loader?name=[name].[ext]!./index.html');

import './css/style.css'
import $ from "jquery";
import csvUrl from './list.csv'

const SLEEVE_MAPPING = Object.freeze({
	none: "P",
	FS: "CS",
	plain: "P (plain only)",
	"plain?": "P (plain only?)"
});

const CSV_DELIMITER = /#/;

const ARTIST = 0;
const TITLE = 1;
const YEAR = 2;
const SLEEVE = 3;
const LABEL = 4;
const COMMENT = 5;

const SUBLIST_INDICATOR = 'List';
const SUBLIST_INDICATOR_INDEX = 0;
const SUBLIST_ANCHOR_INDEX = 1;

// do not process CSV header line
const LINES_TO_IGNORE = [0];

const displayFooter = itemCount => {
	$("#foot").append("(" + itemCount + " items)");
}

const displayContents = subListsAnchors => {
	let text = "<ul>";
	subListsAnchors.forEach(anchor => {
		text += '<li><a href="#' + anchor + '">' + anchor + '</a></li>'
	});
	text += "</ul>";

	$("#content").append(text);
}

const getItemIndexOrUndefined = (item, index) => item.length > index && item[index] && item[index] !== "" ? item[index].trim() : undefined;

const isSubListStart = item => item[SUBLIST_INDICATOR_INDEX] && item[SUBLIST_INDICATOR_INDEX].trim() === SUBLIST_INDICATOR;

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

const displayLists = data => {
	const subListsAnchors = [];
	let isEven = true, text = "", itemCount = 0;

	data.forEach(item => {
		if (!item || item.length === 0 || item[0].trim() === "") {
			return;
		}

		// add sublist header to output text

		if (isSubListStart(item)) {
			const subListAnchor = item[SUBLIST_ANCHOR_INDEX];
			if (subListAnchor === "") {
				return;
			}

			text += '<h2><a name="' + subListAnchor + '">' + subListAnchor + '</a></h2>';
			subListsAnchors.push(subListAnchor);

			return;
		}

		// display item to output text

		itemCount++;
		isEven = isEven ? false : true;
		text += "<div class='entry " + (isEven ? "even" : "odd") + "'>";
		text += createArtistTitle(item) + createYearLabel(item) + createSleeve(item) + createComment(item);
		text += "</div>";
	});

	$("#output").append(text);

	return { subListsAnchors, itemCount };
}

const splitLines = text => text.split(/\r\n|\r|\n/);

const splitLine = line => line.split(CSV_DELIMITER);

const csv2JsonArray = text => {
	const jsonArray = [];
	splitLines(text).filter((_, index) => !LINES_TO_IGNORE.includes(index)).forEach(lineText => jsonArray.push(splitLine(lineText)));
	return jsonArray;
}

fetch(csvUrl)
	.then(response => response.text())
	.then(data => {
		const { subListsAnchors, itemCount } = displayLists(csv2JsonArray(data));
		displayContents(subListsAnchors);
		displayFooter(itemCount);
	});