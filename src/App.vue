<template>
    <div class="font-body" id="app">
        <div class="bg-dark py-10">
            <div class="container text-white">
                <div class="text-2xl font-bold">
                    <router-link to="/" class>Acme inc. Statuspage</router-link>
                </div>
                <div class="text-lg">We provide you with services.</div>
            </div>
        </div>

        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<style>
</style>
