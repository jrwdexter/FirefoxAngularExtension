let toolbox;
gDevTools.on('toolbox-ready', (d,t) => toolbox = t); // to account for: if inspector is current tab

let panel;
toolbox.on('inspector-selected', (d,p) => panel = p); // to account for: don't attach 'on' more than once

let node;
panel.selection.watch('_node', (e, oldNode, newNode) => {
    node = newNode;
    return newNode;
});

// Then, set window.$scope to angular.element(node).scope()