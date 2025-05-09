
  const newsItems = document.querySelectorAll('.news-item');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const showLatestBtn = document.getElementById('showLatestBtn');
  let visibleCount = 0;
  const step = 10;

  function showNewsItems(start, end) {
    newsItems.forEach((item, index) => {
      item.style.display = (index >= start && index < end) ? 'list-item' : 'none';
    });
  }

  function showMoreNews() {
    const newEnd = Math.min(visibleCount + step, newsItems.length);
    for (let i = visibleCount; i < newEnd; i++) {
      newsItems[i].style.display = 'list-item';
    }
    visibleCount = newEnd;

    if (visibleCount >= newsItems.length) {
      loadMoreBtn.style.display = 'none';
      showLatestBtn.style.display = 'inline-block';
    }

    // Remove old 'last-visible' class
    document.querySelectorAll('.news-item').forEach(item => item.classList.remove('last-visible'));

    // Find the last visible item and mark it
    let lastVisible = Array.from(newsItems).filter(item => item.style.display !== 'none').pop();
    if (lastVisible) {
      lastVisible.classList.add('last-visible');
    }
  }

  function showLatestNews() {
    visibleCount = 0;
    showNewsItems(0, step);
    visibleCount = step;
    loadMoreBtn.style.display = 'inline-block';
    showLatestBtn.style.display = 'none';

    // Remove old 'last-visible' class
    document.querySelectorAll('.news-item').forEach(item => item.classList.remove('last-visible'));

    // Find the last visible item and mark it
    let lastVisible = Array.from(newsItems).filter(item => item.style.display !== 'none').pop();
    if (lastVisible) {
      lastVisible.classList.add('last-visible');
    }
  }

  // Initial load
  showLatestNews();

  loadMoreBtn.addEventListener('click', showMoreNews);
  showLatestBtn.addEventListener('click', showLatestNews);

