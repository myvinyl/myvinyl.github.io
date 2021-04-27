'use strict';

require('file-loader?name=[name].[ext]!./index.html');

import './css/style.css'
 
import { retrieveData } from './fetch.js'

retrieveData();