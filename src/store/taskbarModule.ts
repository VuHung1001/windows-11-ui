import TaskbarItem from "@/types/TaskbarItem";
import { Module } from 'vuex';

interface TaskbarState {
    taskbarItems: TaskbarItem[],
    currentFocusItem: string
}

const taskbarModule: Module<TaskbarState, any> = {
    namespaced: true,
    state: {
        taskbarItems: [] as TaskbarItem[],
        currentFocusItem: ""
    },
    mutations: {
        setTaskbarItems(state, taskbarItems) {
            state.taskbarItems = taskbarItems;
        },
        setCurrentFocusItem(state, itemName: string) {
            state.currentFocusItem = itemName;
        }        
    },
    actions: {
        async fetchTaskbarItems({ commit }) {
            try {
                const base_URL = "";
                const response = await fetch(base_URL + "/data.json");
                const data = await response.json();
                commit("setTaskbarItems", data.taskbarItems);
            } catch (error) {
                console.error("Error fetching taskbarItems:", error);
            }
        },
        changeCurrentFocusItem({ commit }, itemName: string) {
            commit("setCurrentFocusItem", itemName);
        }        
    },
    getters: {
        getTaskbarItems: (state) => {
            return state.taskbarItems;
        },
        getTaskbarItemByName: (state) => (name: string) => {
            return state.taskbarItems.find(item => item.name === name);
        },
        getCurrentFocusItem: (state) => {
            return state.currentFocusItem;
        }
    },
}

export default taskbarModule;
