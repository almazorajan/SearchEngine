"use strict";

module.exports = Result;

function Result(_success, _message, _data = null) {
    this.success = typeof _success !== "boolean" ? false : _success;
    this.message = typeof _message !== "string" ? "" : _message;
    this.data = typeof _data !== "object" ? {} : _data;
}
