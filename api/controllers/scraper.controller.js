"use strict";

const express = require("express");
const fs = require("fs");
const SiteResult = require("../helpers/site-result.js");
const Result = require("../helpers/result.js");
const scraper = require("../helpers/scraper.js");
const router = express.Router();

module.exports = router;

router.get("/google/:keyword", (req, res) => {
    try {
        let keyword = req.params["keyword"].replace(/\s+/g, "+");

        scraper.requestPage(`https://www.google.com/search?q=${keyword}`, $ => {
            let output = [];
            let counter = 1;
            let container = $(`#ires > ol > div:nth-child(${counter})`);

            while (container.length) {
                container = $(`#ires > ol > div:nth-child(${counter})`);
                let siteResult = new SiteResult(
                    container.find("h3").text(),
                    container.find("div > div > cite").text(),
                    container.find("div > span").text());
                
                if(siteResult.isComplete()) {
                    siteResult.fixLink();
                    output.push(siteResult);
                }

                counter++;
            }

            res.json(new Result(true, "Scrape successful", output));
        }, error => {
            res.json(new Result(false, error));
        });
    } catch (e) {
        res.json(new Result(false, `Exception occurred: ${e || e.message}`, e));
    }
});

router.get("/bing/:keyword", (req, res) => {
    try {
        let keyword = req.params["keyword"].replace(/\s+/g, "+");

        scraper.requestPage(`http://www.bing.com/search?q=${keyword}`, $ => {
            let output = [];
            let counter = 2;
            let container = $(`#b_results > li:nth-child(${counter})`);

            while (container.length) {
                container = $(`#b_results > li:nth-child(${counter})`);
                let siteResult = new SiteResult(
                    container.find("h2").text(),
                    container.find("div > div > cite").text(),
                    container.find("div > p").text());

                if(siteResult.isComplete()) {
                    siteResult.fixLink();
                    output.push(siteResult);
                }

                counter++;
            }

            res.json(new Result(true, "Scrape successful", output));
        }, error => {
            res.json(new Result(false, error));
        });
    } catch (e) {
        res.json(new Result(false, `Exception occurred: ${e || e.message}`, e));
    }
});
