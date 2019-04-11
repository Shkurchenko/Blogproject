// render functions
export function renderHtmlComment(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        let createdAt = new Date(data[i].created_at);

        // Timezone off
        let utc = createdAt.getTime() + (createdAt.getTimezoneOffset() * 60000);
        let currDate = new Date(utc);

        
        let commentDate = formatDate(createdAt);
        let commentTime = formatTime(createdAt);
        
        html += `
        <article class="comment" value="${data[i].id}">
		<div class="comment-container">
			<div class="user-avatar"><img alt="${data[i].author.name}" src="${data[i].author.avatar}"></div>
			<div class="comment-content">
				<div class="comment-author">
                    <h2 class="comment-author-name">${data[i].author.name} </h2><time><i aria-hidden="true" class="fa fa-clock-o"></i>
                    <span class="span-bold date-posted">${commentDate}</span> at <span class="span-bold">${commentTime}</span></time>
				</div>
				<p class="comment-text">${data[i].content}</p>
                <div class="comment-btns">`
        if (data[i].author.id === 1) {
            html += `
                    <span class="btn-edit"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Edit</span> 
                    <span class="btn-delete"><i aria-hidden="true" class="fa fa-times"></i> Delete</span> 
                    <span class="btn-reply"><i aria-hidden="true" class="fa fa-reply"></i> Reply</span>`;
        } else {
            html += `<span class="btn-reply"><i aria-hidden="true" class="fa fa-reply"></i> Reply</span>`;
        }
		html += `</div>
			</div>
		</div>
		<div class="reply-block form-block">
			<div class="comment-form">
				<div class="reply-block-btns">
                    <span class="reply-to"><i aria-hidden="true" class="fa fa-share"></i>${data[i].author.name}</span>
                     <span class="cancel-form"><i aria-hidden="true" class="fa fa-times"></i> Cancel</span>
				</div>
				<textarea class="text-comment" cols="30" id="" name="" placeholder="Your Message" rows="10"></textarea> <button class="send-comment comment-btn">Send</button>
			</div>
		</div>
		<div class="edit-block form-block">
			<div class="comment-form">
				<div class="reply-block-btns">
					<span class="cancel-form"><i aria-hidden="true" class="fa fa-times"></i> Cancel</span>
				</div>
				<textarea class="text-comment" cols="30" id="" name="" placeholder="Your Message" rows="10"></textarea> <button class="edit-comment comment-btn">Edit</button>
			</div>
		</div>`;

        if (data[i].children.length > 0) {
            
            for (let ii = 0; ii < data[i].children.length; ii++) {
                let childrenCreatedAt = new Date(data[i].children[ii].created_at);

                // Timezone off
                let utc = childrenCreatedAt.getTime() + (childrenCreatedAt.getTimezoneOffset() * 60000);
                let currDate = new Date(utc);

                let childrenCommentDate = formatDate(childrenCreatedAt);
                let childrenCommentTime = formatTime(childrenCreatedAt);
                
                html += `
                <div class="reply-comennts">
                    <div class="reply-comment-container">
                        <div class="user-avatar"><img alt="${data[i].children[ii].author.name}" src="${data[i].children[ii].author.avatar}"></div>
                        <div class="comment-content">
                            <div>
                                <span class="comment-author-name">${data[i].children[ii].author.name}</span> <span class="share-to"><i aria-hidden="true" class="fa fa-share"></i>${data[i].author.name}</span> <time><i aria-hidden="true" class="fa fa-clock-o"></i><span class="span-bold date-posted">${childrenCommentDate}</span> at <span class="span-bold">${childrenCommentTime}</span></time>
                            </div>
                            <p class="comment-text">${data[i].children[ii].content}</p>
                        </div>
                    </div>
                </div>
                `;
            }
            
        }

        html += `</article>`;
    }
   
    $('section.section-comments').append(html);
}

export function renderSingleHtmlComment(data) {
    let html = '';

    let createdAt = new Date(data.created_at);

    // Timezone off
    let utc = createdAt.getTime() + (createdAt.getTimezoneOffset() * 60000);
    let currDate = new Date(utc);

    let commentDate = formatDate(createdAt);
    let commentTime = formatTime(createdAt);

    if (data.parent === null) {
        html += `
            <article class="comment" value="${data.id}">
                <div class="comment-container">
                    <div class="user-avatar"><img alt="${data.author.name}" src="${data.author.avatar}"></div>
                    <div class="comment-content">
                        <div class="comment-author">
                            <h2 class="comment-author-name">${data.author.name}</h2><span><i aria-hidden="true" class="fa fa-clock-o"></i><span class="span-bold date-posted">${commentDate}</span> at <span class="span-bold">${commentTime}</span></span>
                        </div>
                        <p class="comment-text">${data.content}</p>
                        <div class="comment-btns">
            `;
        if (data.author.id === 1) {
            html += 				`<span class="btn-edit"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Edit</span> <span class="btn-delete"><i aria-hidden="true" class="fa fa-times"></i> Delete</span> <span class="btn-reply"><i aria-hidden="true" class="fa fa-reply"></i> Reply</span>`;
        } else {
            html += 				`<span class="btn-reply"><i aria-hidden="true" class="fa fa-reply"></i> Reply</span>`;
        }
            html += 	`</div>
         		    </div>
         	    </div>
                 <div class="reply-block form-block">
                 <div class="comment-form">
                     <div class="reply-block-btns">
                         <span class="reply-to"><i aria-hidden="true" class="fa fa-share"></i>${data.author.name}</span> <span class="cancel-form"><i aria-hidden="true" class="fa fa-times"></i> Cancel</span>
                     </div>
                     <textarea class="text-comment" cols="30" id="" name="" placeholder="Your Message" rows="10"></textarea> <button class="send-comment comment-btn">Send</button>
                 </div>
             </div>
             <div class="edit-block form-block">
                 <div class="comment-form">
                     <div class="reply-block-btns">
                         <span class="cancel-form"><i aria-hidden="true" class="fa fa-times"></i> Cancel</span>
                     </div>
                     <textarea class="text-comment" cols="30" id="" name="" placeholder="Your Message" rows="10"></textarea> <button class="edit-comment comment-btn">Edit</button>
                 </div>
             </div>
             </article>
            `;

        $('section.section-comments > h2').after(html);
    } else {
        html += `
        <div class="reply-comennts">
            <div class="reply-comment-container">
                <div class="user-avatar"><img alt="${data.author.name}" src="${data.author.avatar}"></div>
                <div class="comment-content">
                    <div>
                        <span class="comment-author-name">${data.author.name}</span> <span class="share-to"><i aria-hidden="true" class="fa fa-share"></i>${data.author.name}</span> <span><i aria-hidden="true" class="fa fa-clock-o"></i><span class="span-bold date-posted">${commentDate}</span> at <span class="span-bold">${commentTime}</span></span>
                    </div>
                    <p class="comment-text">${data.content}</p>
                </div>
            </div>
        </div>
        `; 
        $('[value ="'+ data.parent +'"]').append(html);
    }
 
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

// base function for not valid form
export function errorForm(self, msg) {
    let textMsg =  msg || "Enter your message";

    $(self).siblings('.text-comment').focus()
            .removeClass('has-been-send')
            .addClass('error')
            .attr("placeholder", textMsg);
};

// base function for valid form
export function validForm(self, msg) {
    let textMsg =  msg || "Your message has been sent";

    $(self).siblings('.text-comment').val('')
                    .blur()
                    .removeClass('error')
                    .addClass('has-been-send')
                    .attr("placeholder", textMsg);
};

