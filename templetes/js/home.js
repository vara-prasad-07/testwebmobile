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
            <a href="${news.link}" target="_blank">
              <h4>${news.title}</h4>
              <p class="time-info">${new Date(news.pubDate).toLocaleString()}</p>
            </a>
            <img src="${news.image_url || "https://via.placeholder.com/80"}" alt="News" />
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
    const carousel = document.querySelector(".news-carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    function updateCarousel() {
      const cardWidth = document.querySelector(".news-card").offsetWidth;
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      const totalCards = document.querySelectorAll(".news-card").length;
      currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : totalCards - 1;
      updateCarousel();
    });

    // Optional: Auto-slide every 5 seconds
    setInterval(() => {
      const totalCards = document.querySelectorAll(".news-card").length;
      currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    }, 5000);
  }

  // Fetch news on page load
  fetchNews();