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