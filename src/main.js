'use strict';

require('file-loader?name=[name].[ext]!./index.html');

import './css/style.css'
 
import { retrieveData } from './fetch.js'
import { displayLists, displayContents, displayFooter } from './display.js'

async function doIt() {
	const dataArray = await retrieveData();
	displayLists(dataArray);
	displayContents(dataArray.map(sublist => sublist.name));
	displayFooter(dataArray.reduce((acc, sublist) => acc + sublist.items.length, 0));
}

doIt();