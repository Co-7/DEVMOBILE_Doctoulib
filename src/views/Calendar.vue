<script setup>
import { ref, onMounted } from "vue";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Calendar from "primevue/calendar";

const choose_date = ref("");
const interval = ref(10);
const events = ref([]);
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    let appointmentsTmp = [];
    querySnapshot.forEach((doc) => {
        console.log(doc);
        const date = new Date(doc.data().date.seconds * 1000);
        const appointment = {
            id: doc.id,
            title: doc.data().title,
            start:
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate() +
                "T" +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":00",
        };
        appointmentsTmp.push(appointment);
    });
    events.value = appointmentsTmp;
    console.log(events);
});

const options = ref({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialDate: "2022-12-12",
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: events,
});
</script>
<template>
    <div class="p-6">
        <FullCalendar
            :events="events"
            :options="options"
        />
    </div>
</template>
<style scoped lang="scss">
</style>