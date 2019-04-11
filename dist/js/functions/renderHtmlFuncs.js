"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHtmlComment = renderHtmlComment;
exports.renderSingleHtmlComment = renderSingleHtmlComment;
exports.errorForm = errorForm;
exports.validForm = validForm;

// render functions
function renderHtmlComment(data) {
  var html = "";

  for (var i = 0; i < data.length; i++) {
    var createdAt = new Date(data[i].created_at); // Timezone off

    var utc = createdAt.getTime() + createdAt.getTimezoneOffset() * 60000;
    var currDate = new Date(utc);
    var commentDate = formatDate(createdAt);
    var commentTime = formatTime(createdAt);
    html += "\n        <article class=\"comment\" value=\"".concat(data[i].id, "\">\n\t\t<div class=\"comment-container\">\n\t\t\t<div class=\"user-avatar\"><img alt=\"").concat(data[i].author.name, "\" src=\"").concat(data[i].author.avatar, "\"></div>\n\t\t\t<div class=\"comment-content\">\n\t\t\t\t<div class=\"comment-author\">\n                    <h2 class=\"comment-author-name\">").concat(data[i].author.name, " </h2><time><i aria-hidden=\"true\" class=\"fa fa-clock-o\"></i>\n                    <span class=\"span-bold date-posted\">").concat(commentDate, "</span> at <span class=\"span-bold\">").concat(commentTime, "</span></time>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"comment-text\">").concat(data[i].content, "</p>\n                <div class=\"comment-btns\">");

    if (data[i].author.id === 1) {
      html += "\n                    <span class=\"btn-edit\"><i aria-hidden=\"true\" class=\"fa fa-pencil-square-o\"></i> Edit</span> \n                    <span class=\"btn-delete\"><i aria-hidden=\"true\" class=\"fa fa-times\"></i> Delete</span> \n                    <span class=\"btn-reply\"><i aria-hidden=\"true\" class=\"fa fa-reply\"></i> Reply</span>";
    } else {
      html += "<span class=\"btn-reply\"><i aria-hidden=\"true\" class=\"fa fa-reply\"></i> Reply</span>";
    }

    html += "</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"reply-block form-block\">\n\t\t\t<div class=\"comment-form\">\n\t\t\t\t<div class=\"reply-block-btns\">\n                    <span class=\"reply-to\"><i aria-hidden=\"true\" class=\"fa fa-share\"></i>".concat(data[i].author.name, "</span>\n                     <span class=\"cancel-form\"><i aria-hidden=\"true\" class=\"fa fa-times\"></i> Cancel</span>\n\t\t\t\t</div>\n\t\t\t\t<textarea class=\"text-comment\" cols=\"30\" id=\"\" name=\"\" placeholder=\"Your Message\" rows=\"10\"></textarea> <button class=\"send-comment comment-btn\">Send</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"edit-block form-block\">\n\t\t\t<div class=\"comment-form\">\n\t\t\t\t<div class=\"reply-block-btns\">\n\t\t\t\t\t<span class=\"cancel-form\"><i aria-hidden=\"true\" class=\"fa fa-times\"></i> Cancel</span>\n\t\t\t\t</div>\n\t\t\t\t<textarea class=\"text-comment\" cols=\"30\" id=\"\" name=\"\" placeholder=\"Your Message\" rows=\"10\"></textarea> <button class=\"edit-comment comment-btn\">Edit</button>\n\t\t\t</div>\n\t\t</div>");

    if (data[i].children.length > 0) {
      for (var ii = 0; ii < data[i].children.length; ii++) {
        var childrenCreatedAt = new Date(data[i].children[ii].created_at); // Timezone off

        var _utc = childrenCreatedAt.getTime() + childrenCreatedAt.getTimezoneOffset() * 60000;

        var _currDate = new Date(_utc);

        var childrenCommentDate = formatDate(childrenCreatedAt);
        var childrenCommentTime = formatTime(childrenCreatedAt);
        html += "\n                <div class=\"reply-comennts\">\n                    <div class=\"reply-comment-container\">\n                        <div class=\"user-avatar\"><img alt=\"".concat(data[i].children[ii].author.name, "\" src=\"").concat(data[i].children[ii].author.avatar, "\"></div>\n                        <div class=\"comment-content\">\n                            <div>\n                                <span class=\"comment-author-name\">").concat(data[i].children[ii].author.name, "</span> <span class=\"share-to\"><i aria-hidden=\"true\" class=\"fa fa-share\"></i>").concat(data[i].author.name, "</span> <time><i aria-hidden=\"true\" class=\"fa fa-clock-o\"></i><span class=\"span-bold date-posted\">").concat(childrenCommentDate, "</span> at <span class=\"span-bold\">").concat(childrenCommentTime, "</span></time>\n                            </div>\n                            <p class=\"comment-text\">").concat(data[i].children[ii].content, "</p>\n                        </div>\n                    </div>\n                </div>\n                ");
      }
    }

    html += "</article>";
  }

  $('section.section-comments').append(html);
}

