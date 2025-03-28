<template>
	<div class="markdown-content" v-html="markdownContent"></div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";

export default {
	name: "MarkdownViewer",
	setup() {
		const markdownContent = ref("");

		const fetchMarkdown = async () => {
			try {
				// Tải file Markdown từ thư mục public
				const response = await fetch("/about-me.md");
				const text = await response.text();
				// Chuyển đổi nội dung Markdown thành HTML
				markdownContent.value = marked(text);
			} catch (error) {
				console.error("Error loading Markdown file:", error);
			}
		};

		// Tải file Markdown khi component được mounted
		onMounted(() => {
			fetchMarkdown();
		});

		return {
			markdownContent,
		};
	},
};
</script>

<style scoped>
.markdown-content {
	/* Bạn có thể thêm style cho phần nội dung markdown ở đây */
	padding: 1em;
	line-height: 1.6;
}
</style>
