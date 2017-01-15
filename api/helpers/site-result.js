
"use strict";

module.exports = SiteResult;

function SiteResult(_title, _link, _summary) {
    this.title = typeof _title !== "string" ? "" : _title;
    this.link = typeof _link !== "string" ? "" : _link;
    this.summary = typeof _summary !== "string" ? "" : _summary;
}

SiteResult.prototype.isComplete = function() {
    return this.title && this.link && this.summary;
}