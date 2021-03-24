const SLEEVE_MAPPING = {
	none: "P",
	FS: "CS",
	plain: "P (plain only)",
	"plain?": "P (plain only?)"
};

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

		const artist = item[0].trim().toUpperCase();
		const title = item[1].trim().toUpperCase();
		let sleeve = item[3].trim().toUpperCase();
		const sleeveMapping = SLEEVE_MAPPING[sleeve];
		sleeve = sleeveMapping ? sleeveMapping : sleeve;
		text += "<div class='entry " + (isEven ? "even" : "odd") + "'>" + artist + " - " + title;

		const year = item.length > 2 && item[2] && item[2] !== "" ? item[2].trim() : undefined;
		const label = item.length > 4 && item[4] && item[4] !== "" ? item[4].trim() : undefined;
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

		if (sleeve && sleeve !== "") {
			text += ", " + sleeve;
		}

		const comment = item.length > 5 && item[5] && item[5] !== "" ? item[5].trim() : undefined;
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