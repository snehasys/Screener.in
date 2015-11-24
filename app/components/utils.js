'use strict';
/* global require, document, process */
var React = require('react');
var uniqueId = require('lodash/utility/uniqueId');

function setTitle(title) {
  var fullTitle = title.trim() + ' - Screener.in';
  document.title = fullTitle;
  var location = window.location.pathname;
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  if(!window.ga)
    return;
  window.ga('set', {
    page: location,
    title: fullTitle
  });
  window.ga('send', 'pageview');
}

function scrollToTop() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function toSlug(text) {
  return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

function toMY(dt) {
  var ndt = new Date(dt);
  return ndt.toLocaleString('en-us', {month: "short", year: "numeric"});
}

function toLocalDate(dt) {
  var ndt = new Date(dt);
  return ndt.toLocaleString('en-uk', {month: "short", day: "numeric", year: "numeric"});
}

function toYear(dt) {
  var ndt = new Date(dt);
  return ndt.toLocaleString('en-uk', {year: "numeric"});
}

function toLocalNumber(value) {
  var options = {minimumFractionDigits: 2};
  return parseFloat(value).toLocaleString('en-IN', options);
}

function withUnit(value, unit) {
  if(value === null || value === undefined)
    return '--';
  value = toLocalNumber(value);
  if(unit == 'Rs.Cr.' || unit === undefined)
    return '₹ ' + value + ' Cr.';
  if(unit == 'Rs.')
    return '₹ ' + value;
  if(unit == '%')
    return value + '%';
  return value;
}

function getPageNumbers(currentPage, totalPages) {
  var pages = [];
  for (var i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i);
    }
  }
  if(pages.indexOf(2) == -1 && totalPages > 2)
    pages.unshift("…");
  if(pages.indexOf(1) == -1)
    pages.unshift(1);
  if(pages.indexOf(totalPages - 1) == -1 && totalPages > 2)
    pages.push("…");
  if(pages.indexOf(totalPages) == -1)
    pages.push(totalPages);
  return pages;
}

function getFormData(form) {
  var data = {};
  for (var i = 0; i < form.elements.length; i++) {
    var elem = form.elements[i];
    data[elem.name] = elem.value;
  }
  return data;
}

module.exports.setTitle = setTitle;
module.exports.scrollToTop = scrollToTop;
module.exports.toSlug = toSlug;
module.exports.toLocalNumber = toLocalNumber;
module.exports.toLocalDate = toLocalDate;
module.exports.toYear = toYear;
module.exports.toMY = toMY;
module.exports.withUnit = withUnit;
module.exports.getPageNumbers = getPageNumbers;
module.exports.getFormData = getFormData;
