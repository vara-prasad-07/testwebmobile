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

  function getDiagnosis() {
    predictDisease(); // Call the predictDisease function from output.js
  }
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

  // Initialize the client on page load
  
  // Expose functions to the global scope if needed
  function triggerImportImage() {
    const importInput = document.getElementById("importImageInput");
    importInput.click();
  
    // Move your 'change' event listener OUTSIDE the function if you want to avoid multiple attachments each click.
    importInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function (e) {
        // e.target.result is a base64 DataURL
        displayImage(e.target.result, file);
      };
      reader.readAsDataURL(file);
    });
  }
  
  function triggerTakePicture() {
    const videoElement = document.createElement("video");
    const captureButton = document.createElement("button");
    const switchCameraButton = document.createElement("button");
    const previewContainer = document.getElementById("imagePreview");
  
    videoElement.autoplay = true;
    videoElement.playsInline = true; // Important for iOS
    videoElement.style.width = "100%";
    videoElement.style.borderRadius = "8px";
    
    captureButton.textContent = "Capture";
    captureButton.className = "btn btn-success mt-2";
    
    switchCameraButton.textContent = "Switch Camera";
    switchCameraButton.className = "btn btn-secondary mt-2 ml-2";
  
    previewContainer.innerHTML = "";
    previewContainer.appendChild(videoElement);
    previewContainer.appendChild(captureButton);
    previewContainer.appendChild(switchCameraButton);
    previewContainer.style.display = "block";
  
    let currentFacingMode = "environment";
    let stream = null;
  
    function startCamera() {
      // Start with less restrictive constraints
      const constraints = {
        video: {
          facingMode: currentFacingMode
        }
      };
    
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          stream = mediaStream;
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error("Camera error:", error);
          // Fallback to any available camera
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((mediaStream) => {
              stream = mediaStream;
              videoElement.srcObject = stream;
            })
            .catch((err) => {
              console.error("Fallback camera error:", err);
              alert("Unable to access camera. Please check your device settings.");
            });
        });
    }
  
    switchCameraButton.addEventListener("click", () => {
      currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
      startCamera();
    });
  
    captureButton.addEventListener("click", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
      // Stop the camera
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
  
      // Convert canvas to base64 DataURL
      const imageData = canvas.toDataURL("image/png");
      
      // Convert base64 to blob
      const blob = dataURLtoBlob(imageData);
      
      // Clear the camera UI
      previewContainer.innerHTML = "";
      
      // Display the captured image and show the predict button
      displayImage(imageData, blob);
    });
  
    // Start with back camera
    startCamera();
  }
  
  // Helper function to convert DataURL to Blob
  function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(",");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: mimeString });
  } 
  function displayImage(imageSrc, file) {
    try {
      let previewImage = document.getElementById("previewImage");
      let getDiagnosisBtn = document.getElementById("getDiagnosisBtn");
      let previewContainer = document.getElementById("imagePreview");
  
      // Create container if it doesn't exist
      if (!previewContainer) {
        previewContainer = document.createElement("div");
        previewContainer.id = "imagePreview";
        previewContainer.className = "image-preview";
        const recentDiagnosis = document.querySelector(".recent-diagnosis");
        if (!recentDiagnosis) {
          console.error("Recent diagnosis container not found");
          return;
        }
        recentDiagnosis.appendChild(previewContainer);
      }
  
      // Create image if it doesn't exist
      if (!previewImage) {
        previewImage = document.createElement("img");
        previewImage.id = "previewImage";
        previewImage.alt = "Selected Image";
        previewContainer.appendChild(previewImage);
      }
  
      // Create button if it doesn't exist
      if (!getDiagnosisBtn) {
        getDiagnosisBtn = document.createElement("button");
        getDiagnosisBtn.id = "getDiagnosisBtn";
        getDiagnosisBtn.className = "btn btn-primary mt-2";
        getDiagnosisBtn.textContent = "Get Diagnosis";
        getDiagnosisBtn.onclick = getDiagnosis;
        previewContainer.appendChild(getDiagnosisBtn);
      }
  
      // Update the image and show elements
      previewImage.src = imageSrc;
      previewImage.style.width = "100%";
      previewImage.style.borderRadius = "8px";
      previewContainer.style.display = "block";
      getDiagnosisBtn.style.display = "inline-block";
  
      // Store the file globally
      window.selectedFile = file;
  
    } catch (error) {
      console.error("Error in displayImage:", error);
      alert("There was an error displaying the image. Please try again.");
    }
  }
  
  // Helper function to convert base64 data URL to Blob
  
// Sample posts data
const posts = [
  {
    authorName: "Aaki Babu",
    authorImage: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
    postImage: "https://dclouds.in/wp-content/uploads/2022/05/instagram-post.png",
    postText: "What could be the reason? Holes are seen in many plants.",
    likes: 10,
    dislikes: 2,
    comments: ["Looks like pest damage.", "Try using neem oil spray."],
    crop: "Cucumber",
  },
  {
    authorName: "John Doe",
    authorImage: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
    postImage: "https://dclouds.in/wp-content/uploads/2022/05/instagram-post.png",
    postText: "Yellow spots on leaves. Any suggestions?",
    likes: 15,
    dislikes: 1,
    comments: ["Could be a fungal infection.", "Use a fungicide."],
    crop: "Apple",
  },
];

