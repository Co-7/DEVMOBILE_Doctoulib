<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const username = ref("colin@test.firebase.com");
const password = ref("rootroot");
const login_status = ref("")

function login() {
    login_status.value = "";
    signInWithEmailAndPassword(auth, username.value, password.value)
        .then((userCredential) => {
            login_status.value = "success";
        })
        .catch((error) => {
            login_status.value = "failed";
        });
}
</script>
<template>
    <section class="h-screen w-screen flex ">
        <div class="container w-full h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        class="w-full"
                    />
                </div>
                <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <div v-if="login_status == 'success'" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <span class="font-medium">Success Login !</span>
                    </div>
                    <div v-if="login_status == 'failed'" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <span class="font-medium">Failed Login !</span>
                    </div>
                    <div class="mb-6">
                        <input
                            v-model="username"
                            type="text"
                            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Email address"
                        />
                    </div>
                    <div class="mb-6">
                        <input
                            v-model="password"
                            type="password"
                            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="button"
                        @click="login"
                        class="inline-block px-7 py-3 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
</style>