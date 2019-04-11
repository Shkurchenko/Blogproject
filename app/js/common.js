import {errorForm} from './functions/renderHtmlFuncs.js';
import * as apiFuncs from './functions/apiFunc.js';
$(function(){
    // cache founded selectors
    const sectionComments = $('.section-comments');
    const postContent = $('.post-content');

    //load first 5 comments
    apiFuncs.loadComments(); 

    // slide up/down .reply-block 
    $(sectionComments).on('click', '.btn-reply', function(){
        $(this).closest('.comment-container').next('.reply-block').slideDown(300);
        $(this).closest('.comment-container').siblings('.edit-block').slideUp(300); // hide edit block
    });

    // hide form
    $(sectionComments).on('click', '.cancel-form', function(){
        $(this).closest('.form-block').slideUp(300);
    });
    // edit block 
    $(sectionComments).on('click', '.btn-edit', function(){
        const self = $(this);
        let editText = $(this).closest('.comment-container').find('.comment-content > .comment-text').text();

        // slide up/down .edit-block 
        $(this).closest('.comment-container').siblings('.edit-block').slideDown(300);
        $(this).closest('.comment-container').siblings('.reply-block').slideUp(300); //hide reply block

        // set edit texarea value
        $(this).closest('.comment-container').siblings('.edit-block').find('textarea.text-comment').val(editText);

        // delay before focus textarea
        setTimeout(function(){
            $(self).closest('.comment-container').siblings('.edit-block').find('textarea.text-comment').focus();
          },300);

    });
    $(sectionComments).on('click', '.cancel-form', function(){
        $(this).closest('.edit-block').slideUp(300);
    });    

    // load more comments
    $(postContent).on('click', '#addComment', function(e){
        e.preventDefault();
        apiFuncs.loadMoreComments();
    });

    // add new comment
    $(postContent).on('click', '.send-comment', function(e){
        e.preventDefault();
        let self = $(this);
        let textComment = $(this).siblings('.text-comment').val();
        let parentID = $(this).closest('article.comment').attr('value') || null;

        if (textComment.length !== 0) {
            apiFuncs.addNewComment(textComment,parentID);
        } else {
            errorForm(self);
        }
    });

    // delete comment
    $(sectionComments).on('click', '.btn-delete', function(e){
        e.preventDefault();
        let parentCommentID = $(this).closest('article.comment').attr('value');
        let self = $(this);

        apiFuncs.deleteComment(self, parentCommentID);
           
    });

    // request for edit comment
    $(sectionComments).on('click', '.edit-comment', function(e){
        let editedText = $(this).siblings('textarea.text-comment').val();
        let parentCommentID = $(this).closest('article.comment').attr('value');
        let self = $(this);

        if (editedText.length !== 0) {
            apiFuncs.editComment(self, editedText, parentCommentID);
        } else {
           errorForm(self);
        }
    });
});