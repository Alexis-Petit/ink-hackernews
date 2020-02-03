const turndownService = require("turndown")

export const mapHtmlToMarkdown = html => turndownService.turndown(html)
