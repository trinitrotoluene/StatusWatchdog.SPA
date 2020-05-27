<template>
    <div :class="cardClass">
        <div class="font-bold">
            <router-link :to="{ name: 'incident', params: { id: id }}" class>{{title}}</router-link>
        </div>
        <div class="text-sm">
            <span>{{since.toLocaleDateString()}} {{since.toLocaleTimeString()}} UTC+00:00</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        status: Number,
        title: String,
        since: Date
    },
    data() {
        return {
            cardClass: {
                "bg-orange-100": this.status === 1,
                "border-orange-500": this.status === 1,
                "text-orange-700": this.status === 1,
                "bg-red-100": this.status === 2,
                "border-red-500": this.status === 2,
                "text-red-700": this.status === 2,
                "border-l-4": true,
                "p-4": true,
                relative: true
            }
        };
    }
};
</script>

<style scoped>
</style>