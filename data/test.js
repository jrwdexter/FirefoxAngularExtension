/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

let {devtools} = Components.utils.import('resource:///modules/devtools/gDevTools.jsm', {});

let selectedTab = gBrowser.selectedTab
let target = devtools.TargetFactory.forTab(gBrowser.selectedTab);
let toolbox = gDevTools.getToolbox(target);
let inspector = gDevTools.getToolbox(target);
let panels = inspector.getToolPanels();

let panelsArray = [];

for(var [key, value] of panels) {
  panelsArray.push({key, value});
}

panelsArray[0].value.sidebar.addTab('test', 'http://www.example.com');