<script setup>
import { ref, onMounted } from 'vue'
import router from '../router'
import { db } from '../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const praticiens = ref([]);

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "praticiens"));
    let praticiensTmp = [];
    querySnapshot.forEach((doc) => {
        const praticien = {
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname
        }
        praticiensTmp.push(praticien);
    });
    praticiens.value = praticiensTmp;
})

</script>
<template>
    <DataTable :value="praticiens" responsiveLayout="scroll">
        <!-- <Column field="id" header="ID"></Column> -->
        <Column field="firstname" header="Firstname"></Column>
        <Column field="lastname" header="Lastname"></Column>
    </DataTable>
</template>
<style scoped lang="scss">

</style>