document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'yGpMqPtldWjA5kqZOdIMKbwPREAAycM0'; // Replace with your New York Times API key

    // Define the source and section you want to fetch (e.g., 'nyt' and 'business')
    const source = 'nyt';
    const section = 'world';

    // Make a request to the Times Newswire API
    fetchNews(apiKey, source, section);
});

function fetchNews(apiKey, source, section) {
    const apiUrl = `https://api.nytimes.com/svc/news/v3/content/${source}/${section}.json?api-key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("api: " , data);
            displayArticles(data.results);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

function displayArticles(articles) {
    const newsContainer = document.getElementById('news-container');

    // Check if articles is defined and is an array
    if (Array.isArray(articles)) {
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            const breaker = document.createElement('hr');
            articleElement.classList.add('article');

            const titleElement = document.createElement('h2');
            const linkElement = document.createElement('a');
            linkElement.textContent = article.title || 'Title not available';
            linkElement.href = article.url || '#';
            linkElement.target = '_blank';
            titleElement.appendChild(linkElement);

            const abstractElement = document.createElement('p');
            abstractElement.textContent = article.abstract || 'Abstract not available';

            const imageElement = document.createElement('img');
            // Check if the article has multimedia with at least one image
            if (article.multimedia && article.multimedia.length > 0) {
                const multimediaUrl = article.multimedia[2].url;
                imageElement.src = multimediaUrl;
            } else {
                // Add a placeholder image if no multimedia is available
                imageElement.src = 'placeholder.jpg'; // Replace with your placeholder image URL
            }

            articleElement.appendChild(titleElement);
            articleElement.appendChild(imageElement);
            articleElement.appendChild(abstractElement);


            newsContainer.appendChild(articleElement);
        });
    } else {
        // Handle the case where articles is not an array or is undefined
        console.error('No articles found or invalid response.');
    }
}

