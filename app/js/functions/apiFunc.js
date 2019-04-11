import * as myModule from './renderHtmlFuncs.js';

let counter = 5; // comments on page (start)

// load first 5 comments
export function loadComments() {
    $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
        type: "GET",
        dataType: 'json',
        data: {
            count: 6
        },
        success: function(response) {
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
                success: function(response) {
                    myModule.renderHtmlComment(response);
                }
            });
        }
    });
}

// load more comments
export function loadMoreComments() {
    $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
        type: "GET",
        dataType: 'json',
        data: {
            count: 5,
            offset: counter
        },
        success: function(response) {
            if (response.length < 5) {
                myModule.renderHtmlComment(response);
                $('#addComment').hide();
            } else {
                myModule.renderHtmlComment(response);
                counter += 5;
            }
            
        }
    });
}

// add new comment
export function addNewComment(textComment, parentID) {
    $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
        type: "POST",
        dataType: 'json',
        data: {
            content: textComment,
            parent: parentID
        },
        success: function(response) {
            myModule.validForm(self); // base func for customize valid form
            myModule.renderSingleHtmlComment(response); // render comment html
            if (response.parent === null) {
                counter += 1; // +1 for correct work 'load more comments'
            }
        }
    }); 
}

// delete comment
export function deleteComment(self, parentCommentID) {
    $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments/" + parentCommentID + "",
        type: "POST",
        dataType: 'json',
        data: {
            _method: 'DELETE'
        },
        success: function(response) {
            $(self).closest('article.comment').remove();
        }
    }); 
}

// edit comment 
export function editComment(self, editedText, parentCommentID) {
    $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments/" + parentCommentID + "",
        type: "POST",
        dataType: 'json',
        data: {
            _method: 'PUT',
            content: editedText
        },
        success: function(response) {
            $(self).closest('article.comment').find('.comment-container > .comment-content').find('.comment-text').text(editedText);
            $(self).closest('.edit-block').slideUp(300);
        }
    });  
}