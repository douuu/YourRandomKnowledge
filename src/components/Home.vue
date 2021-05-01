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
      <v-card class="mb-2" tile="">
                 <v-row align="start" v-for="n in items">
                    <v-col class="shrink">
                         <img id = "product" :src="n.img" class="ml-3"></v-img>
                    </v-col>
                 </v-row>
                 <v-row align="start" v-for="n in items">
                    <v-col class="shrink">
                         <at-button :id = "n.uid" v-on:click = "addToCartHandler" icon="icon-star" class="mid-btn" type="success"  hollow>ADD TO CART</at-button>
                    </v-col>
                 </v-row>
         </v-card>

         

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
      errors: [],
      items: []
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
        return axios.get("/api/items");
      }).then(response => {

        this.items = response.data.payload
        this.$Notify({ title: 'Ready to Rate', message: 'Data Retrieved', type:'success' })

        console.log(this.items);
        // hardcoding this for now
        this.userIp = '127.0.0.1';
      })
      .catch(e => {
        // lets console errors, but turn the notify off
        console.log(e);
        // this.$Notify({ title: 'ERROR', message: e, type:'error' })
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
      let product_id = event.originalTarget.parentElement.id;

      console.log(product_id);

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
          axios.post('http://localhost:3000/api/check',
          {
            id : product_id,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
            routerThis.$router.push({ name: 'Yrk' });
          })
          .catch(function () {
          });
    },

    
  }
};


</script>