// Render posts dynamically
function renderPosts(filterCrop = null) {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = ""; // Clear existing posts

  const filteredPosts = filterCrop
    ? posts.filter((post) => post.crop === filterCrop)
    : posts;

  filteredPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    // Check if the post has media and render it accordingly
    let mediaContent = "";
    if (post.postMedia) {
      if (post.postMedia.endsWith(".mp4") || post.postMedia.endsWith(".webm")) {
        mediaContent = `<video src="${post.postMedia}" controls autoplay muted class="post-media"></video>`;
      } else {
        mediaContent = `<img src="${post.postMedia}" alt="Post Media" class="post-media" />`;
      }
    }

    postElement.innerHTML = `
      <div class="post-header">
        <img src="${post.authorImage}" alt="${post.authorName}" class="author-image" />
        <span class="author-name">${post.authorName}</span>
      </div>
      ${mediaContent}
      <p class="post-text">${post.postText}</p>
      <div class="post-actions">
        <button class="like-btn">👍 ${post.likes}</button>
        <button class="dislike-btn">👎 ${post.dislikes}</button>
        <button class="comment-btn">💬 ${post.comments.length} Comments</button>
        <button class="share-btn">🔗 Share</button>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });
}

// Add a new post
function addPost(authorName, authorImage, postMedia, postText, crop) {
  posts.unshift({
    authorName,
    authorImage,
    postMedia, // Add media to the post object
    postText,
    likes: 0,
    dislikes: 0,
    comments: [],
    crop,
  });
  renderPosts(); // Re-render posts
}

// Handle filter changes
function handleFilterChange() {
  const filterTags = ["Cucumber", "Apple", "Black Gram"];
  const filterContainer = document.getElementById("filterTags");
  filterContainer.innerHTML = ""; // Clear existing tags

  filterTags.forEach((tag) => {
    const tagElement = document.createElement("button");
    tagElement.classList.add("filter-tag");
    tagElement.textContent = tag;
    tagElement.addEventListener("click", () => renderPosts(tag));
    filterContainer.appendChild(tagElement);
  });
}

// Initialize community page
function initCommunityPage() {
  renderPosts(); // Render all posts initially
  handleFilterChange(); // Set up filters
}

// Initialize the community page on load
document.addEventListener("DOMContentLoaded", () => {
  initCommunityPage();
});
// Show the pop-up when the "New Post" button is clicked
document.getElementById("addPostButton").addEventListener("click", () => {
  const popup = document.getElementById("newPostPopup");
  popup.style.display = "flex"; // Show the pop-up
});

// Hide the pop-up when the "Cancel" button is clicked
document.getElementById("cancelPostButton").addEventListener("click", () => {
  const popup = document.getElementById("newPostPopup");
  popup.style.display = "none"; // Hide the pop-up
});

// Handle the "Post" button click
document.getElementById("submitPostButton").addEventListener("click", () => {
  const postTextInput = document.getElementById("postTextInput");
  const postText = postTextInput.value.trim();

  if (postText === "" && !selectedMedia) {
    alert("Please enter some text or add media for your post.");
    return;
  }

  // Add the new post to the posts array
  const authorName = "New User";
  const authorImage = "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
  const crop = "General";

  let postMedia = null;
  if (selectedMedia) {
    postMedia = URL.createObjectURL(selectedMedia); // Create a URL for the media file
  }

  addPost(authorName, authorImage, postMedia, postText, crop);

  // Clear the input and hide the pop-up
  postTextInput.value = "";
  selectedMedia = null;
  document.getElementById("mediaPreviewText").textContent = "No media selected";
  const popup = document.getElementById("newPostPopup");
  popup.style.display = "none";
});
let selectedMedia = null; // Store the selected media file

// Handle media selection
document.getElementById("mediaInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const mediaPreviewText = document.getElementById("mediaPreviewText");

  if (file) {
    selectedMedia = file;
    mediaPreviewText.textContent = `Selected: ${file.name}`;
  } else {
    selectedMedia = null;
    mediaPreviewText.textContent = "No media selected";
  }
});



document.querySelectorAll('.product-actions button').forEach(button => {
  button.addEventListener('click', function(e) {
    const product = this.closest('.product-card');
    const productName = product.querySelector('h5').textContent;
    const productPrice = product.querySelector('.price').textContent;
    
    if (this.textContent === 'Buy Now') {
      // Implement buy now logic
      alert(`Proceeding to checkout for ${productName} at ${productPrice}`);
    } else {
      // Implement add to cart logic
      alert(`Added ${productName} to cart`);
    }
  });
});

// logout function
function logout() {
  // Create and show loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
      <div class="loading-content">
          <div class="spinner"></div>
          <p>Logging out...</p>
      </div>
  `;
  document.body.appendChild(loadingOverlay);

  // Add CSS for loading overlay
  const style = document.createElement('style');
  style.textContent = `
      .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
      }
      .loading-content {
          text-align: center;
          color: white;
      }
      .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
      }
      @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      }
  `;
  document.head.appendChild(style);

  // Simulate logout process
  setTimeout(() => {
      try {
          // Remove authLogs from localStorage
          localStorage.removeItem('authLogs');
          
          // Redirect to signup page
          window.location.href = 'signup.html';
      } catch (error) {
          console.error('Logout error:', error);
          alert('Error during logout. Please try again.');
          document.body.removeChild(loadingOverlay);
      }
  }, 1500); // Show loading for 1.5 seconds
}