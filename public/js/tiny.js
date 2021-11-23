window.tinymce.init({
  selector: "#tinymce",
  images_upload_url: "/api/v1/upload",
  plugins:
    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
  toolbar_mode: "floating",
});

window.onload = function () {
  setTimeout(() => {
    console.log("hii");
    window.tinymce.activeEditor.getBody().innerHTML =
      document.getElementById("tinymce").innerText;
  }, 2000);
};
