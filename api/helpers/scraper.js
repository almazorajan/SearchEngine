"use strict";

const request = require("request");
const cheerio = require("cheerio");
const scraper = {
    requestPage: requestPage
};

module.exports = scraper;

function requestPage(uri, successCb, failedCb) {
    try {
        request(uri, (error, response, html) => {
            if (error) throw error;
            
            successCb(cheerio.load(html));
        });
    } catch (e) {
        console.log(`Failed: ${e || e.message}`);
        failedCb(e || e.message);
    }
}