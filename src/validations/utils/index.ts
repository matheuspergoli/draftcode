export const FIGMA_REGEX =
	/^https:\/\/([\w.-]+.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/

export const REGEX_GITHUB_URL =
	/^https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\/?$/

export const REGEX_LINKEDIN_URL =
	/^https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/

export const ALLOWED_WEBSITE_HOSTS = [
	/(?:www\.)?vercel\.app\/?$/,
	/(?:www\.)?netlify\.app\/?$/,
	/(?:www\.)?github\.io\/[\w-]+\/?$/,
	/(?:www\.)?cloudflare\.pages\/?$/,
	/(?:www\.)?gitlab\.io\/[\w-]+\/?$/,
	/(?:www\.)?firebaseapp\.com\/?$/,
	/(?:www\.)?herokuapp\.com\/?$/,
	/(?:www\.)?surge\.sh\/?$/,
	/(?:www\.)?repl\.it\/?$/,
	/(?:www\.)?render\.com\/?$/,
	/(?:www\.)?fly\.io\/?$/,
	/(?:www\.)?deno\.dev\/?$/,
	/(?:www\.)?editorx\.com\/?$/
]
