/* --------------------------------------------------------------
   Utility helpers
   -------------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const $ = (sel) => Array.from(document.querySelectorAll(sel));

/* --------------------------------------------------------------
   Global state
   -------------------------------------------------------------- */
let allProducts = [];          // full catalogue (loaded once)
let filteredProducts = [];     // after applying filters / sort
let pageSize = 12;             // how many items we render per batch
let pageIndex = 0;             // current batch index
let isLoading = false;

/* --------------------------------------------------------------
   1️⃣ Load product data (mock JSON)
   -------------------------------------------------------------- */
async function loadData() {
  const resp = await fetch('data/products.json');
  const data = await resp.json();
  allProducts = data;
  initFilters();
  applyFiltersAndSort(); // will render first batch
}

/* --------------------------------------------------------------
   2️⃣ Build filter chips (material, story, mood)
   -------------------------------------------------------------- */
function initFilters() {
  const filterBar = $('#filter-bar');

  // Helper to extract unique values from the catalogue
  const uniq = (arr) => [...new Set(arr)];

  // Material filter (from materialComposition)
  const materials = uniq(allProducts.flatMap(p => p.materialComposition.map(m => m.material)));
  const materialChip = createChipGroup('Material', 'material', materials);
  filterBar.appendChild(materialChip);

  // Story filter – we’ll fake a few story tags (e.g., “Heritage”, “Modern”, “Artisan”)
  const stories = ['Heritage', 'Modern', 'Artisan'];
  const storyChip = createChipGroup('Story', 'story', stories);
  filterBar.appendChild(storyChip);

  // Mood filter – from AI tags
  const moods = uniq(allProducts.flatMap(p => p.aiTags?.mood?.labels || []));
  const moodChip = createChipGroup('Mood', 'mood', moods);
  filterBar.appendChild(moodChip);
}

/* --------------------------------------------------------------
   Helper: create a chip group (label + list of toggle buttons)
   -------------------------------------------------------------- */
function createChipGroup(groupLabel, dataKey, options) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center gap-1';

  const label = document.createElement('span');
  label.className = 'text-sm font-medium text-neutral-900';
  label.textContent = `${groupLabel}:`;
  wrapper.appendChild(label);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'px-2 py-1 text-xs rounded-[var(--radius)] border border-neutral-300 bg-neutral-100 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary';
    btn.dataset.key = dataKey;
    btn.dataset.value = opt;
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      btn.classList.toggle('bg-primary text-neutral-100 border-primary');
      applyFiltersAndSort();
    });
    wrapper.appendChild(btn);
  });

  return wrapper;
}

/* --------------------------------------------------------------
   3️⃣ Apply filters + sort → update filteredProducts array
   -------------------------------------------------------------- */
function applyFiltersAndSort() {
  // 1️⃣ Gather active filter values
  const active = {};
  $('#filter-bar button.bg-primary').forEach(btn => {
    const key = btn.dataset.key;
    const val = btn.dataset.value;
    if (!active[key]) active[key] = new Set();
    active[key].add(val);
  });

  // 2️⃣ Filter
  filteredProducts = allProducts.filter(p => {
    // Material filter
    if (active.material && !p.materialComposition.some(m => active.material.has(m.material))) return false;
    // Story filter – we’ll fake story based on provenance keyword
    if (active.story) {
      const story = p.provenance?.toLowerCase() || '';
      const matchesStory = Array.from(active.story).some(st => story.includes(st.toLowerCase()));
      if (!matchesStory) return false;
    }
    // Mood filter (AI tags)
    if (active.mood && !(p.aiTags?.mood?.labels?.some(l => active.mood.has(l)))) return false;
    return true;
  });

  // 3️⃣ Sort
  const sortVal = $('#sort-select').value;
  if (sortVal === 'newest') {
    filteredProducts.sort((a, b) => b.launchYear - a.launchYear);
  } else if (sortVal === 'traced') {
    // Mock “most‑traced” – we’ll sort by recycledContentPct descending
    filteredProducts.sort((a, b) => (b.sustainabilityMetrics?.recycledContentPct || 0) - (a.sustainabilityMetrics?.recycledContentPct || 0));
  } else {
    // editorial – keep original order (or you could add a manual rank field)
  }

  // 4️⃣ Reset pagination & render first batch
  pageIndex = 0;
  $('#product-grid').innerHTML = '';
  renderNextBatch();
}

