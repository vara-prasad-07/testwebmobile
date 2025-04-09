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
  