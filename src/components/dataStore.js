// dataStore.js
import { writable } from 'svelte/store';
import { csvParse } from 'd3';

const { subscribe, set } = writable({
    studies: [],
    articles: []
});

const fetchData = async () => {
    const responseStudies = await fetch('$data/studies.csv'); // Absolute path
    const responseArticles = await fetch('$data/articles.csv'); // Absolute path

    const csvStudies = await responseStudies.text();
    const studies = csvParse(csvStudies, d => ({
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

    const csvArticles = await responseArticles.text();
    const articles = csvParse(csvArticles, d => ({
        title: d.title,
        authors: d.authors, 
        position: d.position,
        url: d.url,
        type: d.type,
        country: d.country,
        year: +d.year,
        radius: +d.backlinks || 0
    }));

    return { studies, articles };
};

// Fetch data on initialization
fetchData().then(data => set(data));

export { subscribe };
