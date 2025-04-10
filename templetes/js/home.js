// Show a specific "page" section and hide the others
function showPage(pageName) {
    // 1) Remove 'active' from all .page sections
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.classList.remove('active'));
  
    // 2) Add 'active' to the chosen page
    const targetId = pageName + 'Page'; // e.g. 'communityPage'
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
      targetPage.classList.add('active');
    } else {
      console.error(`No section with ID: ${targetId}`);
    }
  }
  
  // Side drawer opening
  function openDrawer() {
    document.getElementById('sideDrawer').classList.add('open');
    document.getElementById('drawerOverlay').style.display = 'block';
  }
  
  // Side drawer closing
  function closeDrawer() {
    document.getElementById('sideDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').style.display = 'none';
  }
  
  // Optionally, if you have a “three dots” menu on top right
  function showMenu() {
    alert("Implement top-right menu actions here");
  }
  
  const apiKey = "pub_79524ed4759ec82eab46bff07da8964f7e7ce";
  const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=agriculture%20in%20india&country=in`;

  async function fetchNews() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "success" && data.results.length > 0) {
        const newsCarousel = document.getElementById("newsCarousel");
        const topNews = data.results.slice(0, 3); // Get the first three news articles

        topNews.forEach((news) => {
          const newsCard = document.createElement("div");
          newsCard.classList.add("news-card");
          newsCard.innerHTML = `
            <div class="news-content">
              <a href="${news.link}" target="_blank">
                <h4>${news.title}</h4>
                <p class="time-info">${new Date(news.pubDate).toLocaleString()}</p>
              </a>
            </div>
            <div class="news-image">
              <img src="${news.image_url || "https://via.placeholder.com/80"}" alt="News" />
            </div>
          `;
          newsCarousel.appendChild(newsCard);
        });

        initializeCarousel(); // Initialize the carousel functionality
      } else {
        console.error("No news found or API error.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function initializeCarousel() {
    const carousel = document.querySelector('.news-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    function updateCarousel() {
      const cardWidth = document.querySelector('.news-card').offsetWidth;
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
      const totalCards = document.querySelectorAll('.news-card').length;
      currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : totalCards - 1;
      updateCarousel();
    });
    
    // Optional: Auto-slide every 5 seconds
    setInterval(() => {
      const totalCards = document.querySelectorAll('.news-card').length;
      currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    }, 5000);
  }

  // Fetch news on page load
  fetchNews();


  function animateCount(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 10); // Calculate increment for each step
    let current = start;
  
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end; // Ensure the final value is exactly the end value
        clearInterval(timer); // Stop the animation
      }
      element.innerHTML = Math.floor(current)+"+"; // Update the element's innerHTML
    }, 10); // Update every 10ms
  }
  
  // Call the function to animate the count
  animateCount("famerscount", 0, 100, 5000); // Animate from 0 to 50 over 2 seconds
  animateCount("orgscount", 0, 50, 5000); // Animate from 0 to 100 over 2 seconds



  async function fetchWeather() {
    const apiUrl = "https://api.weatherapi.com/v1/current.json?key=e7e964a02a52400b84b132701251004&q=hyderabad";
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data && data.location && data.current) {
        // Extract weather data
        const locationName = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
        const iconUrl = `https:${data.current.condition.icon}`;
        const lastUpdated = data.current.last_updated;
  
        // Update the weather report block
        const weatherReport = document.querySelector(".weather-report");
        weatherReport.innerHTML = `
          <h3>Weather Report</h3>
          <p>${locationName}, ${region}, ${country}</p>
          <p>${temperature}°C - ${condition}</p>
          <p>Last Updated: ${lastUpdated}</p>
          <div class="weather-icon">
            <img src="${iconUrl}" alt="Weather Icon" />
          </div>
        `;
      } else {
        console.error("Invalid weather data received.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  
  // Call the function to fetch and display weather data
  fetchWeather();



  // Trigger the file input for importing an image
function triggerImportImage() {
  const importInput = document.getElementById("importImageInput");
  importInput.click();

  importInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        displayImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Open the camera to take a picture
function triggerTakePicture() {
  const videoElement = document.createElement("video");
  const captureButton = document.createElement("button");
  const previewContainer = document.getElementById("imagePreview");

  // Set up the video element
  videoElement.autoplay = true;
  videoElement.style.width = "100%";
  videoElement.style.borderRadius = "8px";

  // Set up the capture button
  captureButton.textContent = "Capture";
  captureButton.className = "btn btn-success mt-2";

  // Clear the preview container and add the video and button
  previewContainer.innerHTML = "";
  previewContainer.appendChild(videoElement);
  previewContainer.appendChild(captureButton);
  previewContainer.style.display = "block";

  // Access the user's camera
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;

      captureButton.addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Stop the camera stream
        stream.getTracks().forEach((track) => track.stop());

        // Display the captured image
        const imageData = canvas.toDataURL("image/png");
        displayImage(imageData);
      });
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
      alert("Unable to access the camera. Please check your device settings.");
    });
}

// Display the selected or captured image
function displayImage(imageSrc) {
  const previewImage = document.getElementById("previewImage");
  const getDiagnosisBtn = document.getElementById("getDiagnosisBtn");
  const previewContainer = document.getElementById("imagePreview");

  previewImage.src = imageSrc;
  previewImage.style.width = "100%";
  previewImage.style.borderRadius = "8px";
  previewContainer.style.display = "block";
  getDiagnosisBtn.style.display = "inline-block";
}

// Placeholder function for "Get Diagnosis"
function getDiagnosis() {
  alert("Proceeding to diagnosis...");
}