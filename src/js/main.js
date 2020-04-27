var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.previousElementSibling;
        console.log(content.style.height);
        if (content.style.height === "0px") {
            content.style.height = "auto";
        this.innerHTML = "read less.";

        } else {
            content.style.height = "0px";
        this.innerHTML = "read more.";

        }
    });
}