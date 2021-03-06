import $ from 'jquery';

import {
  createArtistTitle,
  createYearLabel,
  createSleeve,
  createComment,
  createSearchLink,
} from './utils';

const displayFooter = (itemCount) => {
  $('#foot').append('(' + itemCount + ' items)');
};

const displayContents = (subListsAnchors) => {
  let text = '<ul>';
  subListsAnchors.forEach((anchor) => {
    text += '<li><a href="#' + anchor + '">' + anchor + '</a></li>';
  });
  text += '</ul>';

  $('#content').append(text);
};

const displayLists = (dataArray) => {
  let isEven = true,
    text = '';
  dataArray.forEach((subList) => {
    text += '<h2><a name="' + subList.name + '">' + subList.name + '</a></h2>';
    subList.items.forEach((item) => {
      isEven = isEven ? false : true;
      text += "<div class='entry " + (isEven ? 'even' : 'odd') + "'>";
      text +=
        createArtistTitle(item) +
        createYearLabel(item) +
        ', ' +
        createSleeve(item) +
        ' ' +
        createComment(item) +
        ' ' +
        createSearchLink(item);
      text += '</div>';
    });
  });
  $('#output').append(text);
};

export const displayData = (dataArray) => {
  displayLists(dataArray);
  displayContents(dataArray.map((sublist) => sublist.name));
  displayFooter(
    dataArray.reduce((acc, sublist) => acc + sublist.items.length, 0)
  );
};
