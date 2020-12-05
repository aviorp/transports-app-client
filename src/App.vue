<template>
  <div>
    <app-header></app-header>
    <!-- <div style="max-height: 300px !important">
      <line-chart :chartData="datasets"></line-chart>
      <pie-chart :chartData="datasets"></pie-chart>
    </div> -->
    <input name="myTest" type="file" @change="uploadFile($event)" />
    <button
      @click="fetchVehicles"
      class="mx-auto mt-12 py-2 px-6 bg-blue-700 text-white rounded text-center"
    >
      fetch vehicles
    </button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import appHeader from "@/components/Header/Header.vue";
import axios from "axios";
// import lineChart from "@/charts/lineChart";
// import piechart from "@/charts/PieChart";
import { socket } from "./api";
@Component({
  components: {
    appHeader,
    // lineChart,
    // piechart,
  },
})
export default class App extends Vue {
  // @ts-ignore;

  message: string = "App Component !";
  datasets: any[] = [
    {
      data: [10, 20, 30],
    },
  ];

  created() {
    // @ts-ignore;
    socket.on("client-test", (msg: string) => {
      console.log(msg);
    });
    socket.emit("connection", socket.id);
    socket.on("hello-all", (msg: string) => {
      alert(msg);
    });
  }

  fetchVehicles() {
    socket.emit("sign-user", {
      isAdmin: false,
      id: socket.id,
    });
     axios
      .get("http://localhost:3000/download")
      .then((data) => console.log(data));
    fetch("http://localhost:3000/vehicles/getVehicles")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  uploadFile(e: Event) {
    const fd = new FormData();
    // @ts-ignore
    const file = e.target.files[0];
    fd.append(file.name, file, file.name);
    axios
      .post("http://localhost:3000/upload", fd)
      .then((data) => console.log(data));
  }
}
</script>