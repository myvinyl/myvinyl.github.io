const SLEEVE_MAPPING = {
	none: "P",
	FS: "CS",
	plain: "P (plain only)",
	"plain?": "P (plain only?)"
};

const ARTISTS = 0;
const TITLE = 1;
const YEAR = 2;
const SLEEVE = 3;
const LABEL = 4;
const COMMENT = 5;

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

const getItemIndexOrUndefined = (item, index) => {
	return item.length > index && item[index] && item[index] !== "" ? item[index].trim() : undefined;
}

const displayLists = data => {
	const subListsAnchors = [];
	let isEven = true;
	let text = "";
	let itemCount = 0;

	data.forEach(item => {
		if (!item || item.length === 0 || item[0].trim() === "") {
			return;
		}

		// add sublist header to output text

		if (item[0].trim() === "List") {
			const subListAnchor = item[1];
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

		const artist = item[ARTIST];
		const title = item[TITLE];
		text += "<div class='entry " + (isEven ? "even" : "odd") + "'>" + artist.trim().toUpperCase() + " - " + title.trim().toUpperCase();

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

		let sleeve = getItemIndexOrUndefined(item, SLEEVE);
		if (sleeve) {
			const sleeveMapping = SLEEVE_MAPPING[sleeve];
			text += ", " + sleeveMapping ? sleeveMapping : sleeve;
		}

		const comment = getItemIndexOrUndefined(item, COMMENT);
		if (comment) {
			text += " (";
			text += comment.toUpperCase();
			text += ")";
		}

		text += "</div>";
	});

	$("#output").append(text);

	return { subListsAnchors, itemCount };
}

$(document).ready(function () {
	$.getJSON('list.json', data => {
		if (data === null) {
			console.log('no data');
			return;
		}      
		const { subListsAnchors, itemCount } = displayLists(data);
		displayContents(subListsAnchors);
		displayFooter(itemCount);
	});
});