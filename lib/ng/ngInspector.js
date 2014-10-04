(function AngularInspector(){
    'use strict';
    var events = require('./events');
    var tabs = require('sdk/tabs');
    var data = require("sdk/self").data;
    var mod = require('sdk/page-mod');

    /**
     * The InspectorUtils singleton, which gets exported for use with the full module.
     * Contains any functionality with respect to enhancing the dev tools inspector
     * experience when working with Angular controllers.
     * @class Extends the dev tools API with functionalities for interacting with
     * angular controllers.
     * @return {InspectorUtils}
     */
    var InspectorUtils = function() {};
    console.log(typeof(events.ngListener));

    /**
     * Activate the Angular controller functionality of the inspector panel.
     * @param  {gDevTools} gDevTools The dev tools API object from Firefox.
     * @public
     * @return {void}
     */
    InspectorUtils.prototype.attachToolbox = function attachToolbox(gDevTools) {
        console.log('attaching to toolbox');
        var connectToolbox = this._connectToolbox.bind(this);
        gDevTools.on('toolbox-ready', (d, toolbox) => {
            // gDevTools.off('toolbox-ready', litener);
            connectToolbox(toolbox);
        });
    };

    /**
     * Called when the toolbox is activated, or opened for the first time.
     * @private
     * @method _connectToolbox
     * @extends {ngListener}
     * @param  {toolbox} toolbox The that is being activated.
     * @return {void}
     */
    InspectorUtils.prototype._connectToolbox = function _connectToolbox(toolbox) {
        console.log('connecting');
        var inspectorSelected = this._inspectorSelected.bind(this);
        toolbox.on('inspector-selected', (d, panel) => {
            console.log('inspector selected');
            inspectorSelected(panel);
        });
    };
    // InspectorUtils.prototype._connectToolbox.prototype = new events.ngListener();

    /**
     * Called when the inspector is selected.  Attaches the _updateWindowScope method.
     * @private
     * @method  _inspectorSelected
     * @extends {ngListener}
     * @param  {Panel}  panel The firefox devtools panel being selected.
     * @return {void}
     */
    InspectorUtils.prototype._inspectorSelected = function _inspectorSelected(panel) {
        console.log('inspector');
        if(panel.sidebar.getTab('angular') === null) {
            console.log(data.url('scopeInspector/scope.xhtml'));
            panel.sidebar.addTab('angular', data.url('scopeInspector/scope.xhtml'));
        }
        var updateWindowScopeHandler = this._updateWindowScope.bind(this);
        panel.selection.watch('_node', (e, oldNode, newNode) => {
            return updateWindowScopeHandler(panel, newNode);
        });
    };

    /**
     * Called when an item within the inspector is selected.
     * Updates $window.scope with the current scope object.
     * @private
     * @method  _updateWindowScope
     * @extends {ngListener}
     * @param  {Element} node The node that has been selected.
     * @return {void}
     */
    InspectorUtils.prototype._updateWindowScope = function _updateWindowScope(panel, node) {
        console.log(this._getElementXPath(node));
        var worker = tabs.activeTab.attach({
            contentScriptFile: [data.url('updateConsole.j.js')],
        });
        worker.port.emit('nodeChanged', this._getElementXPath(node));
        return node;
    };

    InspectorUtils.prototype._getElementXPath = function _getElementXPath(element)
    {
        if (element && element.id)
            return '//*[@id="' + element.id + '"]';
        else
            return this.getElementTreeXPath(element);
    };

    InspectorUtils.prototype._getElementXPath = function _getElementXPath(element)
    {
        var paths = [];

        // Use nodeName (instead of localName) so namespace prefix is included (if any).
        for (; element && element.nodeType == 1; element = element.parentNode)
        {
            var index = 0;
            for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
            {
                // Ignore document type declaration.
                if (sibling.nodeType == 10)
                    continue;

                if (sibling.nodeName == element.nodeName)
                    ++index;
            }

            var tagName = element.nodeName.toLowerCase();
            var pathIndex = (index ? "[" + (index+1) + "]" : "");
            paths.splice(0, 0, tagName + pathIndex);
        }

        return paths.length ? "/" + paths.join("/") : null;
    };

    InspectorUtils.prototype._addVariablesPanel = function _addVariablesPanel(panel) {

    };

    exports.InspectorUtils = new InspectorUtils();
})();