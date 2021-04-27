'use strict';

require('file-loader?name=[name].[ext]!./index.html');

import './css/style.css'
 
import { retrieveData } from './fetch.js'
import { displayData } from './displayPlain.js'

async function doIt() {
	const dataArray = await retrieveData();
	displayData(dataArray);
}

doIt();