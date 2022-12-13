<script setup>
import { ref, onMounted } from "vue";
import router from "../router";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const praticiens = ref([]);
const visibleRight = ref(false);
const choose_date = ref("");
const title = ref("");
const current_praticien = ref("");
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    speciality: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
});
const speciality_use = ref([]);

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "praticiens"));
    let praticiensTmp = [];
    let specialityTmp = [];
    querySnapshot.forEach((doc) => {
        const praticien = {
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            speciality: doc.data().speciality,
        };
        specialityTmp.push(doc.data().speciality);
        praticiensTmp.push(praticien);
    });
    praticiens.value = praticiensTmp;
    speciality_use.value = specialityTmp;
});

function triggerAppoint(data) {
    title.value = "RDV chez " + data.firstname + " " + data.lastname;
    visibleRight.value = true;
    current_praticien.value = data;
}

function send() {
    const docData = {
        title: title.value,
        praticien: current_praticien.value,
        date: choose_date.value,
        patient: current_praticien.value,
    };
    addDoc(collection(db, "appointments"), docData);
}
</script>
<template>
    <div class="flex justify-center py-10">
        <DataTable
            v-model:filters="filters"
            filterDisplay="menu"
            :value="praticiens"
            :paginator="true"
            :rows="10"
            responsiveLayout="scroll"
        >
            <template #header>
                <div class="flex justify-between items-center">
                    <h5 class="m-0">Praticiens</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText
                            v-model="filters['global'].value"
                            placeholder="Keyword Search"
                        />
                    </span>
                </div>
            </template>
            <template #empty>
                Pas de praticiens trouvé
            </template>
            <Column
                field="firstname"
                header="Prénom"
                sortable
            ></Column>
            <Column
                field="lastname"
                header="Nom"
                sortable
            ></Column>
            <Column
                field="speciality"
                header="Spécialité"
                sortable
                filterMatchMode="contains"
            >
                <template #filter="{filterModel}">
                    <Dropdown
                        v-model="filterModel.value"
                        :options="speciality_use"
                        placeholder="Any"
                        class="p-column-filter"
                        :showClear="true"
                    >
                    </Dropdown>
                </template>
            </Column>
            <Column header="Action">
                <template #body="{data}">
                    <Button
                        @click="triggerAppoint(data)"
                        class="p-button-secondary"
                        type="button"
                        label="Prendre un Rendez-vous"
                        icon="pi pi-calendar"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
    <Sidebar
        v-model:visible="visibleRight"
        :baseZIndex="10000"
        position="right"
        class="p-sidebar-sm"
    >
        <label for="time24">Prendre RDV avec {{current_praticien.firstname}} {{current_praticien.lastname}}</label>
        <div>
            <Calendar
                inputId="time24"
                v-model="choose_date"
                :showTime="true"
                :showSeconds="false"
                placeholder="Choisir une date"
                dateFormat="dd.mm.yy"
                class="my-6"
            />
        </div>
        <Button
            @click="send"
            class="p-button-secondary"
            type="button"
            label="Prendre Rendez-vous"
            icon="pi pi-calendar"
        />
    </Sidebar>
</template>
<style scoped lang="scss">
</style>