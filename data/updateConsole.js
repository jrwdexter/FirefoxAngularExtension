/**
 * Update the console's window.$scope element when an item is selected.
 *
 * @event nodeChanged
 * @param  {string} xpath The xpath to the current node.  The node itself isn't used as it isn't passed correctly.
 */
self.port.on('nodeChanged', function(xpath) {
    var node = document.evaluate(xpath, document, null, 9, null).singleNodeValue;
    if(unsafeWindow.angular) {
        unsafeWindow.$scope = unsafeWindow.angular.element(node).scope();
    }
});
