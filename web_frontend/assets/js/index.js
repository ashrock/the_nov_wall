document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#login_form").addEventListener("submit", submitUserForm)
});

const submitUserForm = async (event) =>{
    event.preventDefault();
    let target_form = event.target;
    let form_fields = new FormData(target_form);
    let errors =document.querySelectorAll(".error");
    let allow_submit = true;

    await errors.forEach(element => {
        element.classList.remove("error");
    });

    for(let [field_name, field_value] of form_fields){
        if(field_value.length){
            document.querySelector(`#${field_name}`).classList.remove("error");
        }else{
            document.querySelector(`#${field_name}`).classList.add("error");
            allow_submit = false;
        }
    }

    if(allow_submit){
        window.location = "./wall.html";
    }
}