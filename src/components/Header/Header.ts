import { socket } from './../../api/index';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Header extends Vue {

    created() {
        // @ts-ignore;
        socket.emit("connection-test", { user: "header", _id: JSON.stringify(socket.id) });
        socket.on("hello-all", (msg: any) => {
            alert(msg);
        });
    }
    fetchVehicles() {
        socket.emit("sign-user", {
            isAdmin: true,
            id: socket.id,
        });
        fetch("http://localhost:3000/vehicles/getVehicles")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }
}