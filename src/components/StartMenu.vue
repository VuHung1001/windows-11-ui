<script lang="ts">
	export default {
		name: "StartMenu",
		computed: {
		},
		created() {
		},		
		methods: {
		}
	}
</script>

<template>
	<div class="start-menu-container">
		<div class="search">
			<label for="search"></label>
			<input type="text" name="search" value="" placeholder="Search for apps, settings, and documents">
		</div>
		<div class="pins"></div>
		<div class="recommendations"></div>
		<div class="account"></div>
	</div>
</template>

<style lang="scss" scoped>
.start-menu-container {
	width: 644px;
	height: 728px;
}
</style>
