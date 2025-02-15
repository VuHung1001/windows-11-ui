<script lang="ts">
	import { mapGetters, mapActions } from "vuex";

	export default {
		name: "StartMenu",
		computed: {
			...mapGetters("startMenu", [
				"getPinnedApps"
			]), // Map getter to get pinned apps
			pinnedApps() {
				return this.getPinnedApps; // Use getter to get pinned apps
			},			
		},
		created() {
			this.fetchPinnedApps(); // Fetch pinned apps khi component được tạo
		},		
		methods: {
			...mapActions("startMenu", [
				"fetchPinnedApps"
			]),
		}
	}
</script>

<template>
	<div class="start-menu-container">
		<div class="search">
			<div class="search-container">
				<label for="search">
					<img src="/search.png" width="14" alt="">
				</label>
				<input type="text" name="search" value="" placeholder="Search for apps, settings, and documents">
			</div>
		</div>
		<div class="pins">
			<div class="label-container">
				<span>Pinned</span>
				<button class="more-btn">
					<span>All </span>
					<span>></span>
				</button>
			</div>
			<div class="apps">
				<div v-for="app in pinnedApps"
					class="app"
					:key="app.name"
				>
					<img :src="'/' + app.image" width="32" alt="" />
					<span>{{ app.name }}</span>
				</div>
			</div>
		</div>
		<div class="recommendations">
			<div class="label-container">
				<span>Recommended</span>
				<button class="more-btn">
					<span>More </span>
					<span>></span>
				</button>			
			</div>
			<div class="files"></div>
		</div>
		<div class="account">
			<div class="user">
				<img src="/dev.png" alt="">
				<span>Hùng Vũ</span>
			</div>
			<div class="power">
				<img src="/power.svg" width="16" alt="">
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.start-menu-container {
	position: fixed;
	bottom: 60px;
	left: 50%;
	transform: translateX(-50%);
	width: 644px;
	display: flex;
	flex-direction: column;
	border-radius: 20px;

	.search {
		padding: 32px;
		padding-bottom: 25px;

		.search-container {
			display: flex;
			align-items: center;
			width: 100%;
			height: 30px;
			border-radius: 15px;

			input {
				border: none;
				height: 100%;
			}
		}
	}

	.pins {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
		padding: 25px 32px 18px;

		.apps {
			display: flex;
			flex-wrap: wrap;

			.app {
				width: calc(100% / 6);
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 8px;
				padding: 12px 0 24px;
			}
		}
	}

	.recommendations {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
		padding: 18px 52px 32px;
	}

	.more-btn {
		display: flex;
		gap: 12px;
		height: 24px;
		padding: 6px;
		border-radius: 6px;
	}	

	.label-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 64px;
	}	

	.account {
		display: flex;
		justify-content: space-between;
		padding: 12px 52px;

		& > div {
			height: 40px;
			display: flex;
			align-items: center;			
		}

		.user {
			gap: 12px;
			padding: 5px 12px;

			img {
				height: 30px;
				width: 30px;
				border-radius: 50%;
			}
		}

		.power {
			width: 40px;
		}
	}
}
</style>
