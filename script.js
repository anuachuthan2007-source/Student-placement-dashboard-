const jobs = [
    {
        id: 1,
        company: "Tech Solutions",
        title: "Software Developer",
        type: "software",
        location: "Chennai",
        salary: "₹6 LPA",
        deadline: "15 October 2026"
    },
    {
        id: 2,
        company: "Data Systems",
        title: "Data Analyst",
        type: "data",
        location: "Bangalore",
        salary: "₹5 LPA",
        deadline: "20 October 2026"
    },
    {
        id: 3,
        company: "WebWorks",
        title: "Web Developer",
        type: "web",
        location: "Chennai",
        salary: "₹4.5 LPA",
        deadline: "25 October 2026"
    },
    {
        id: 4,
        company: "Innovate Labs",
        title: "Software Engineer",
        type: "software",
        location: "Hyderabad",
        salary: "₹7 LPA",
        deadline: "30 October 2026"
    }
];

let applications = [];

let interviews = [];


// LOGIN

function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    if (
        email === "student@gmail.com" &&
        password === "123456"
    ) {

        document.getElementById("loginSection").style.display =
            "none";

        document.getElementById("mainContent").style.display =
            "block";

        showSection("dashboard");

        updateDashboard();

    } else {

        message.textContent =
            "Invalid email or password.";

        message.style.color = "red";
    }
}


// LOGOUT

function logout() {

    document.getElementById("mainContent").style.display =
        "none";

    document.getElementById("loginSection").style.display =
        "flex";
}


// NAVIGATION

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document
        .getElementById(sectionName)
        .classList.add("active");

    if (sectionName === "jobs") {
        displayJobs(jobs);
    }

    if (sectionName === "applications") {
        displayApplications();
    }

    updateDashboard();
}


// DISPLAY JOBS

function displayJobs(jobList) {

    const container =
        document.getElementById("jobList");

    container.innerHTML = "";

    jobList.forEach(job => {

        const alreadyApplied =
            applications.some(app => app.id === job.id);

        const card =
            document.createElement("div");

        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Deadline:</strong> ${job.deadline}</p>

            <button
                class="apply-btn ${alreadyApplied ? "applied" : ""}"
                onclick="applyJob(${job.id})"
                ${alreadyApplied ? "disabled" : ""}
            >
                ${alreadyApplied ? "Applied ✓" : "Apply Now"}
            </button>
        `;

        container.appendChild(card);
    });
}


// APPLY FOR JOB

function applyJob(id) {

    const job =
        jobs.find(item => item.id === id);

    if (!job) return;

    if (
        applications.some(app => app.id === id)
    ) {
        return;
    }

    applications.push({
        id: job.id,
        title: job.title,
        company: job.company,
        status: "Applied"
    });

    alert("Application submitted successfully!");

    displayJobs(jobs);

    updateDashboard();
}


// SEARCH JOBS

function searchJobs() {

    const search =
        document
            .getElementById("jobSearch")
            .value
            .toLowerCase();

    const results =
        jobs.filter(job =>
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search)
        );

    displayJobs(results);
}


// FILTER JOBS

function filterJobs() {

    const filter =
        document.getElementById("jobFilter").value;

    if (filter === "all") {

        displayJobs(jobs);

    } else {

        const results =
            jobs.filter(job =>
                job.type === filter
            );

        displayJobs(results);
    }
}


// APPLICATIONS

function displayApplications() {

    const container =
        document.getElementById("applicationList");

    container.innerHTML = "";

    if (applications.length === 0) {

        container.innerHTML =
            "<p>No applications yet.</p>";

        return;
    }

    applications.forEach(app => {

        const card =
            document.createElement("div");

        card.className = "application-card";

        card.innerHTML = `
            <h3>${app.title}</h3>
            <p>Company: ${app.company}</p>
            <p class="status">
                Status: ${app.status}
            </p>
        `;

        container.appendChild(card);
    });
}


// DASHBOARD

function updateDashboard() {

    document.getElementById("jobCount").textContent =
        jobs.length;

    document.getElementById("applicationCount").textContent =
        applications.length;

    document.getElementById("shortlistedCount").textContent =
        applications.filter(
            app => app.status === "Shortlisted"
        ).length;

    document.getElementById("interviewCount").textContent =
        interviews.length;

    const interviewList =
        document.getElementById("interviewList");

    if (interviews.length === 0) {

        interviewList.innerHTML =
            "<p>No interviews scheduled.</p>";

    } else {

        interviewList.innerHTML =
            interviews.map(interview =>
                `<p>📅 ${interview}</p>`
            ).join("");
    }
}


// PROFILE

function saveProfile() {

    const name =
        document.getElementById("profileName").value;

    const message =
        document.getElementById("profileMessage");

    message.textContent =
        "Profile saved successfully!";

    message.style.color = "green";

    document.querySelector("#dashboard h2").textContent =
        "Welcome, " + name + " 👋";
}