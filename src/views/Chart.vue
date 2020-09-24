<template>
  <div class="w-screen h-screen antialiased">
    <div
      class="z-10 min-w-full min-h-full p-5 pt-24 bg-fixed md:px-16 lg:px-32"
      v-if="typeof weather.timezone != 'undefined'"
      :class="
        weather.current.temp > 18
          ? ' bg-gray-200 text-gray-800'
          : ' bg-gray-700 text-gray-200'
      "
    >
      <h1 class="text-3xl font-semibold text-center uppercase">Charts</h1>
      <canvas id="myChart"></canvas>
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
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: "block",
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
              data: [0, 0, 1, 2, 67, 62, 27, 14],
              backgroundColor: [
                "rgba(54,73,93,.5)", // Blue
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)"
              ],
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
              data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
              backgroundColor: [
                "rgba(71, 183,132,.5)" // Green
              ],
              borderColor: ["#47b784"],
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
                  padding: 25
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
  }
};
</script>
