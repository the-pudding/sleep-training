import { csvParse } from 'd3';
import studies from "$data/studies.csv"
import books from "$data/books.csv"
import literature_reviews from "$data/literature_reviews.csv"
import response_articles from "$data/articles.csv"
import response_comments from "$data/comments.csv"
import response_references from "$data/references.csv"
import response_reddit from "$data/reddit.csv"
import response_instagram from "$data/instagram.csv"


export async function load({fetch}) {
	let data = { studies: [], literature_reviews: [], articles: [], comments: [], references: [], reddit: [], instagram: [], books: [] };

	data.literature_reviews = literature_reviews.map(d => {
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
	data.comments = response_comments.map(d => {
		return {
			comment: d.comment,
			category: d.category,
			platform: d.platform,
			url: d.url,
			likes: d.likes,	
		}
	})
	data.references = response_references.map(d => {
		return {
			target: d.article,
			authors: d.authors,
			title: d.title,
			date: d.date,
			theoretical: d.grounding,
			relevance: d.relevance,
		}		
	})
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
	data.instagram = response_instagram.map(d => {
		return {
			position: d.position,
			radius: +d.followerCount,
			url: d.url,
			username: d.username,
			type: d.type,
		}
	})
	data.books = books.map(d => {
		return {
			position: d.position,
			radius: +d.holding,
			title: d.title,
			authors: d.authors,
			url: d.url,
			username: d.username,
			type: d.type,
			year: d.year,
		}
	})

	return { data };
}