export default {
  tags: ["posts"],
  layout: "post",
  weight: 999,
  news: false,
  permalink(data) {
    if (data.published === false) return false;
    const stem = data.page.inputPath.split("/").pop().replace(/\.md$/, "");
    return `/blog/${stem}/index.html`;
  },
};
