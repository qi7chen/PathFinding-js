
import './styles/style.css'
import Panel from './panel.js'
import Controller from './controller.js'

$(document).ready(function() {
    console.log('document is ready')
    // suppress select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });

    // initialize visualization
    Panel.init();
    Controller.init();
});

