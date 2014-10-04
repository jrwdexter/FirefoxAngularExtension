(function Initialize(){
    'use strict';
    // Requires
    let {Cc, Ci, Cu} = require('chrome');
    // let pageMod = require('sdk/page-mod');
    let ngControllers = require('./ng/ngInspector'); 
    let devTools = Cu.import("resource:///modules/devtools/gDevTools.jsm").gDevTools;

    ngControllers.InspectorUtils.attachToolbox(devTools);
})();