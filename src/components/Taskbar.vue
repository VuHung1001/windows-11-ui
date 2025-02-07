<script setup>
</script>

<template>
  <div class="taskbar-container">
	<div class="weather-forecast"></div>
	<div class="taskbar-items">
		<div class="item focus">
			<img src="/windows-start.webp" alt="" />
		</div>
		<div class="item active">
			<img src="/file_explorer.png" alt="" style="width: 85%;" />
		</div>
		<div class="item">
			<img src="/chrome.png" alt="" />
		</div>
		<div class="item">
			<img src="/terminal.png" alt="" />
		</div>
		<div class="item">
			<img src="/vscode.png" alt="" />
		</div>
		<div class="item">
			<img src="/postman.png" alt="" />
		</div>
		<div class="item">
			<img src="/youtube.svg" alt="" />
		</div>
	</div>
	<div class="system-tray-and-time"></div>
  </div>
</template>

<style lang="scss" scoped>
	.taskbar-container {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 48px;
		padding: 3px 16px;
		display: flex;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.22);
		backdrop-filter: blur(20px);

		.taskbar-items {
			display: flex;
			gap: 7px;

			.item {
				height: 42px;
				width: 42px;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 4px;
					background-color: transparent;
					border-radius: 2px;
					transition: all ease 0.2s;
				}

				&:hover {
					background-color: rgba(255, 255, 255, 0.1);
				}

				&.active {
					&::before {
						width: 7px;
						background-color: #9ba5a9;
					}
				}

				&.focus {
					background-color: rgba(255, 255, 255, 0.1);
					box-shadow: 0px 0px 1px 0.5px rgba(255,255,255,0.2) inset;

					&:hover {
						background-color: rgba(255, 255, 255, 0.2);
					}

					&::before {
						width: 40%;
						background-color: #b7c6d3;
					}					
				}

				img {
					width: 70%;
					display: block;
					padding-bottom: 2px;
				}
			}
		}
	}
</style>
