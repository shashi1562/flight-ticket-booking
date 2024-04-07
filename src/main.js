import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; // Vuesax
import "material-icons/iconfont/material-icons.css"; //Material Icons
import '../src/assets/main.css';

Vue.use(Vuesax);
Vue.config.productionTip = false;
document.title = "GBI Flights";

new Vue({
  render: h => h(App)
}).$mount("#app");

