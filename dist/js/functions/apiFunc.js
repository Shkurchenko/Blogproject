"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadComments = loadComments;
exports.loadMoreComments = loadMoreComments;
exports.addNewComment = addNewComment;
exports.deleteComment = deleteComment;
exports.editComment = editComment;

var myModule = _interopRequireWildcard(require("./renderHtmlFuncs.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var counter = 5; // comments on page (start)
// load first 5 comments

function loadComments() {
  $.ajax({
    url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
    type: "GET",
    dataType: 'json',
    data: {
      count: 6
    },
    success: function success(response) {
      if (response.length <= 5) {
        $('#addComment').hide();
      }

      $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
        type: "GET",
        dataType: 'json',
        data: {
          count: 5
        },
        success: function success(response) {
          myModule.renderHtmlComment(response);
        }
      });
    }
  });
} // load more comments


function loadMoreComments() {
  $.ajax({
    url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
    type: "GET",
    dataType: 'json',
    data: {
      count: 5,
      offset: counter
    },
    success: function success(response) {
      if (response.length < 5) {
        myModule.renderHtmlComment(response);
        $('#addComment').hide();
      } else {
        myModule.renderHtmlComment(response);
        counter += 5;
      }
    }
  });
} // add new comment


function addNewComment(textComment, parentID) {
  $.ajax({
    url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
    type: "POST",
    dataType: 'json',
    data: {
      content: textComment,
      parent: parentID
    },
    success: function success(response) {
      myModule.validForm(self); // base func for customize valid form

      myModule.renderSingleHtmlComment(response); // render comment html

      if (response.parent === null) {
        counter += 1; // +1 for correct work 'load more comments'
      }
    }
  });
} // delete comment


function deleteComment(self, parentCommentID) {
  $.ajax({
    url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments/" + parentCommentID + "",
    type: "POST",
    dataType: 'json',
    data: {
      _method: 'DELETE'
    },
    success: function success(response) {
      $(self).closest('article.comment').remove();
    }
  });
} // edit comment 


function editComment(self, editedText, parentCommentID) {
  $.ajax({
    url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments/" + parentCommentID + "",
    type: "POST",
    dataType: 'json',
    data: {
      _method: 'PUT',
      content: editedText
    },
    success: function success(response) {
      $(self).closest('article.comment').find('.comment-container > .comment-content').find('.comment-text').text(editedText);
      $(self).closest('.edit-block').slideUp(300);
    }
  });
}