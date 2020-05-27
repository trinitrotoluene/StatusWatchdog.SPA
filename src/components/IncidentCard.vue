<template>
    <div :class="cardClass">
        <div class="font-bold">
            <router-link :to="{ name: 'incident', params: { id: id }}" class>{{title}}</router-link>
        </div>
        <div class="text-sm">
            <span>{{sinceMessage}}</span>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        id: Number,
        status: Number,
        title: String,
        createdAt: Date
    },
    computed: {
        sinceMessage: function() {
            const now = moment.utc(new Date());
            const created = moment.utc(this.createdAt);

            console.log(now);
            console.log(created);
            return created.from(now);
        }
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