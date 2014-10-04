(function ScopeViewer() {
    "use strict";

    function ScopeView() {
    }

    ScopeView.prototype = {
        initialize: function() {
            new VariablesView();
        }
    };

    var scopeView = new ScopeView();
    scopeView.initialize();
})();
