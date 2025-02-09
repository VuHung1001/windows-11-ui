import TaskbarItem from "@/types/TaskbarItem";
import { createStore } from "vuex";

const store = createStore({
    state: {
        taskbarItems: [] as TaskbarItem[],
    },
    mutations: {
        setTaskbarItems(state, taskbarItems) {
            state.taskbarItems = taskbarItems;
        },
    },
    actions: {
        async fetchTaskbarItems({ commit }) {
            try {
                const base_URL = "";
                const response = await fetch(base_URL + "/data.json");
                const taskbarItems = await response.json();
                commit("setTaskbarItems", taskbarItems);
            } catch (error) {
                console.error("Error fetching taskbarItems:", error);
            }
        }
    },
    getters: {
        allTaskbarItems: (state) => {
            return state.taskbarItems
        },
        getTaskbarItemByName: (state) => (name: string) => {
            return state.taskbarItems.find(item => item.name === name);
        }
    },
});

export default store;
