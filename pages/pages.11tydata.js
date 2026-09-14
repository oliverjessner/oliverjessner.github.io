export default {
  permalink(data) {
    if (data.permalink) return data.permalink;
    return `/${data.page.fileSlug}/index.html`;
  },
};

