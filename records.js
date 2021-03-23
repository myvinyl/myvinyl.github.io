const SLEEVE_MAPPING = {
	none: "P",
	FS: "CS",
	plain: "P (plain only)",
	"plain?" : "P (plain only?)"
};

$(document).ready(function () {
	const subListsAnchors = [];
	let isEven = true;
	let text = "";
	let itemCount = 0;

	for (let i = 0; i < data.length; i++) {

		isEven = isEven ? false : true;
		const item = data[i];

		if (!item || item.length === 0 || item[0].trim() === "") {
			continue;
		}

		if (item[0].trim() === "List") {
			const subListAnchor = item[1];
			if (subListAnchor === "") {
				continue;
			}

			text += '<h2><a name="' + subListAnchor + '">' + subListAnchor + '</a></h2>';
			subListsAnchors.push(subListAnchor);

			continue;
		}

		itemCount++;

		const artist = item[0].toUpperCase().trim();
		const title = item[1].toUpperCase().trim();
		let sleeve = item[3].toUpperCase();
		const sleeveMapping = SLEEVE_MAPPING[sleeve];
		sleeve = sleeveMapping ? sleeveMapping : sleeve;

		text += "<div class='entry " + (isEven ? "even" : "odd") + "' id=id" + i + ">" + artist + " - " + title;
		if (item.length > 2 && item[2] && item[2] !== "" || item.length > 4 && item[4] && item[4] !== "") {
			text += " (";
			if (item[2] && item[2] != "")
				text += item[2];
			if (item.length > 4 && item[2] && item[2] !== "" && item[4] && item[4] !== "")
				text += " ";
			if (item.length > 4 && item[4] && item[4] !== "")
				text += item[4].toUpperCase();
			text += ")";
		}
		if (sleeve && sleeve !== "") {
			text += ", " + sleeve;
		}
		// comment
		if (item.length > 5 && item[5] && item[5] !== "") {
			text += " (";
			text += item[5].toUpperCase();
			text += ")";
		}

		text += "</div>";
	}

	$("#output").append(text);

	text = "<ul>";
	for (let i = 0; i < subListsAnchors.length; i++) {
		const anchor = subListsAnchors[i];
		text += '<li><a href="#' + anchor + '">' + anchor + '</a></li>';
	}
	text += "</ul>";

	$("#content").append(text);

	$("#foot").append("(" + itemCount + " items)");

});