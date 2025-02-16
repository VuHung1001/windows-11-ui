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
					<img src="/search.png" width="20" alt="">
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
					<img :src="'/' + app.image" width="auto" height="auto" alt="" />
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
    border-radius: 8px;
    background-color: rgba(74, 84, 89, 0.7);
    backdrop-filter: blur(40px);
	box-shadow: 0px 0px 1px 1.25px rgba(255, 255, 255, 0.15) inset;

	* {
		color: white;
		font-size: 12px;
	}

	.search {
		padding: 32px;
		padding-bottom: 25px;

		.search-container {
			display: flex;
			align-items: center;
			width: 100%;
			height: 30px;
			border-radius: 15px;
			box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.35);
			background-color: rgb(40, 40, 40);

			label {
				width: 42px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			input {
				font-size: 14px;
				border: none;
				height: 100%;
				flex: 1;
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
				padding: 12px 0 18px;
				border-radius: 5px;
				transition: all ease 0.15s;

				img {
					min-width: 32px;
					max-width: 32px;
					max-height: 32px;
					min-height: 32px;
					object-fit: contain;
					transition: all ease 0.15s;
				}

				&:hover {
					background-color: rgba(255, 255, 255, 0.075);
				}

				&:active {
					img {
						transform: scale(0.75);
					}
				}
			}
		}
	}

	.recommendations {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
		padding: 18px 32px 32px;
	}

	.label-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32px;

		& > span {
			font-weight: 500;
			font-size: 14px;
		}

		.more-btn {
			display: flex;
			align-items: center;
			gap: 10px;
			height: 24px;
			padding: 8px;
			border-radius: 5px;
			background-color: rgba(255, 255, 255, 0.075);
			box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.1) inset;
			transition: all ease 0.15s;

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
				box-shadow: none;
			}

			&:active {
				background-color: transparent;
				box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.1) inset;
			}
		}	
	}	

	.account {
		display: flex;
		justify-content: space-between;
		padding: 12px 52px;
		background-color: rgb(45, 51, 54, 0.3);
		border-radius: 0 0 8px 8px;

		& > div {
			height: 40px;
			display: flex;
			align-items: center;		
			justify-content: center;	
			border-radius: 5px;
			transition: all ease 0.15s;

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
			}
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

			img {
				filter: invert(1);
			}
		}
	}
}
</style>
