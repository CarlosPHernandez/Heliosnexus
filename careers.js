const jobs = [
    {
        title: "Full Stack Developer",
        image: "software-engineer.svg",
        details: 
        "We are currently seeking a highly skilled Full Stack Developer to join our innovative team, driving the development of cutting-edge solutions that redefine industry standards. This role calls for a dedicated professional committed to excellence, capable of delivering comprehensive and impactful technological advancements.",
        openPositions: "1",
        link:"https://forms.gle/9cWiUtSM6q2Ndnse7",
    },

    {
        title: "Master Electrician",
        image: "electrician.png",
        details: 
        "Join our dynamic solar startup as a Master Electrician, where you'll lead the electrical aspects of our solar panel installations. Your expertise will be essential in ensuring the safety, compliance, and efficiency of our projects, contributing to our mission of delivering sustainable energy solutions.",
        openPositions: "2",
        link:"https://forms.gle/xL2PeNsR9JpBQqgg6",
    },

];   

const jobsHeading = document.querySelector(".jobs-list-container h2");
const jobsContainer = document.querySelector(".jobs-list-container .jobs");
const jobSearch = document.querySelector(".jobs-list-container .job-search");
let searchTerm ="";

if (jobs.length == 1) {
    jobsHeading.innerHTML = `${jobs.length} Job`;
} else {
    jobsHeading.innerHTML = `${jobs.length} Jobs`;
};

const createJobListingCards = () => {

    jobsContainer.innerHTML = "";

    jobs.forEach((job) => {
        if (job.title.toLowerCase().includes(searchTerm.toLowerCase())) {

        let jobCard = document.createElement("div");
        jobCard.classList.add("job");

        let image = document.createElement("img");
        image.src = job.image;

        let title = document.createElement("h3");
        title.innerHTML = job.title;
        title.classList.add(".job-title");

        let details = document.createElement("div");
        details.innerHTML = job.details;
        details.classList.add("details");

        let detailsBtn = document.createElement("a");
        detailsBtn.href = job.link;
        detailsBtn.innerHTML = "More Details";
        detailsBtn.classList.add("details-btn");

        let openPositions = document.createElement("span");
        openPositions.classList.add("open-positions");

        if (job.openPositions == 1) {
            openPositions.innerHTML = `${job.openPositions} open position`; 
        } else {
            openPositions.innerHTML = `${job.openPositions} open positions`;
        }

        jobCard.appendChild(image);
        jobCard.appendChild(title);
        jobCard.appendChild(details);
        jobCard.appendChild(detailsBtn);
        jobCard.appendChild(openPositions);

        jobsContainer.appendChild(jobCard);
        }
    });
};

createJobListingCards();

jobSearch.addEventListener("input", (e) =>  { 
    searchTerm = e.target.value;

    createJobListingCards();
});
