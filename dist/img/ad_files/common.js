$( document ).ready(function(){
    let counter = 1;

    // slide up/down .reply-block 
    $('.section-comments').on('click', '.btn-reply', function(){
        $(this).closest('.comment-container').next('.reply-block').slideDown(300);
    });
    $('.section-comments').on('click', '.cancel-form', function(){
        $(this).closest('.reply-block').slideUp(300);
    });
    
    $.ajax({
        url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
        type: "GET",
        dataType: 'json',
        data: {
            count: 1
        },
        success: function(response) {
            renderHtmlComment(response);
        },
        error: function(response) {
            
        }
    });

    // load more comments
    $('.post-content').on('click', '#addComment', function(){
        $.ajax({
            url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
            type: "GET",
            dataType: 'json',
            data: {
                count: 2,
                offset: counter
            },
            success: function(response) {
                if (response.length < 2) {
                    renderHtmlComment(response);
                    $('#addComment').hide();
                } else {
                    renderHtmlComment(response);
                    counter += 2;
                }
            },
            error: function(response) {
                
            }
        });
    });

    // add new comment
    $('.post-content').on('click', '.send-comment', function(){
        let self = $(this);
        let textComment = $(this).siblings('.text-comment').val();
        let parentID = $(this).closest('article.comment').attr('value') || null;

        if (textComment.length != 0) {
            $.ajax({
                url: "http://frontend-test.pingbull.com/pages/shkurchenko.nikita@gmail.com/comments",
                type: "POST",
                dataType: 'json',
                data: {
                    content: textComment,
                    parent: parentID
                },
                success: function(response) {
                    $(self).siblings('.text-comment').val('')
                    .blur()
                    .addClass('has-been-send')
                    .attr("placeholder", "Your message has been sent");
                },
                error: function(response) {
                    
                }
            }); 
        } else {
            $(this).siblings('.text-comment').focus();
        }

    });

    // delete comment
    $('.section-comments').on('click', '.btn-delete', function(){
        let parentCommentID = $(this).closest('article.comment').attr('value');
        let self = $(this);

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
    });
});


// render functions
function renderHtmlComment(data) {
    let html = '';
    
    for (let i = 0; i < data.length; i++) {
        let createdAt = new Date(data[i].created_at);

        // Timezone off
        let utc = createdAt.getTime() + (createdAt.getTimezoneOffset() * 60000);
        let currDate = new Date(utc);

        
        let commentDate = formatDate(createdAt);
        let commentTime = formatTime(createdAt);
              
        html += '<article class="comment" value="' + data[i].id +'">'
        html += 	'<div class="comment-container">'
        html += 		'<div class="user-avatar"><img alt="' + data[i].author.name +' avatar" src="' + data[i].author.avatar +'"></div>'
        html += 		'<div class="comment-content">'
        html += 			'<div class="comment-author">'
        html += 				'<h2 class="comment-author-name">' + data[i].author.name +'</h2> <span><i aria-hidden="true" class="fa fa-clock-o"></i><span class="span-bold date-posted">' + commentDate +'</span> at <span class="span-bold">' + commentTime +'</span></span>'
        html += 			'</div>'
        html += 			'<p class="comment-text">' + data[i].content +'</p>'
        html += 			'<div class="comment-btns">'
        if (data[i].author.id == 1) {
            html += 				'<span class="btn-edit"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Edit</span> <span class="btn-delete"><i aria-hidden="true" class="fa fa-times"></i> Delete</span> <span class="btn-reply"><i aria-hidden="true" class="fa fa-reply"></i> Reply</span>'
        } else {
            html += 				'<span class="btn-reply"><i aria-hidden="true" class="fa fa-reply"></i> Reply</span>'
        }
        html += 			'</div>'
        html += 		'</div>'
        html += 	'</div>'
        html += 	'<div class="reply-block">'
        html += 		'<div class="comment-form">'
        html += 			'<div class="reply-block-btns">'
        html += 				'<span class="reply-to"><i aria-hidden="true" class="fa fa-share"></i>' + data[i].author.name +'</span> <span class="cancel-form"><i aria-hidden="true" class="fa fa-times"></i> Cancel</span>'
        html += 			'</div>'
        html += 			'<textarea class="text-comment" cols="30" id="" name="" placeholder="Your Message" rows="10"></textarea> <button class="send-comment">Send</button>'
        html += 		'</div>'
        html += 	'</div>'

        if (data[i].children) {
            for (let ii = 0; ii < data[i].children.length; ii++) {
                let childrenCreatedAt = new Date(data[i].children[ii].created_at);

                // Timezone off
                let utc = childrenCreatedAt.getTime() + (childrenCreatedAt.getTimezoneOffset() * 60000);
                let currDate = new Date(utc);

                let childrenCommentDate = formatDate(childrenCreatedAt);
                let childrenCommentTime = formatTime(childrenCreatedAt);
                
                html += 	'<div class="reply-comennts">'
                html += 		'<div class="reply-comment-container">'
                html += 			'<div class="user-avatar"><img alt="' + data[i].children[ii].author.name +' avatar" src="' + data[i].children[ii].author.avatar +'"></div>'
                html += 			'<div class="comment-content">'
                html += 				'<div>'
                html += 					'<span class="comment-author-name">' + data[i].children[ii].author.name +'</span> <span class="share-to"><i aria-hidden="true" class="fa fa-share"></i>' + data[i].author.name + '</span> <span><i aria-hidden="true" class="fa fa-clock-o"></i><span class="span-bold date-posted">' + childrenCommentDate +'</span> at <span class="span-bold">' +  childrenCommentTime +'</span></span>'
                html += 				'</div>'
                html += 				'<p class="comment-text">' + data[i].children[ii].content +'</p>'
                html += 			'</div>'
                html += 		'</div>'
                html += 	'</div>' 
                
            }
        }

        html += '</article>'
    }
    
    $('section.section-comments').append(html);
}

// format Date
function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
    
    
    return yy + '-' + mm + '-' + dd;
}

function formatTime(date) {
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    return hours +':'+ minutes;
}

