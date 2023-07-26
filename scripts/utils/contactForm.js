/*global srSpeak */
const contactBtn = document.getElementById("contact_btn");
contactBtn.addEventListener("click",displayModal);
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.ariaHidden = "false";
    document.getElementById("firstname").focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");

    modal.style.display = "none";
    modal.ariaHidden = "true";
}
const form = document.getElementById("formContact");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    srSpeak("message envoyé", "assertive");
    alert("message envoyé");
    form.reset();
    closeModal();

})