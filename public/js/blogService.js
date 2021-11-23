import axios from "axios";
import { getHeaders } from "./_services";
import { showAlert, alertType } from "./alert";

const title = document.getElementById("blog_title");
const description = document.getElementById("blog_description");
const poster = document.getElementById("blog_poster");
const posterLabel = document.getElementById("blog_poster_label");
const posterPreview = document.getElementById("blog_poster_preview");
const saveBtn = document.getElementById("save-editor");
const editBtn = document.getElementById("edit-editor");

if (poster) {
  poster.addEventListener("change", async (e) => {
    posterLabel.innerText = "Uploading..";
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const { data } = await axios.post("/api/v1/upload", formData);
    poster.dataset.path = data.location;
    posterPreview.src = data.location;
    posterLabel.innerText = "Upload Poster";
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", async function () {
    try {
      const body = window.tinymce.activeEditor.getContent();
      const titleValue = title.value;
      const descriptionValue = description.value;
      const blogData = {
        title: titleValue,
        description: descriptionValue,
        body,
        poster: poster.dataset.path,
      };

      if (
        !blogData.title ||
        !blogData.description ||
        !blogData.poster ||
        !blogData.body
      ) {
        showAlert("Invalid details", alertType[1]);
        return;
      }

      saveBtn.innerText = "Please wait...";

      const { data } = await axios.post("/api/v1/blog", blogData, {
        headers: getHeaders(),
      });
      if (!data.status) {
        showAlert(data.message || "something wrong happened", alertType[1]);
        return;
      }
      saveBtn.innerText = "Save";
      showAlert("Blog created successfully", alertType[0]);
    } catch (error) {
      console.log(error.response.data);
      saveBtn.innerText = "Save";
    }
  });
}

if (editBtn) {
  editBtn.addEventListener("click", async function () {
    try {
      const body = window.tinymce.activeEditor.getContent();
      const titleValue = title.value;
      const descriptionValue = description.value;
      const blogData = {
        title: titleValue,
        description: descriptionValue,
        body,
        poster: poster.dataset.path,
      };

      if (
        !blogData.title ||
        !blogData.description ||
        !blogData.poster ||
        !blogData.body
      ) {
        showAlert("Invalid details", alertType[1]);
        return;
      }

      editBtn.innerText = "Please wait...";

      const { data } = await axios.put(
        `/api/v1/blog/${editBtn.dataset.id}`,
        blogData,
        { headers: getHeaders() }
      );

      editBtn.innerText = "Edit";
      showAlert("Blog edited successfully", alertType[0]);
    } catch (error) {
      showAlert(data.message || "something wrong happened", alertType[1]);
      editBtn.innerText = "Edit";
    }
  });
}

const blogListContainer = document.getElementById("blog_list_container");
if (blogListContainer) {
  blogListContainer.addEventListener("click", async (e) => {
    try {
      if (e.target.dataset.id) {
        console.log(e.target.dataset.id, e.target.dataset.action);
        if (e.target.dataset.action === "edit") {
          window.location.assign(`/admin/edit/${e.target.dataset.id}`);
        } else {
          axios.delete(`/api/v1/blog/${e.target.dataset.id}`, {
            headers: getHeaders(),
          });
          showAlert("Blog deleted successfully", alertType[0]);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } catch (error) {
      showAlert("something wrong happened", alertType[1]);
    }
  });
}

if (window.location.pathname.startsWith("/blog/")) {
  const container = document.getElementById("blogContainer");
  const content = container.innerText;
  container.innerHTML = content;
}
