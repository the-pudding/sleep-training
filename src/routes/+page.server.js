import { csvParse } from 'd3';

export async function load({fetch}) {
	let data = { studies: [], articles: [], comments: [] };

	const response = await fetch('src/data/studies.csv');
	const csvStudies = await response.text();
	console.log("csvText", csvStudies);
	data.studies = csvParse(csvStudies, d => ({
		title: d.title,
		authors: d.authors, 
		position: d.position,
		url: d.url,
		country: d.country,
		type: d.type,
		year: +d.year,
		radius: +d.participants || 0,
		citations: +d.citations || 0
	}));
	const response_articles = await fetch('src/data/articles.csv');
	const csvArticles = await response_articles.text();
	data.articles = csvParse(csvArticles, d => ({
		title: d.title,
		authors: d.authors, 
		position: d.position,
		url: d.url,
		type: d.type,
		country: d.country,
		year: +d.year,
		radius: +d.backlinks || 0
	}));
	const response_comments = await fetch('src/data/comments.csv');
	const csvComments = await response_comments.text();
	data.comments = csvParse(csvComments, d => ({
		comment: d.comment,
		category: d.category,
		platform: d.platform,
		url: d.url
	}));

	return { data };
}