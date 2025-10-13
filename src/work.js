const projects = [
  {
    img: "assets/projects/amazon.png",
    title: "E-Commerce Platform",
    techStack: "React, Node.js, MongoDB",
    code: "#",
    liveLink: "#",
    description: "Full-stack e-commerce solution with React frontend and Node.js backend, featuring payment integration and admin dashboard.",
    type: "personal"
  },
  {
    img: "assets/projects/keep.png",
    title: "Task Management App",
    techStack: "Vue.js, Express, Socket.io",
    code: "#",
    liveLink: "#",
    description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    type: "personal"
  },
  {
    img: "assets/projects/product-management.png",
    title: "Analytics Dashboard",
    techStack: "React, Python, PostgreSQL",
    code: "#",
    liveLink: "#",
    description: "Data visualization dashboard with interactive charts, real-time metrics, and customizable reporting features.",
    type: "personal"
  }
];

const projectContainer = document.querySelector(".project-container");
const filterSelect = document.getElementById("filter");
function renderProjects(projects, filter) {
    if (!projectContainer)
        return;
    projectContainer.innerHTML = ""; // Clear existing projects
    const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.type === filter);
    filteredProjects.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("data-aos", index % 2 === 0 ? "fade-left" : "fade-right");
        row.setAttribute("data-aos-duration", "1000");
        const colImg = document.createElement("div");
        colImg.classList.add("col-work");
        const imgLink = document.createElement("a");
        imgLink.href = item.liveLink || "#";
        imgLink.target = item.liveLink ? "_blank" : "_self";
        if (!item.liveLink)
            imgLink.classList.add("inactive-link");
        const projectImg = document.createElement("img");
        projectImg.src = item.img;
        projectImg.alt = "project-img";
        projectImg.classList.add("project-img");
        imgLink.appendChild(projectImg);
        colImg.appendChild(imgLink);
        const colText = document.createElement("div");
        colText.classList.add("col-work");
        const projectTitle = document.createElement("h3");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = item.title;
        const techStack = document.createElement("p");
        techStack.classList.add("tech-stack-text");
        techStack.textContent = item.techStack;
        const projectTopList = document.createElement("ul");
        projectTopList.classList.add("project-top-list");
        const codeLi = document.createElement("li");
        const codeLink = document.createElement("a");
        codeLink.href = item.code || "#";
        codeLink.target = item.code ? "_blank" : "_self";
        codeLink.textContent = "Code ";
        codeLink.classList.add("links");
        if (!item.code)
            codeLink.classList.add("inactive-link");
        const codeIcon = document.createElement("i");
        codeIcon.classList.add("fab", "fa-github");
        codeLink.appendChild(codeIcon);
        codeLi.appendChild(codeLink);
        const liveLinkLi = document.createElement("li");
        const liveLinkA = document.createElement("a");
        liveLinkA.href = item.liveLink || "#";
        liveLinkA.target = item.liveLink ? "_blank" : "_self";
        liveLinkA.textContent = "Visit Site ";
        liveLinkA.classList.add("links");
        if (!item.liveLink)
            liveLinkA.classList.add("inactive-link");
        const liveLinkIcon = document.createElement("i");
        liveLinkIcon.classList.add("fas", "fa-external-link-alt");
        liveLinkA.appendChild(liveLinkIcon);
        liveLinkLi.appendChild(liveLinkA);
        projectTopList.appendChild(codeLi);
        projectTopList.appendChild(liveLinkLi);
        const projectText = document.createElement("p");
        projectText.classList.add("project-text");
        projectText.textContent = item.description;
        colText.appendChild(projectTitle);
        colText.appendChild(techStack);
        colText.appendChild(projectTopList);
        colText.appendChild(projectText);
        // Alternate layout
        if (index % 2 === 0) {
            row.appendChild(colImg);
            row.appendChild(colText);
        }
        else {
            row.appendChild(colText);
            row.appendChild(colImg);
        }
        projectContainer.appendChild(row);
    });
}
// Render projects on load
renderProjects(projects, "all");
if (filterSelect) {
    filterSelect.addEventListener("change", () => {
        renderProjects(projects, filterSelect.value);
    });
}
