import './css/style.css';

import { retrieveData } from './fetch';
import { displayData } from './displayPlain';

require('file-loader?name=[name].[ext]!./index.html');

async function doIt() {
  const dataArray = await retrieveData();
  displayData(dataArray);
}

doIt();
