<template>
    <div :class="cardClass">
        <div class="flex lg:flex-row flex-col items-start justify-between">
            <div class="text-lg font-bold flex-grow-0">{{stateMessage}}</div>
            <div class="flex-grow-0 w-3/4">{{message}}</div>
        </div>
        <div class="text-sm inline ml-auto">
            <span>Posted {{sinceMessage}}.</span>
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
        return {
            cardClass: {
                'border-l-4': true,
                'p-4': true,
                'bg-red-100': this.state === 0,
                'text-red-700': this.state === 0,
                'border-red-700': this.state === 0,
                'bg-orange-100': this.state === 1,
                'text-orange-700': this.state === 1,
                'border-orange-600': this.state === 1,
                'bg-gray-100': this.state === 2,
                'text-gray-700': this.state === 2,
                'border-gray-700': this.state === 2,
                'bg-green-100': this.state === 3,
                'text-green-700': this.state === 3,
                'border-green-700': this.state === 3,
            }
        };
    }
};
</script>
