
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
      <ag-grid-vue
            style="width: 80%; height: 500px;"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :rowData="rowData">
      </ag-grid-vue>
    <div class="row at-row flex-center flex-middle">
      <div class="col-lg-24">
        <at-button @click="submitRatings" class="rate-submit" icon="icon-check" hollow>&nbsp;&nbsp;SUBMIT&nbsp;&nbsp;</at-button>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from 'ag-grid-vue';

export default {
  data () {
    return {
      headerImage: "",
      subtitle: "",
      userIp: "",
      items: [],
      errors: [],
      columnDefs : null,
      rowData : [],
    }
  },
    components: {
        AgGridVue
    },
    created() {
      axios.get("/api/sites/en")
        .then(response => {
          return axios.get("/api/baskets") 
        })
        .then(response => {
          this.items = response.data.payload
          this.$Notify({ title: 'Ready to Rate', message: 'Data Retrieved', type:'success' })

          for(var i in this.items){
            this.rowData.push({make : this.items[i].name, price : 35000});
          }

          console.log(this.items);
          // hardcoding this for now
          this.userIp = '127.0.0.1'
        })
        .catch(e => {
          // lets console errors, but turn the notify off
          console.log(e);
          // this.$Notify({ title: 'ERROR', message: e, type:'error' })
          this.errors.push(e)
        })

    },
    beforeMount() {
        this.columnDefs = [
            { field: 'make' },
            { field: 'price' }
        ];
    },
    methods: {
      rateHero: function (id, name, event) {
        if (name === 'Batman' && event > 3.5) {
          this.$Notify({ title: `Seriously?`, message: `He's just a rich guy. Zero super powers. Altrustic? Yes. Not a Superhero. Are you a PM?`, type: 'warning', duration: 10000 })
        }
        
        if (name === 'Cristiano Ronaldo' && event > 3.5) {
          this.$Notify({ title: `Seriously?`, message: `While you voted, Ronaldo just took another dive...`, type: 'warning', duration: 10000 })
        }
      },
      submitRatings() {
        var rate = {}
        var refs = this.$refs
        var router = this.$router
        rate["userIp"] = this.userIp
        rate["ratings"] = []
        
        for (var h in refs) {
          rate.ratings.push({ id: h, rating: Number( refs[h][0].currentValue || 0 ) })
        }   

        axios.post("/api/rate", rate)
        .then(response => {
          router.push('leaderboard')
        })
        .catch(e => {
          this.errors.push(e)
        })

      }
    }
  };
</script>