function renderSingleHtmlComment(data) {
  var html = '';
  var createdAt = new Date(data.created_at); // Timezone off

  var utc = createdAt.getTime() + createdAt.getTimezoneOffset() * 60000;
  var currDate = new Date(utc);
  var commentDate = formatDate(createdAt);
  var commentTime = formatTime(createdAt);

  if (data.parent === null) {
    html += "\n            <article class=\"comment\" value=\"".concat(data.id, "\">\n                <div class=\"comment-container\">\n                    <div class=\"user-avatar\"><img alt=\"").concat(data.author.name, "\" src=\"").concat(data.author.avatar, "\"></div>\n                    <div class=\"comment-content\">\n                        <div class=\"comment-author\">\n                            <h2 class=\"comment-author-name\">").concat(data.author.name, "</h2><span><i aria-hidden=\"true\" class=\"fa fa-clock-o\"></i><span class=\"span-bold date-posted\">").concat(commentDate, "</span> at <span class=\"span-bold\">").concat(commentTime, "</span></span>\n                        </div>\n                        <p class=\"comment-text\">").concat(data.content, "</p>\n                        <div class=\"comment-btns\">\n            ");

    if (data.author.id === 1) {
      html += "<span class=\"btn-edit\"><i aria-hidden=\"true\" class=\"fa fa-pencil-square-o\"></i> Edit</span> <span class=\"btn-delete\"><i aria-hidden=\"true\" class=\"fa fa-times\"></i> Delete</span> <span class=\"btn-reply\"><i aria-hidden=\"true\" class=\"fa fa-reply\"></i> Reply</span>";
    } else {
      html += "<span class=\"btn-reply\"><i aria-hidden=\"true\" class=\"fa fa-reply\"></i> Reply</span>";
    }

    html += "</div>\n         \t\t    </div>\n         \t    </div>\n                 <div class=\"reply-block form-block\">\n                 <div class=\"comment-form\">\n                     <div class=\"reply-block-btns\">\n                         <span class=\"reply-to\"><i aria-hidden=\"true\" class=\"fa fa-share\"></i>".concat(data.author.name, "</span> <span class=\"cancel-form\"><i aria-hidden=\"true\" class=\"fa fa-times\"></i> Cancel</span>\n                     </div>\n                     <textarea class=\"text-comment\" cols=\"30\" id=\"\" name=\"\" placeholder=\"Your Message\" rows=\"10\"></textarea> <button class=\"send-comment comment-btn\">Send</button>\n                 </div>\n             </div>\n             <div class=\"edit-block form-block\">\n                 <div class=\"comment-form\">\n                     <div class=\"reply-block-btns\">\n                         <span class=\"cancel-form\"><i aria-hidden=\"true\" class=\"fa fa-times\"></i> Cancel</span>\n                     </div>\n                     <textarea class=\"text-comment\" cols=\"30\" id=\"\" name=\"\" placeholder=\"Your Message\" rows=\"10\"></textarea> <button class=\"edit-comment comment-btn\">Edit</button>\n                 </div>\n             </div>\n             </article>\n            ");
    $('section.section-comments > h2').after(html);
  } else {
    html += "\n        <div class=\"reply-comennts\">\n            <div class=\"reply-comment-container\">\n                <div class=\"user-avatar\"><img alt=\"".concat(data.author.name, "\" src=\"").concat(data.author.avatar, "\"></div>\n                <div class=\"comment-content\">\n                    <div>\n                        <span class=\"comment-author-name\">").concat(data.author.name, "</span> <span class=\"share-to\"><i aria-hidden=\"true\" class=\"fa fa-share\"></i>").concat(data.author.name, "</span> <span><i aria-hidden=\"true\" class=\"fa fa-clock-o\"></i><span class=\"span-bold date-posted\">").concat(commentDate, "</span> at <span class=\"span-bold\">").concat(commentTime, "</span></span>\n                    </div>\n                    <p class=\"comment-text\">").concat(data.content, "</p>\n                </div>\n            </div>\n        </div>\n        ");
    $('[value ="' + data.parent + '"]').append(html);
  }
} // format Date


function formatDate(date) {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  var yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;
  return yy + '-' + mm + '-' + dd;
}

function formatTime(date) {
  var minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  var hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  return hours + ':' + minutes;
} // base function for not valid form


function errorForm(self, msg) {
  var textMsg = msg || "Enter your message";
  $(self).siblings('.text-comment').focus().removeClass('has-been-send').addClass('error').attr("placeholder", textMsg);
}

; // base function for valid form

function validForm(self, msg) {
  var textMsg = msg || "Your message has been sent";
  $(self).siblings('.text-comment').val('').blur().removeClass('error').addClass('has-been-send').attr("placeholder", textMsg);
}

;