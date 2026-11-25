import fs from 'node:fs';
import { buildGiftGuideRedirects } from '../plugins/gift-guides.js';

export default class GiftGuideRedirects {
  data() {
    return { layout: false, permalink: '/_redirects', sitemap: false, eleventyExcludeFromCollections: true };
  }

  render(data) {
    return buildGiftGuideRedirects(data.collections.posts, fs.readFileSync('_redirects', 'utf8'));
  }
}
