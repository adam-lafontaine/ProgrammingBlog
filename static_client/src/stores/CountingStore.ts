import { defineStore } from "pinia";


const COUNT_MIN = 0;
const COUNT_MAX = 10;


function to_str(count: number): string
{
    switch(count)
    {
    case 0: return "zero";
    case 1: return "one";
    case 2: return "two";
    case 3: return "three";
    case 4: return "four";
    case 5: return "five";
    case 6: return "six";
    case 7: return "seven";
    case 8: return "eight";
    case 9: return "nine";
    case 10: return "ten";

    default: return "err";
    }
}


export const useCountingStore = defineStore("CountingStore", {

    state: () => {
        return {
            count: 0,
        };
    },


    getters: {

        get_count: (state) => state.count,
        get_count_str: (state) => to_str(state.count),
    },


    actions: {

        increment(): void 
        {
            let c = this.count + 1;
            if (c <= COUNT_MAX)
            {
                this.count = c;
            }
        },


        decrement(): void
        {
            let c = this.count - 1;
            if (c >= COUNT_MIN)
            {
                this.count = c;
            }
        }

    }
});