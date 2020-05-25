<template>
    <div id="app">
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <div>
                        <router-link to="/" class="title has-text-white">Acme inc. Statuspage</router-link>
                    </div>
                    <h2 class="subtitle">We provide you with services.</h2>
                </div>
            </div>
        </section>

        <section class="container">
            <router-view />
        </section>
    </div>
</template>

<style>
</style>
