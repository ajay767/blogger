const jsCookie = require("js-cookie");
const url = window.location.pathname;
const sideBar = document.getElementById("sidebar");

const sideBarItems = [
  { title: "All Blogs", path: "/admin" },
  { title: "Create Blog", path: "/admin/create" },
];

if (sideBar) {
  sideBarItems.forEach((el) => {
    const anchor = document.createElement("a");
    anchor.className = "p-4 text-xs block cursor-pointer uppercase";
    const link = document.createTextNode(`${el.title}`);
    anchor.appendChild(link);
    if (url !== el.path) {
      anchor.classList.add("hover:bg-gray-100");
    } else {
      anchor.classList.add("bg-yellow-500");
      anchor.classList.add("text-white");
    }
    anchor.href = `${el.path}`;
    sideBar.appendChild(anchor);
  });

  const span = document.createElement("span");
  span.className =
    "p-4 text-xs block cursor-pointer uppercase bg-red-500 text-white";
  span.innerText = "Logout";
  sideBar.appendChild(span);

  span.addEventListener("click", function () {
    const js = jsCookie.remove("jwt", { path: "/" });
    console.log(js);
    window.location.reload();
  });
}
