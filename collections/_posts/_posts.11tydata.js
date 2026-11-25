import { giftGuideUrl } from '../../plugins/gift-guides.js';

export default {
  tags: ["posts"],
  layout: "post",
  weight: 999,
  news: false,
  pinned: false,
  ads: true,
  permalink(data) {
    if (data.published === false) return false;
    const giftUrl = giftGuideUrl(data);
    if (giftUrl) return `${giftUrl}index.html`;
    const stem = data.page.inputPath.split("/").pop().replace(/\.md$/, "");
    return `/blog/${stem}/index.html`;
  },
};
