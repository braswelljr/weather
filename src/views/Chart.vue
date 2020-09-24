<template>
  <div class="antialiased">
    <div
      class="z-10 min-w-full min-h-full p-5 pt-24 bg-fixed md:px-16 lg:px-32"
      v-if="typeof weather.timezone != 'undefined'"
      :class="
        weather.current.temp > 18
          ? ' bg-gray-200 text-gray-800'
          : ' bg-gray-700 text-gray-200'
      "
    >
      <div class="flex flex-wrap items-center justify-center mx-5">
        <div class="block w-full mx-auto my-6 sm:w-1/2">
          <canvas
            id="myChart"
            width="300"
            height="300"
            class="inset-0 block"
          ></canvas>
        </div>
        <div class="block w-full mx-auto my-6 sm:w-1/2">
          <canvas
            id="hisChart"
            width="300"
            height="300"
            class="inset-0 block"
          ></canvas>
        </div>
        <div class="block w-full mx-auto my-6 sm:w-1/2">
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
        </div>
      </div>
    </div>
    <div
      class="w-full h-full p-5 pt-20 bg-green-900 md:px-16 lg:px-32"
      v-else-if="
        typeof weather.timezone == 'undefined' ||
          typeof weather.timezone == null
      "
    >
      <div class="flex items-center h-full bouncing-loader">
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
    createChart(chartId) {
      const ctx = document.getElementById(chartId).getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Mercury",
            "Venus",
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune"
          ],
          datasets: [
            {
              // one line graph
              label: "Number of Moons",
              type: "line",
              data: [0, 0, 1, 2, 67, 62, 27, 14],
              backgroundColor: [],
              borderColor: [
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d"
              ],
              borderWidth: 3
            },
            {
              // another line graph
              label: "Planet Mass (x1,000 km)",
              type: "bar",
              data: [88.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
              backgroundColor: [
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)",
                "rgba(214, 158, 46,.5)" // Green
              ],
              borderColor: [],
              borderWidth: 3
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
                  padding: 0
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 0
                }
              }
            ]
          }
        }
      });
    }
  },
  mounted() {
    this.createChart("myChart");
    this.createChart("hisChart");
    this.createChart("herChart");
    this.createChart("theirChart");
  }
};
</script>
