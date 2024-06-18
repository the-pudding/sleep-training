import { csvParse } from 'd3';
import studies from "$data/studies.csv"
import response_articles from "$data/articles.csv"
import response_comments from "$data/comments.csv"
import response_references from "$data/references.csv"
import response_reddit from "$data/reddit.csv"
import response_instagram from "$data/instagram.csv"


export async function load({fetch}) {
	let data = { studies: [], articles: [], comments: [], references: [], reddit: [], instagram: [] };

	// const response = studies;
	// const csvStudies = studies//await response.text();
	data.studies = studies.map(d => {
		return {
			title: d.title,
			authors: d.authors, 
			position: d.position,
			url: d.url,
			country: d.country,
			type: d.type,
			year: +d.year,
			radius: +d.participants || 0,
			citations: +d.citations || 0
		}
	});
	// const response_articles = await fetch('src/data/articles.csv');
	// const csvArticles = await response_articles.text();
	data.articles = response_articles.map(d => {
		return  {
			title: d.title,
			authors: d.authors, 
			position: d.position,
			publisher: d.publisher,
			url: d.url,
			type: d.type,
			country: d.country,
			year: +d.year,
			radius: +d.backlinks || 0
		}
	});
	// // const response_comments = await fetch('src/data/comments.csv');
	// const csvComments = await response_comments.text();
	data.comments = response_comments.map(d => {
		return {
			comment: d.comment,
			category: d.category,
			platform: d.platform,
			url: d.url,
			likes: d.likes,	
		}
	})
	// // const response_references = await fetch('src/data/references.csv');
	// const csvReferences = await response_references.text();
	data.references = response_references.map(d => {

		return {
			target: d.article,
			authors: d.authors,
			title: d.title,
			date: d.date,
		}
		
	})
	// // const response_reddit = await fetch('src/data/reddit.csv');
	// const csvReddit = await response_reddit.text();
	data.reddit = response_reddit.map(d => {
		return {
			comment: d.comments,
			position: d.position,
			radius: +d.upVotes,
			url: d.url,
			username: d.username,
			type: d.type,	
		}
	
	})
	// // const response_instagram = await fetch('src/data/instagram.csv');
	// const csvInstagram = await response_instagram.text();
	data.instagram = response_instagram.map(d => {
		return {
			position: d.position,
			radius: +d.followerCount,
			url: d.url,
			username: d.username,
			type: d.type,
		}
	})

	return { data };
}