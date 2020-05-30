<template>
    <div class="font-body" id="app">
        <div class="bg-dark py-20">
            <div class="container text-white">
                <div class="text-4xl font-bold">
                    <router-link to="/" class>{{title}}</router-link>
                </div>
                <div class="text-2xl">{{subtitle}}</div>
            </div>
        </div>

        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pollingAction: null
        };
    },
    computed: {
        title: function() {
            return this.$store.state.title
        },
        subtitle: function() {
            return this.$store.state.subtitle
        }
    },
    created: function() {
        this.$store.dispatch('fetchMeta');

        this.pollingAction = setInterval(() => {
            this.$store.dispatch('fetchMeta');
        }, this.$store.state.defaults.slowPoll);
    },
    beforeDestroy: function() {
        clearInterval(this.pollingAction);
    }
}
</script>
<style>
</style>
