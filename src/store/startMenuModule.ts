import { Module } from 'vuex';

interface StartMenuState {
	pinnedApps: {name: string, image: string}[]
}

const startMenuModule: Module<StartMenuState, any> = {
	namespaced: true,
    state: {
        pinnedApps: [] as {name: string, image: string}[],
    },
    mutations: {
        setPinnedApps(state, pinnedApps) {
            state.pinnedApps = pinnedApps;
        },
    },
    actions: {
        async fetchPinnedApps({ commit }) {
            try {
                const base_URL = "";
                const response = await fetch(base_URL + "/data.json");
                const data = await response.json();
                commit("setPinnedApps", data.pinnedApps);
            } catch (error) {
                console.error("Error fetching pinnedApps:", error);
            }
        },
    },
    getters: {
        getPinnedApps: (state) => {
            return state.pinnedApps;
        },
        getPinnedAppByName: (state) => (name: string) => {
            return state.pinnedApps.find(app => app.name === name);
        },
    },
};

export default startMenuModule;
