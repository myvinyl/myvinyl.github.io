const SLEEVE_MAPPING = {
	none: "P",
	FS: "CS",
	plain: "P (plain only)",
	"plain?": "P (plain only?)"
};

const displayFooter = itemCount => {
	$("#foot").append("(" + itemCount + " items)");
}

const displayContent = subListsAnchors => {
	let text = "<ul>";
	subListsAnchors.forEach(anchor => {
		text += '<li><a href="#' + anchor + '">' + anchor + '</a></li>'
	});
	text += "</ul>";

	$("#content").append(text);
}

$(document).ready(function () {
	const subListsAnchors = [];
	let isEven = true;
	let text = "";
	let itemCount = 0;

	data.forEach(item => {
		if (!item || item.length === 0 || item[0].trim() === "") {
			return;
		}

		if (item[0].trim() === "List") {
			const subListAnchor = item[1];
			if (subListAnchor === "") {
				return;
			}

			text += '<h2><a name="' + subListAnchor + '">' + subListAnchor + '</a></h2>';
			subListsAnchors.push(subListAnchor);

			return;
		}

		itemCount++;
		isEven = isEven ? false : true;

		const artist = item[0].trim().toUpperCase();
		const title = item[1].trim().toUpperCase();
		let sleeve = item[3].trim().toUpperCase();
		const sleeveMapping = SLEEVE_MAPPING[sleeve];
		sleeve = sleeveMapping ? sleeveMapping : sleeve;

		text += "<div class='entry " + (isEven ? "even" : "odd") + "'>" + artist + " - " + title;
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
	});

	$("#output").append(text);

	displayContent(subListsAnchors);
	displayFooter(itemCount);
});