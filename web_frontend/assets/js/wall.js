document.addEventListener("DOMContentLoaded", () => {
    let post_form = document.querySelector("#post_form");
    post_form.addEventListener("submit", submitAddPost);

    document.addEventListener("click", closeEditDeleteActions);
});

const closeEditDeleteActions = (event) =>{
    let edit_delet_actions = document.querySelectorAll(".edit_content_form, .delete_btn");
    edit_delet_actions.forEach((element) => {
        element.classList.remove("show");
    });
}

const onEditBtnClick = (event_target = document) =>{
    let edit_btn = event_target.querySelector(".edit_btn");
    edit_btn.addEventListener("click", showEditContentForm);
}

const onDeleteBtnClick = (event_target = document) =>{
    let delete_btn = event_target.querySelector(".delete_btn");
    delete_btn.addEventListener("click", showConfirmDelete);
}

const bindContentEvents = (callback = null) =>{
    onEditBtnClick();
    onDeleteBtnClick();

    if(typeof callback === "function"){
        callback();
    }
}

const showEditContentForm = (event) =>{
    event.stopPropagation();
    let edit_btn = event.target;
    let content_item = edit_btn.parentElement.parentElement.parentElement;
    content_item.querySelector(".edit_content_form").classList.add("show");
    content_item.querySelector(".item_content").focus();
}

const showConfirmDelete = (event) =>{
    event.stopPropagation();
    let delete_btn = event.target;
    let content_item = delete_btn.parentElement.parentElement.parentElement;
    content_item.querySelector(".delete_btn").classList.add("show");
}

const onConfirmDelete = (event) =>{
    event.stopPropagation();
    let delete_btn = event.target;
    let content_item = delete_btn.parentElement.parentElement.parentElement.parentElement;
    content_item.remove();
}

const triggerEditContentForm = (event) =>{
    event.stopPropagation();
}

const submitEditContentForm = (event) =>{
    event.preventDefault();
    let target_form = event.target;
    let item_content = target_form.querySelector(".item_content").value;

    if(item_content.length){
        let parent_item = target_form.parentElement;
        parent_item.querySelector(".item_content_text").innerText = item_content;
        target_form.classList.remove("show");
    }
}

const submitAddPost = (event) =>{
    event.preventDefault();
    let target_form = event.target;
    let post_content = event.target.querySelector(".post_content");
    let post_content_text = post_content.value;

    if(post_content_text.length){
        let post_item_clone = document.querySelector(".post_item_clone").cloneNode(true);
        post_item_clone.classList.remove("post_item_clone");

        let item_post_content = post_item_clone.querySelectorAll(".post_content");
        item_post_content[0].value = post_content_text;
        item_post_content[1].innerText = post_content_text;

        posts_list.prepend(post_item_clone);

        bindContentEvents(() => {
            post_item_clone.querySelector(".yes_btn").addEventListener("click", onConfirmDelete);
            post_item_clone.querySelector(".add_comment_form").addEventListener("submit", onSubmitCommentReply);
            post_item_clone.querySelector(".edit_content_form").addEventListener("submit", submitEditContentForm);
            post_item_clone.querySelector(".save_edit_btn, .item_content").addEventListener("click", triggerEditContentForm);
        });

        target_form.reset();
    }
    return false
}

const onSubmitCommentReply = (event) =>{
    event.preventDefault();
    let target_form = event.target;
    let comment_content_value = target_form.querySelector(".comment_content").value;

    if(comment_content_value.length){
        let comment_reply_item_clone = document.querySelector(".comment_reply_item_clone").cloneNode(true);
        comment_reply_item_clone.classList.remove("comment_reply_item_clone");
        let comment_content = comment_reply_item_clone.querySelectorAll(".comment_content");
        let parent_item = target_form.parentElement;
        
        comment_content[0].value = comment_content_value;
        comment_content[1].innerText = comment_content_value;

        if(parent_item.classList.contains("post_item")){
            parent_item.querySelector(".comments_list").prepend(comment_reply_item_clone);
            comment_reply_item_clone.querySelector(".add_comment_reply_form").addEventListener("submit", onSubmitCommentReply);
        }else{
            parent_item.querySelector(".replies_list").prepend(comment_reply_item_clone);
            comment_reply_item_clone.querySelector(".replies_list").remove();
            comment_reply_item_clone.querySelector(".add_comment_reply_form").remove();
        }
        
        onEditBtnClick(comment_reply_item_clone);
        onDeleteBtnClick(comment_reply_item_clone);
        comment_reply_item_clone.querySelector(".yes_btn").addEventListener("click", onConfirmDelete);
        comment_reply_item_clone.querySelector(".edit_content_form").addEventListener("submit", submitEditContentForm);
        comment_reply_item_clone.querySelector(".save_edit_btn").addEventListener("click", triggerEditContentForm);
        comment_reply_item_clone.querySelector(".save_edit_btn, .item_content").addEventListener("click", triggerEditContentForm);

        target_form.querySelector(".comment_content").value = "";
        parent_item.querySelector(".add_comment_form, .add_comment_reply_form").reset();
    }
}