<template>
  <section>
    <div class="row at-row flex-center flex-middle">
      <div class="col-lg-24">
        <a href="/"><img class="super-justice" :src="headerImage"></a>
      </div>
    </div>
    <div class="row at-row flex-center flex-middle">
      <div class="col-lg-24">
        <h1 class="super-header">{{subtitle}}</h1>
      </div>
    </div>
    <div class="row at-row flex-center flex-middle">
    <div>
      <span v-for="n in 10">
        <at-button v-on:click = "addToCartHandler" icon="icon-star" class="mid-btn" type="success"  hollow>Order</at-button>
       </span>

    </div>
        <ul id="example-1">
      <li v-for="item in items" :key="item.message">
              
      </li>
    </ul>
      <div class="col-lg-3">
      </div>
      <div class="col-lg-3">
      </div>
    </div>
    <div class="row at-row flex-center flex-middle">
      <div class="col-lg-24">
      </div>
      </div>
  </section>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

var routerThis = undefined

export default {
  data() {
    return {
      headerImage: "",
      subtitle: "",
      errors: []
    };
  },
  created() {
    Vue.use(VuejsDialog);
    axios.get("/api/sites/EN")  
      .then(response => {
        console.log(response);
        var page = response.data.payload.pages.Home
        document.title = page.title
        this.headerImage = page.headerImage
        this.subtitle = page.subtitle
      }).catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    link(rel) {
      this.$router.push({ name: rel });
    },

    addToCartHandler(event){
      routerThis = this;
      let message = "Are you sure?";
 
      let options = {
          html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
          loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
          reverse: false, // switch the button positions (left to right, and vise versa)
          okText: 'Confirm',
          cancelText: 'Close',
          animation: 'zoom', // Available: "zoom", "bounce", "fade"
          type: 'basic', // coming soon: 'soft', 'hard'
          verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
          verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
          clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
          backdropClose: false, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
          customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      };

      Vue.dialog.confirm(message, options)
          .then(function () {
            routerThis.$router.push({ name: 'Yrk' });
          })
          .catch(function () {
          });
    },

    
  }
};


</script>