"use strict";

var _renderHtmlFuncs = require("./functions/renderHtmlFuncs.js");

var apiFuncs = _interopRequireWildcard(require("./functions/apiFunc.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

$(function () {
  // cache founded selectors
  var sectionComments = $('.section-comments');
  var postContent = $('.post-content'); //load first 5 comments

  apiFuncs.loadComments(); // slide up/down .reply-block 

  $(sectionComments).on('click', '.btn-reply', function () {
    $(this).closest('.comment-container').next('.reply-block').slideDown(300);
    $(this).closest('.comment-container').siblings('.edit-block').slideUp(300); // hide edit block
  }); // hide form

  $(sectionComments).on('click', '.cancel-form', function () {
    $(this).closest('.form-block').slideUp(300);
  }); // edit block 

  $(sectionComments).on('click', '.btn-edit', function () {
    var self = $(this);
    var editText = $(this).closest('.comment-container').find('.comment-content > .comment-text').text(); // slide up/down .edit-block 

    $(this).closest('.comment-container').siblings('.edit-block').slideDown(300);
    $(this).closest('.comment-container').siblings('.reply-block').slideUp(300); //hide reply block
    // set edit texarea value

    $(this).closest('.comment-container').siblings('.edit-block').find('textarea.text-comment').val(editText); // delay before focus textarea

    setTimeout(function () {
      $(self).closest('.comment-container').siblings('.edit-block').find('textarea.text-comment').focus();
    }, 300);
  });
  $(sectionComments).on('click', '.cancel-form', function () {
    $(this).closest('.edit-block').slideUp(300);
  }); // load more comments

  $(postContent).on('click', '#addComment', function (e) {
    e.preventDefault();
    apiFuncs.loadMoreComments();
  }); // add new comment

  $(postContent).on('click', '.send-comment', function (e) {
    e.preventDefault();
    var self = $(this);
    var textComment = $(this).siblings('.text-comment').val();
    var parentID = $(this).closest('article.comment').attr('value') || null;

    if (textComment.length !== 0) {
      apiFuncs.addNewComment(textComment, parentID);
    } else {
      (0, _renderHtmlFuncs.errorForm)(self);
    }
  }); // delete comment

  $(sectionComments).on('click', '.btn-delete', function (e) {
    e.preventDefault();
    var parentCommentID = $(this).closest('article.comment').attr('value');
    var self = $(this);
    apiFuncs.deleteComment(self, parentCommentID);
  }); // request for edit comment

  $(sectionComments).on('click', '.edit-comment', function (e) {
    var editedText = $(this).siblings('textarea.text-comment').val();
    var parentCommentID = $(this).closest('article.comment').attr('value');
    var self = $(this);

    if (editedText.length !== 0) {
      apiFuncs.editComment(self, editedText, parentCommentID);
    } else {
      (0, _renderHtmlFuncs.errorForm)(self);
    }
  });
});