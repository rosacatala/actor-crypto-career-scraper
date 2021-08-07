const Apify = require('apify'); // use named export to get the class

// Apify.main(async () => {
//     // Get the HTML of a web page
//     const { body } = await Apify.utils.requestAsBrowser({ url: 'https://www.crypto-careers.com/jobs' });
//     console.log(body);
// });

Apify.main(async () => {
    // Create a RequestQueue
    const requestQueue = await Apify.openRequestQueue();
    // Define the starting URL
    await requestQueue.addRequest({ url: 'https://www.crypto-careers.com/jobs' });
    // Function called for each URL
    const handlePageFunction = async ({ request, $ }) => {
        console.log(request.url);
        // Add some links from page to RequestQueue
        await Apify.utils.enqueueLinks({
            $,
            requestQueue,
            baseUrl: request.loadedUrl,
            pseudoUrls: ['http[s?]://www.crypto-careers.com/jobs/[(\d)+(\w|-)*]'],
            // pseudoUrls: ['http[s?]://www.crypto-careers.com/jobs/[.*]/[.+]'],
        });
    };
    // Create a CheerioCrawler
    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        handlePageFunction,
        maxRequestsPerCrawl: 10, // Limitation for only 10 requests (do not use if you want to crawl all links)
    });
    // Run the crawler
    await crawler.run();
});
