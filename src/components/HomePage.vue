<template>
  <div>
    <div style="background:#FFF7FC">
      <vs-navbar class="nabarx">
        <div slot="title">
          <vs-navbar-title style="margin-top:1%;letter-spacing:2px;font-weight:700;line-height: 21px;">
            <vs-icon icon="flight"></vs-icon>
            GBI Flights
          </vs-navbar-title>
        </div>
      </vs-navbar>
    </div>
    <div class="bg-color" v-if="show_searched_data">
      <vs-row>
        <vs-col vs-offset="1" vs-w="4" vs-xs="12" vs-s="12" class="mt-2 header1">
          <p style="color:#fff;letter-spacing: 2px;margin:0px;display: flex;justify-content: flex-start;">WHERE WOULD
            YOU</p>
          <p style="color:#fff;letter-spacing: 2px;display: flex;justify-content: flex-start;"><b>LIKE TO GO ?</b></p>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-offset="1" vs-w="11">
          <vs-select class="selectExample" label="From" placeholder="Select Origin" v-model="origin">
            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item, index) in countries" />
          </vs-select>
          <vs-icon icon="height" color="light" class="height-icon"></vs-icon>
        </vs-col>
        <vs-col vs-offset="1" vs-w="11" class="mt-2">
          <vs-select class="selectExample" label="To" placeholder="Select Destination" v-model="destination">
            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item, index) in countries" />
          </vs-select>
        </vs-col>
        <vs-col vs-offset="1" vs-w="11" vs-type="flex" vs-justify="flex-start" vs-align="flex-end"><vs-button
            color="warning" type="filled" class="mt-4" @click="selectValidation()">SEARCH NOW</vs-button></vs-col>
      </vs-row>
    </div>
    <div class="bg-color" v-else>
      <vs-row vs-type="flex" vs-justify="flex-start" class="flight-card">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6" vs-xs="11" vs-s="11" class="mt-4">
          <vs-card>
            <div slot="header" style="display: flex;justify-content: start;">
              <vs-button @click="goBack()" color="#8B93FF" type="filled" icon="keyboard_backspace"></vs-button>
              <span class="card-title">{{ searched_data[0].origin }} - {{ searched_data[0].destination }}</span>
            </div>
            <span style="float: right;display: flex;align-items: center;margin-bottom:5px"><vs-button style="margin-right:5px" color="success" type="filled" radius size="small" icon="filter_alt" @click="sortByDurationAsc()"></vs-button>Fastest</span>
            <div class="mt-4">
              <ul v-for="filter in searched_data" :key="filter.company">
                <vs-row>
                  <vs-col vs-w="2" vs-type="flex" vs-justify="flex-end"><vs-avatar size="large" color="#8B93FF" :text="filter.company" /></vs-col>
                  <vs-col vs-w="3"><span style="font-weight: bold;">{{getInTime(filter.departureTime)}}</span> <br>{{getShortCut(filter.origin)}} {{ getInDate(filter.departureTime) }}</vs-col>
                  <vs-col vs-w="4"><vs-divider color="dark">{{convertToMins(filter.duration)}}</vs-divider></vs-col>
                  <vs-col vs-w="3"><span style="font-weight: bold;">{{getInTime(filter.arrivalTime)}}</span> <br>{{ getShortCut(filter.destination) }} {{ getInDate(filter.arrivalTime) }}</vs-col>
                  <vs-col vs-offset="1" vs-w="5" vs-type="flex" vs-justify="flex-start" class="mt-2">{{filter.company}}</vs-col>
                </vs-row>
                <hr>
              </ul>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
    <img src="../assets/flight.webp" alt="" class="flight-png">
  </div>
</template>

