<template>
    <div class="bg-gray-100 border-gray-700 text-gray-700 border-l-4 p-4">
        <div class="flex flex-row items-start justify-between">
            <div class="text-lg font-bold">{{stateMessage}}</div>
            <div>{{message}}</div>
        </div>
        <div class="italic text-sm inline ml-auto">
            <span>Posted: {{sinceMessage}}</span>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        state: Number,
        message: String,
        createdAt: String
    },
    computed: {
        stateMessage: function() {
            switch (this.state) {
                case 0:
                    return "Investigating";
                case 1:
                    return "Identified";
                case 2:
                    return "Monitoring";
                case 3:
                    return "Resolved";
                default:
                    return "Unknown";
            }
        },
        sinceMessage: function() {
            const now = moment.utc(new Date());
            const created = moment.utc(this.createdAt);

            console.log(now);
            console.log(created);
            return created.from(now);
        }
    },
    data() {
        return {};
    }
};
</script>