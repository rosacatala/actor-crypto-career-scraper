const Apify = require('apify'); // use named export to get the class

Apify.main(async () => {
    // Get the HTML of a web page
    const { body } = await Apify.utils.requestAsBrowser({ url: 'https://www.crypto-careers.com/jobs' });
    console.log(body);
});
