import { PinnedApps, RecommendedFiles } from '@/types/startMenuTypes';
import { Module } from 'vuex';

interface StartMenuState {
	pinnedApps: PinnedApps[],
    recommendedFiles: RecommendedFiles[]
}

const startMenuModule: Module<StartMenuState, any> = {
	namespaced: true,
    state: {
        pinnedApps: [] as PinnedApps[],
        recommendedFiles: [] as RecommendedFiles[]
    },
    mutations: {
        setPinnedApps(state, pinnedApps) {
            state.pinnedApps = pinnedApps;
        },
        setRecommendedFiles(state, recommendedFiles) {
            state.recommendedFiles = recommendedFiles;
        },
    },
    actions: {
        async fetchPinnedApps({ commit }) {
            try {
                const base_URL = "";
                const response = await fetch(base_URL + "/data/pinnedApps.json");
                const data = await response.json();
                commit("setPinnedApps", data.pinnedApps);
            } catch (error) {
                console.error("Error fetching pinnedApps:", error);
            }
        },
        async fetchRecommendedFiles({ commit }) {
            try {
                const base_URL = "";
                const response = await fetch(base_URL + "/data/recommendedFiles.json");
                const data = await response.json();
                commit("setRecommendedFiles", data.recommendedFiles);
            } catch (error) {
                console.error("Error fetching recommendedFiles:", error);
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
        getRecommendedFiles: (state) => {
            return state.recommendedFiles;
        },
        getRecommendedFileByName: (state) => (name: string) => {
            return state.recommendedFiles.find(app => app.name === name);
        },
    },
};

export default startMenuModule;
