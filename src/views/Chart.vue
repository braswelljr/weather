<template>
  <div class="antialiased">
    <div
      class="z-10 min-h-screen p-5 pt-24 bg-fixed min-w-screen md:px-16 lg:px-32"
      v-if="typeof weather.timezone != 'undefined'"
      :class="
        weather.current.temp > 18
          ? ' bg-gray-200 text-gray-800'
          : ' bg-gray-700 text-gray-200'
      "
    >
      <div class="flex flex-wrap items-center justify-center mx-5">
        <div class="block w-full mx-auto my-6 sm:w-1/2">
          <h1 class="font-bold text-center uppercase">7 day</h1>
          <div class="">
            <canvas
              id="daily"
              width="300"
              height="300"
              class="inset-0 block"
            ></canvas>
          </div>
        </div>
        <div class="block w-full mx-auto my-6 sm:w-1/2">
          <h1 class="font-bold text-center uppercase">48 Hour</h1>
          <div class="">
            <canvas
              id="hourly"
              width="300"
              height="300"
              class="inset-0 block"
            ></canvas>
          </div>
        </div>
        <!-- <div class="block w-full mx-auto my-6 sm:w-1/2">
          <canvas
            id="herChart"
            width="300"
            height="300"
            class="inset-0 block"
          ></canvas>
        </div>
        <div class="block w-full mx-auto my-6 sm:w-1/2">
          <canvas
            id="theirChart"
            width="300"
            height="300"
            class="inset-0 block"
          ></canvas>
        </div> -->
      </div>
    </div>
    <div
      class="z-10 min-h-screen p-5 pt-20 bg-fixed bg-green-900 min-w-screen md:px-16 lg:px-32"
      v-else-if="
        typeof weather.timezone == 'undefined' ||
          typeof weather.timezone == null
      "
    >
      <div
        class="flex items-center min-w-full min-h-full mt-32 bouncing-loader"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";

export default {
  name: "Home",
  components: {},
  props: {
    weather: Object,
    timer: String
  },
  data() {
    return {};
  },
  methods: {
    createChart(chartId, label, types = [], labels = [], data = [], fill = []) {
      const ctx = document.getElementById(chartId).getContext("2d");
      new Chart(ctx, {
        type: types[0], //bar, line, pie, doughnut
        data: {
          labels: label, //eg days, date
          datasets: [
            {
              // one line graph
              label: labels[0], //data temp, sunrise
              type: types[1],
              data: data[0], //y-axis - temperature
              backgroundColor: [
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff"
              ],
              borderColor: [
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff",
                "#14b5ff"
              ],
              borderWidth: 6,
              fill: fill[0]
            },
            {
              // another line graph
              label: labels[1], //data temp, sunrise
              type: types[2],
              data: data[1],
              backgroundColor: [
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e"
              ],
              borderColor: [
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e",
                "#e53e3e"
              ],
              borderWidth: 5,
              fill: fill[1]
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 20,
                  min: -30,
                  max: 50
                }
              }
            ]
          }
        }
      });
    },
    date() {
      const day = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return `${days[day.getDay()]} ${
        months[day.getMonth()]
      } ${day.getDate()}, ${day.getFullYear()}`;
    },
    utc_to_time(time) {
      const date = new Date(time * 1000);

      return date.toUTCString().slice(-11, -4);
    },
    utc_to_hours(time) {
      const date = new Date(time * 1000);

      return date.toUTCString().slice(-12, -10);
    },
    hours(hour) {
      let ampm = "am";
      if (hour >= 12) ampm = "pm";
      if (hour > 12) hour = hour - 12;
      if (hour == 0) hour = 12;
      return `${hour} ${ampm}`;
    },
    utc_date(time) {
      const date = new Date(time * 1000);

      return date.toUTCString().slice(-24, -18);
    }
  },
  mounted() {
    if (typeof this.weather.timezone !== "undefined") {
      //daily
      let minimum = this.weather.daily.map(min => min.temp.min);
      let maximum = this.weather.daily.map(max => max.temp.max);
      let date = this.weather.daily.map(day => this.utc_date(day.dt));
      this.createChart(
        "daily",
        date,
        ["line", "bar", "bar"],
        ["Minimum temperature", "Maximum Temperature"],
        [minimum, maximum],
        [false, false]
      );

      // hourly chart
      let temp_h_current = this.weather.hourly.map(cur => cur.temp);
      let date_h = this.weather.hourly.map(day =>
        this.hours(this.utc_to_hours(day.dt))
      );
      this.createChart(
        "hourly",
        date_h,
        ["line", "bar", "bar"],
        ["temperature", ""],
        [temp_h_current],
        [true, true]
      );
    } else {
      console.log("Connection down or Undefined Zone");
    }
  }
};
</script>