/* --------------------------------------------------------------
   4️⃣ Render a batch of cards (or skeletons while loading)
   -------------------------------------------------------------- */
function renderNextBatch() {
  if (isLoading) return;
  isLoading = true;
  $('#loading-status').textContent = 'Loading…';

  // Simulate async fetch (e.g., server pagination)
  setTimeout(() => {
    const start = pageIndex * pageSize;
    const slice = filteredProducts.slice(start, start + pageSize);
    const grid = $('#product-grid');

    slice.forEach(product => {
      const card = createProductCard(product);
      grid.appendChild(card);
    });

    // If we have rendered fewer than pageSize, we reached the end → hide sentinel
    if (slice.length < pageSize) {
      $('#infinite-sentinel').style.display = 'none';
    }

    pageIndex++;
    isLoading = false;
    $('#loading-status').textContent = '';
  }, 300); // tiny delay to show skeletons
}

/* --------------------------------------------------------------
   5️⃣ Create a product card (with hover overlay)
   -------------------------------------------------------------- */
function createProductCard(p) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.tabIndex = 0; // make focusable

  // Image (lazy‑loaded)
  const img = document.createElement('img');
  img.src = p.image;
  img.alt = `${p.name} – ${p.curatorSentence}`;
  img.loading = 'lazy';
  img.className = 'w-full h-auto object-cover';
  card.appendChild(img);

  // Price overlay (bottom)
  const price = document.createElement('div');
  price.className = 'absolute bottom-0 left-0 right-0 bg-black/60 text-neutral-100 text-sm p-1';
  price.textContent = `${p.currency} ${p.price.toLocaleString()}`;
  card.appendChild(price);

  // Hover overlay (desktop)
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const curator = document.createElement('p');
  curator.className = 'curator';
  curator.textContent = p.curatorSentence;
  overlay.appendChild(curator);
  const prov = document.createElement('span');
  prov.className = 'provenance';
  prov.textContent = p.provenance;
  overlay.appendChild(prov);
  card.appendChild(overlay);

  // Linger detection for bundle suggestion
  let lingerTimer;
  card.addEventListener('mouseenter', () => {
    lingerTimer = setTimeout(() => showBundleCard(p), 2000);
  });
  card.addEventListener('mouseleave', () => {
    clearTimeout(lingerTimer);
  });

  return card;
}

/* --------------------------------------------------------------
   6️⃣ Bundle suggestion micro‑card logic
   -------------------------------------------------------------- */
function showBundleCard(product) {
  const bundle = $('#bundle-card');
  bundle.setAttribute('aria-hidden', 'false');
  bundle.classList.remove('hidden');

  // You could customise the CTA based on the hovered product.
  // For demo we just keep a static text.
}
$('#bundle-close').addEventListener('click', () => {
  const bundle = $('#bundle-card');
  bundle.setAttribute('aria-hidden', 'true');
  bundle.classList.add('hidden');
});
$('#bundle-cta').addEventListener('click', () => {
  alert('Bundle added! (demo)');
  // In a real shop you would push the suggested SKUs to the cart.
});

/* --------------------------------------------------------------
   7️⃣ Infinite scroll + fallback button
   -------------------------------------------------------------- */
function initInfiniteScroll() {
  const sentinel = $('#infinite-sentinel');
  const loadBtn = $('#load-more');

  // IntersectionObserver for auto‑load
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !isLoading) {
      renderNextBatch();
    }
  }, { rootMargin: '200px' });

  // If the browser supports it, use the observer
  if ('IntersectionObserver' in window) {
    observer.observe(sentinel);
    loadBtn.classList.add('hidden');
  } else {
    // Fallback – show button
    loadBtn.classList.remove('hidden');
    loadBtn.addEventListener('click', renderNextBatch);
  }
}

/* --------------------------------------------------------------
   8️⃣ Sort change handler
   -------------------------------------------------------------- */
$('#sort-select').addEventListener('change', applyFiltersAndSort);

/* --------------------------------------------------------------
   9️⃣ Init everything
   -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initInfiniteScroll();
});
