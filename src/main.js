
import { createApp } from "vue";
import App from './App.vue'
import './styles/style.css'
import './themes/jquery.ui.all.css'
import './ui/jquery.ui.core.min.js'
import './ui/jquery.ui.widget.min.js'
import './ui/jquery.ui.mouse.min.js'
import './ui/jquery.ui.draggable.min.js'
import './ui/jquery.ui.accordion.min.js'
import './ui/jquery.ui.slider.min.js'


// $(document).ready(function() {
//     console.log('document is ready')
//     // suppress select events
//     $(window).bind('selectstart', function(event) {
//         event.preventDefault();
//     });
//
//     // initialize visualization
//     //Panel.init();
//     //Controller.init();
// });

function setupApp() {
    const app = createApp(App)
    app.mount('#app')
}

setupApp()