<script>
import moment from 'moment';
export default {
  mounted() {
    this.getDropdownData();
  },
  data() {
    return {
      show_searched_data: true,
      countries: [],
      origin: null,
      destination: null,
      searched_data: [],
      flights_data: [
        {
          "id": "fc704c16fd79",
          "company": "US Airlines",
          "points": 25000,
          "duration": 590,
          "segment": [
            {
              "duration": 590,
              "departureTime": "2023-10-10T21:30-03:00",
              "arrivalTime": "2023-10-11T06:20-04:00",
              "origin": "Sao Paulo",
              "destination": "New York"
            }
          ]
        },
        {
          "id": "fc704c16fd75",
          "company": "UK Airlines",
          "points": 25000,
          "duration": 590,
          "segment": [
            {
              "duration": 590,
              "departureTime": "2023-10-10T21:30-06:00",
              "arrivalTime": "2023-10-11T06:20-11:00",
              "origin": "London",
              "destination": "New York"
            }
          ]
        },
        {
          "id": "fc704c16fd56",
          "company": "German Airlines",
          "points": 25000,
          "duration": 590,
          "segment": [
            {
              "duration": 590,
              "departureTime": "2023-10-10T21:30-08:00",
              "arrivalTime": "2023-10-11T06:20-11:00",
              "origin": "Germany",
              "destination": "New York"
            }
          ]
        },
        {
          "id": "3fe21e46fd78",
          "company": "Dalta",
          "points": 20000,
          "duration": 862,
          "segment": [
            {
              "duration": 635,
              "departureTime": "2023-10-16T20:25-03:00",
              "arrivalTime": "2023-10-17T06:00-04:00",
              "origin": "Sao Paulo",
              "destination": "Toronto",
              "connectionDuration": 125
            },
            {
              "duration": 102,
              "departureTime": "2023-10-17T08:05-04:00",
              "arrivalTime": "2023-10-17T09:47-04:00",
              "origin": "Toronto",
              "destination": "New York"
            }
          ]
        },
        {
          "id": "8bf2b3d7be09",
          "company": "Aviana",
          "points": 17000,
          "duration": 1050,
          "segment": [
            {
              "duration": 515,
              "departureTime": "2023-10-10T21:25-03:00",
              "arrivalTime": "2023-10-11T05:00-04:00",
              "origin": "Sao Paulo",
              "destination": "Miami",
              "connectionDuration": 145
            },
            {
              "duration": 192,
              "departureTime": "2023-10-11T07:25-04:00",
              "arrivalTime": "2023-10-11T10:37-04:00",
              "origin": "Miami",
              "destination": "Toronto",
              "connectionDuration": 98
            },
            {
              "duration": 100,
              "departureTime": "2023-10-11T12:15-04:00",
              "arrivalTime": "2023-11T13:55-04:00",
              "origin": "Toronto",
              "destination": "New York"
            }
          ]
        }
      ],
    };
  },
  watch: {
    origin() {
      if (this.origin != null && this.origin == this.destination) {
        this.origin = null;
        this.notificationMessage('Departure and destination airports cannot be the same', 'danger')
      }
    },
    destination() {
      if (this.destination != null && this.destination == this.origin) {
        this.destination = null;
        this.notificationMessage('Departure and destination airports cannot be the same', 'danger')
      }
    }
  },
  methods: {
    getDropdownData() {
      let countries = []
      this.flights_data.forEach(company => {
        company.segment.forEach(flight => {
          countries.push(flight.origin)
          countries.push(flight.destination)
        });
      });
      countries = [...new Set(countries)];
      countries.forEach(country => {
        let obj = { text: country, value: country }
        this.countries.push(obj)
      });
    },
    selectValidation() {
      if (this.origin == null) {
        this.notificationMessage('Please select a departure city', 'danger')
        return
      } else if (this.destination == null) {
        this.notificationMessage('Please select a destination city', 'danger')
        return
      } else {
        this.getSearchData()
      }
    },
    getSearchData() {
      this.searched_data = []
      this.flights_data.forEach(flight => {
        console.log(flight);
        flight.segment.forEach(segment => {
          if (this.origin == segment.origin && this.destination == segment.destination) {
            let obj = segment;
            obj['company'] = flight.company
            this.searched_data.push(obj)
          }
        });

      });
      if (this.searched_data.length >0) {
        this.show_searched_data = false
      }else{
        this.notificationMessage('No Flights Found', 'danger')
      }
    },
    getShortCut(text){
      const words = text.split(' ');
      if (words.length > 1) {
        let initials = '';
        words.forEach(word => {
            initials += word.charAt(0).toUpperCase();
        });
        return initials;
      }else{
        return words[0].slice(0, 3).toUpperCase()
      }

    },
    sortByDurationAsc() {
      this.searched_data.sort(function(a, b) {
          return parseFloat(a.duration) - parseFloat(b.duration);
      });
    },
    goBack(){
      this.show_searched_data = true;
      this.origin = null
      this.destination = null
      this.searched_data = []
    },
    getInTime(time){
      return moment(new Date(time)).format('HH : mm')
    },
    getInDate(datee){
      return moment(new Date(datee)).format('DD MMM')
    },
    convertToMins(minutes){
      var hours = Math.floor(minutes / 60);
      var remainingMinutes = minutes % 60;
      return hours + "h " + remainingMinutes + "m";
    },
    notificationMessage(msg, color) {
      this.$vs.notify({
        text: msg,
        color: color
      })
    }
  },
};
</script>
<style>
.bg-color {
  background: #8B93FF;
  clip-path: circle(90vh at 35% 50vh);
  height: 100vh;
}

.mt-2 {
  margin-top: 2%;
}

.mt-4 {
  margin-top: 4%;
}

.flight-png {
  position: absolute;
  top: 20%;
  left: 68%
}

.height-icon {
  position: absolute;
  left: 26%;
  margin-top: 0.5%;
}

.selectExample {
  max-width: 450px !important;
}

.vs-select--label {
  display: flex;
  color: white !important
}

.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap
}

.con-select .vs-select {
  width: 100%
}
.flight-card{
  margin-left: 2%;
}
.card-title{
  margin-left: 5%;
    letter-spacing: 1px;
    font-weight: 700;
    margin-top: 1%;
}
@media (max-width: 550px) {
  .con-select {
    flex-direction: column;
  }

  .con-select .vs-select {
    width: 100%
  }
}

@media (max-width: 1375px) {
  .height-icon {
    display: none !important;

  }
}

@media (max-width: 1805px) {
  .height-icon {
    left: 28%
  }
}

@media (max-width: 1650px) {
  .height-icon {
    left: 30%
  }
}

@media (max-width: 1450px) {
  .height-icon {
    left: 32%
  }
}

@media screen and (max-width: 1250px) {
  .bg-color {
    clip-path: circle(75vh at 30% 50vh);
    height: 110vh;
    overflow: hidden !important;
  }

  .flight-png {
    top: 20%;
    left: 60%
  }
}

@media screen and (max-width: 980px) {
  .bg-color {
    clip-path: none;
    overflow: hidden !important;
  }

  .flight-png {
    display: none;
  }
}

@media screen and (min-width: 1150px) {
  .header1 {
    margin-top: 5% !important;
    font-size: 32px;
  }
}

@media screen and (min-width: 1000px) {
  .header1 {
    font-size: 28px;
  }

  .selectExample {
    width: 325px !important;
  }
}

@media screen and (max-width: 500px) {
  .header1 {
    font-size: 24px;
  }

  .selectExample {
    width: 280px !important;
  }
}
</style>
