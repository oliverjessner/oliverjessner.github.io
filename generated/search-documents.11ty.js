function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function metadata(key, value) {
  return `<p hidden data-pagefind-meta="${escapeHtml(key)}">${escapeHtml(value)}</p>`;
}

export default class SearchDocuments {
  data() {
    return {
      pagination: { data: "searchDocuments", size: 1, alias: "searchDocument" },
      layout: "search_document",
      sitemap: false,
      robots: "noindex",
      eleventyComputed: {
        title: (data) => data.searchDocument.title,
        permalink: (data) => `/_search-docs/external/${data.searchDocument.key}/${data.searchDocument.slug}/index.html`,
      },
    };
  }

  render(data) {
    const document = data.searchDocument;
    const categoryText = document.categories.join(", ");
    return `<section class="search-document search-document--external" data-pagefind-body>
<h1 data-pagefind-meta="title">${escapeHtml(document.title)}</h1>
${metadata("type", "external")}
${metadata("typeLabel", "Externer Artikel")}
${metadata("source", document.source)}
${metadata("date", document.date)}
${metadata("target_url", document.target_url)}
${metadata("description", document.description)}
${metadata("categories", categoryText)}
${document.image ? `<img src="${escapeHtml(document.image)}" alt="${escapeHtml(document.title)}" data-pagefind-meta="image[src], image_alt[alt]" />` : ""}
<p>${escapeHtml(document.source)}</p>
<p>${escapeHtml(document.description)}</p>
${categoryText ? `<p>Kategorien: ${escapeHtml(categoryText)}</p>` : ""}
</section>`;
  }
}
