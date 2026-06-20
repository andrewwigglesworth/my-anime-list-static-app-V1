/* =========================================================
   1. STARTER DATA AND STORAGE CONFIGURATION
   ========================================================= */

const STORAGE_KEY = "myAnimeList.entries.v1";

/*
  The app starts with local sample data. In a future multi-user version,
  each entry can also include an ownerId and visibility setting from a
  Firebase/Supabase user account.
*/
const starterAnime = [
  {
    id: "anime-frieren",
    title: "Frieren: Beyond Journey's End",
    image: "",
    status: "Completed",
    currentEpisode: 28,
    totalEpisodes: 28,
    rating: 9.7,
    genres: ["Fantasy", "Adventure", "Drama"],
    favorite: true,
    notes: "Quiet, thoughtful, and devastating in the gentlest possible way. The character moments are the real magic.",
    createdAt: "2026-01-12T12:00:00.000Z",
    updatedAt: "2026-01-12T12:00:00.000Z"
  },
  {
    id: "anime-dandadan",
    title: "Dandadan",
    image: "",
    status: "Watching",
    currentEpisode: 8,
    totalEpisodes: 12,
    rating: 8.8,
    genres: ["Action", "Comedy", "Supernatural"],
    favorite: false,
    notes: "Unhinged in exactly the right proportions. Great chemistry, wild direction, and zero interest in slowing down.",
    createdAt: "2026-02-08T12:00:00.000Z",
    updatedAt: "2026-02-08T12:00:00.000Z"
  },
  {
    id: "anime-vinland-saga",
    title: "Vinland Saga",
    image: "",
    status: "Completed",
    currentEpisode: 48,
    totalEpisodes: 48,
    rating: 9.5,
    genres: ["Historical", "Action", "Drama"],
    favorite: true,
    notes: "A brutal story that grows into something deeply humane. Season two completely reframes the journey.",
    createdAt: "2025-12-20T12:00:00.000Z",
    updatedAt: "2025-12-20T12:00:00.000Z"
  },
  {
    id: "anime-mob-psycho",
    title: "Mob Psycho 100",
    image: "",
    status: "Completed",
    currentEpisode: 37,
    totalEpisodes: 37,
    rating: 9.3,
    genres: ["Action", "Comedy", "Coming of Age"],
    favorite: true,
    notes: "A spectacular story about becoming a better person that occasionally explodes into impossible animation.",
    createdAt: "2025-11-10T12:00:00.000Z",
    updatedAt: "2025-11-10T12:00:00.000Z"
  },
  {
    id: "anime-pluto",
    title: "Pluto",
    image: "",
    status: "On Hold",
    currentEpisode: 3,
    totalEpisodes: 8,
    rating: 8.4,
    genres: ["Mystery", "Sci-Fi", "Thriller"],
    favorite: false,
    notes: "Dense, patient science fiction. Saving the rest for a weekend when I can give it proper attention.",
    createdAt: "2026-03-14T12:00:00.000Z",
    updatedAt: "2026-03-14T12:00:00.000Z"
  },
  {
    id: "anime-delicious-dungeon",
    title: "Delicious in Dungeon",
    image: "",
    status: "Watching",
    currentEpisode: 17,
    totalEpisodes: 24,
    rating: 8.9,
    genres: ["Fantasy", "Comedy", "Adventure"],
    favorite: false,
    notes: "Started for the cooking jokes, stayed for the ecology, worldbuilding, and increasingly alarming dungeon lore.",
    createdAt: "2026-01-30T12:00:00.000Z",
    updatedAt: "2026-01-30T12:00:00.000Z"
  },
  {
    id: "anime-mononoke",
    title: "Princess Mononoke",
    image: "",
    status: "Plan to Watch",
    currentEpisode: 0,
    totalEpisodes: 1,
    rating: 0,
    genres: ["Fantasy", "Adventure", "Film"],
    favorite: false,
    notes: "Long overdue for a proper big-screen rewatch.",
    createdAt: "2026-04-01T12:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z"
  },
  {
    id: "anime-tokyo-revengers",
    title: "Tokyo Revengers",
    image: "",
    status: "Dropped",
    currentEpisode: 14,
    totalEpisodes: 24,
    rating: 5.8,
    genres: ["Action", "Drama", "Time Travel"],
    favorite: false,
    notes: "Interesting premise, but the pacing and repeated decisions stopped working for me.",
    createdAt: "2025-10-05T12:00:00.000Z",
    updatedAt: "2025-10-05T12:00:00.000Z"
  }
];

/* Current in-memory state. It is synchronized to localStorage after edits. */
let animeList = loadAnime();
let activeStatus = "All";
let searchTerm = "";
let sortMode = "title-asc";
let toastTimer;

/* =========================================================
   2. DOM REFERENCES
   ========================================================= */

const elements = {
  views: document.querySelectorAll(".app-view"),
  viewLinks: document.querySelectorAll("[data-view-link]"),
  menuToggle: document.querySelector("#menuToggle"),
  navLinks: document.querySelector("#navLinks"),
  animeGrid: document.querySelector("#animeGrid"),
  emptyState: document.querySelector("#emptyState"),
  searchInput: document.querySelector("#searchInput"),
  statusFilters: document.querySelector("#statusFilters"),
  sortSelect: document.querySelector("#sortSelect"),
  resetFiltersButton: document.querySelector("#resetFiltersButton"),
  emptyResetButton: document.querySelector("#emptyResetButton"),
  randomPickButton: document.querySelector("#randomPickButton"),
  resultSummary: document.querySelector("#resultSummary"),
  totalCount: document.querySelector("#totalCount"),
  episodeCount: document.querySelector("#episodeCount"),
  averageRating: document.querySelector("#averageRating"),
  favoriteCount: document.querySelector("#favoriteCount"),
  heroPlanCount: document.querySelector("#heroPlanCount"),
  animeForm: document.querySelector("#animeForm"),
  animeId: document.querySelector("#animeId"),
  titleInput: document.querySelector("#titleInput"),
  imageInput: document.querySelector("#imageInput"),
  statusInput: document.querySelector("#statusInput"),
  ratingInput: document.querySelector("#ratingInput"),
  currentEpisodeInput: document.querySelector("#currentEpisodeInput"),
  totalEpisodesInput: document.querySelector("#totalEpisodesInput"),
  genresInput: document.querySelector("#genresInput"),
  notesInput: document.querySelector("#notesInput"),
  favoriteInput: document.querySelector("#favoriteInput"),
  saveButton: document.querySelector("#saveButton"),
  clearFormButton: document.querySelector("#clearFormButton"),
  formHeading: document.querySelector("#formHeading"),
  editBadge: document.querySelector("#editBadge"),
  formPreview: document.querySelector("#formPreview"),
  manageList: document.querySelector("#manageList"),
  adminCount: document.querySelector("#adminCount"),
  exportButton: document.querySelector("#exportButton"),
  toast: document.querySelector("#toast"),
  toastMessage: document.querySelector("#toastMessage")
};

/* =========================================================
   3. STORAGE AND DATA HELPERS
   ========================================================= */

function loadAnime() {
  try {
    const storedList = localStorage.getItem(STORAGE_KEY);
    return storedList ? JSON.parse(storedList) : structuredClone(starterAnime);
  } catch (error) {
    console.warn("Stored anime data could not be read. Starter data was restored.", error);
    return structuredClone(starterAnime);
  }
}

function saveAnime() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList));
}

function createId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `anime-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(number, minimum, maximum) {
  return Math.min(Math.max(number, minimum), maximum);
}

function getProgress(anime) {
  if (!anime.totalEpisodes) return 0;
  return clamp((anime.currentEpisode / anime.totalEpisodes) * 100, 0, 100);
}

function slugifyStatus(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function escapeHtml(value = "") {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

/*
  Generates an inline SVG cover when no image URL is provided.
  This keeps the project completely self-contained for GitHub Pages.
*/
function createPlaceholder(title = "Anime") {
  const palettes = [
    ["#7650d9", "#ff6ea9"],
    ["#3d5af1", "#61dafb"],
    ["#d94f70", "#ffc857"],
    ["#4e2f75", "#54d6a0"],
    ["#663b8f", "#ef8354"]
  ];
  const hash = [...title].reduce((total, character) => total + character.charCodeAt(0), 0);
  const [first, second] = palettes[hash % palettes.length];
  const initial = escapeHtml(title.trim().charAt(0).toUpperCase() || "A");
  const safeTitle = escapeHtml(title);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${first}"/>
          <stop offset="1" stop-color="${second}"/>
        </linearGradient>
        <filter id="b"><feGaussianBlur stdDeviation="45"/></filter>
      </defs>
      <rect width="800" height="500" fill="#14111f"/>
      <circle cx="650" cy="80" r="220" fill="${second}" opacity=".32" filter="url(#b)"/>
      <circle cx="120" cy="430" r="240" fill="${first}" opacity=".38" filter="url(#b)"/>
      <path d="M0 390 250 120l160 150L570 80l230 230v190H0Z" fill="url(#g)" opacity=".38"/>
      <circle cx="400" cy="215" r="105" fill="none" stroke="white" stroke-opacity=".13" stroke-width="2"/>
      <circle cx="400" cy="215" r="76" fill="none" stroke="white" stroke-opacity=".08" stroke-width="2" stroke-dasharray="8 10"/>
      <text x="400" y="257" text-anchor="middle" fill="white" font-size="126" font-family="Arial, sans-serif" font-weight="700">${initial}</text>
      <text x="400" y="422" text-anchor="middle" fill="white" fill-opacity=".72" font-size="26" font-family="Arial, sans-serif" font-weight="600">${safeTitle.slice(0, 34)}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getCover(anime) {
  return anime.image?.trim() || createPlaceholder(anime.title);
}

/* =========================================================
   4. SHARED CARD RENDERING
   ========================================================= */

function createAnimeCard(anime, options = {}) {
  const { preview = false } = options;
  const progress = getProgress(anime);
  const genres = anime.genres.length
    ? anime.genres.map((genre) => `<span class="genre-tag">${escapeHtml(genre)}</span>`).join("")
    : '<span class="genre-tag">Uncategorized</span>';
  const displayRating = Number(anime.rating) > 0 ? Number(anime.rating).toFixed(1) : "—";
  const delay = preview ? 0 : Math.min(options.index || 0, 8) * 45;

  return `
    <article class="anime-card ${anime.favorite ? "favorite" : ""}" style="animation-delay:${delay}ms">
      <div class="cover-wrap">
        <img
          class="cover-image"
          src="${escapeHtml(getCover(anime))}"
          alt="${escapeHtml(anime.title)} cover"
          onerror="this.onerror=null;this.src='${createPlaceholder(anime.title)}'"
        >
        <span class="status-badge status-${slugifyStatus(anime.status)}">${escapeHtml(anime.status)}</span>
        ${anime.favorite ? `
          <span class="favorite-badge" title="Favorite">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.67 6.2.9-4.5 4.38 1.06 6.18L12 17.2l-5.55 2.92 1.06-6.18L3 9.57l6.22-.9L12 3Z"></path></svg>
          </span>` : ""}
      </div>
      <div class="card-content">
        <div class="card-title-row">
          <h3 title="${escapeHtml(anime.title)}">${escapeHtml(anime.title)}</h3>
          <span class="rating" aria-label="Rating ${displayRating} out of 10">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.67 6.2.9-4.5 4.38 1.06 6.18L12 17.2l-5.55 2.92 1.06-6.18L3 9.57l6.22-.9L12 3Z"></path></svg>
            ${displayRating}
          </span>
        </div>
        <div class="progress-copy">
          <span>Episode progress</span>
          <strong>${anime.currentEpisode} / ${anime.totalEpisodes || "?"}</strong>
        </div>
        <div class="progress-track" aria-label="${Math.round(progress)} percent complete">
          <div class="progress-fill" style="width:${progress}%"></div>
        </div>
        <div class="genre-list">${genres}</div>
        <p class="anime-notes">${escapeHtml(anime.notes || "No personal notes yet.")}</p>
      </div>
    </article>`;
}

/* =========================================================
   5. PUBLIC LIST, SEARCH, FILTER, SORT, AND STATS
   ========================================================= */

function getVisibleAnime() {
  const filtered = animeList.filter((anime) => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeStatus === "All" || anime.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return filtered.sort((first, second) => {
    switch (sortMode) {
      case "title-desc":
        return second.title.localeCompare(first.title);
      case "rating-desc":
        return second.rating - first.rating;
      case "rating-asc":
        return first.rating - second.rating;
      case "progress-desc":
        return getProgress(second) - getProgress(first);
      case "progress-asc":
        return getProgress(first) - getProgress(second);
      case "title-asc":
      default:
        return first.title.localeCompare(second.title);
    }
  });
}

function renderPublicList() {
  const visibleAnime = getVisibleAnime();
  elements.animeGrid.innerHTML = visibleAnime
    .map((anime, index) => createAnimeCard(anime, { index }))
    .join("");

  elements.animeGrid.hidden = visibleAnime.length === 0;
  elements.emptyState.hidden = visibleAnime.length !== 0;

  const suffix = visibleAnime.length === 1 ? "entry" : "entries";
  elements.resultSummary.textContent = `Showing ${visibleAnime.length} of ${animeList.length} ${suffix}`;
}

function renderStats() {
  const episodes = animeList.reduce((total, anime) => total + Number(anime.currentEpisode || 0), 0);
  const ratedAnime = animeList.filter((anime) => Number(anime.rating) > 0);
  const average = ratedAnime.length
    ? ratedAnime.reduce((total, anime) => total + Number(anime.rating), 0) / ratedAnime.length
    : 0;
  const favorites = animeList.filter((anime) => anime.favorite).length;
  const planned = animeList.filter((anime) => anime.status === "Plan to Watch").length;

  elements.totalCount.textContent = animeList.length;
  elements.episodeCount.textContent = episodes.toLocaleString();
  elements.averageRating.textContent = average.toFixed(1);
  elements.favoriteCount.textContent = favorites;
  elements.heroPlanCount.textContent = planned;
}

function resetFilters() {
  activeStatus = "All";
  searchTerm = "";
  sortMode = "title-asc";
  elements.searchInput.value = "";
  elements.sortSelect.value = sortMode;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.status === "All");
  });
  renderPublicList();
}

function chooseRandomAnime() {
  const candidates = animeList.filter((anime) => anime.status !== "Dropped");

  if (!candidates.length) {
    showToast("Add an anime first, then let fate decide.");
    return;
  }

  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  searchTerm = pick.title;
  activeStatus = "All";
  elements.searchInput.value = pick.title;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.status === "All");
  });
  renderPublicList();
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  showToast(`Random pick: ${pick.title}`);
}

/* =========================================================
   6. ADMIN FORM AND LIVE PREVIEW
   ========================================================= */

function getFormAnime() {
  return {
    id: elements.animeId.value || "preview",
    title: elements.titleInput.value.trim() || "Your anime title",
    image: elements.imageInput.value.trim(),
    status: elements.statusInput.value,
    currentEpisode: Math.max(0, Number(elements.currentEpisodeInput.value) || 0),
    totalEpisodes: Math.max(0, Number(elements.totalEpisodesInput.value) || 0),
    rating: clamp(Number(elements.ratingInput.value) || 0, 0, 10),
    genres: elements.genresInput.value
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean),
    favorite: elements.favoriteInput.checked,
    notes: elements.notesInput.value.trim() || "Your personal notes will appear here."
  };
}

function renderFormPreview() {
  elements.formPreview.innerHTML = createAnimeCard(getFormAnime(), { preview: true });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formAnime = getFormAnime();
  const editingId = elements.animeId.value;
  const now = new Date().toISOString();

  if (formAnime.currentEpisode > formAnime.totalEpisodes && formAnime.totalEpisodes > 0) {
    showToast("Current episode cannot exceed total episodes.");
    elements.currentEpisodeInput.focus();
    return;
  }

  if (editingId) {
    const index = animeList.findIndex((anime) => anime.id === editingId);
    if (index !== -1) {
      animeList[index] = {
        ...animeList[index],
        ...formAnime,
        id: editingId,
        updatedAt: now
      };
      showToast(`${formAnime.title} updated.`);
    }
  } else {
    animeList.unshift({
      ...formAnime,
      id: createId(),
      createdAt: now,
      updatedAt: now
    });
    showToast(`${formAnime.title} added.`);
  }

  saveAnime();
  renderAll();
  clearForm();
}

function editAnime(id) {
  const anime = animeList.find((entry) => entry.id === id);
  if (!anime) return;

  elements.animeId.value = anime.id;
  elements.titleInput.value = anime.title;
  elements.imageInput.value = anime.image || "";
  elements.statusInput.value = anime.status;
  elements.ratingInput.value = anime.rating;
  elements.currentEpisodeInput.value = anime.currentEpisode;
  elements.totalEpisodesInput.value = anime.totalEpisodes;
  elements.genresInput.value = anime.genres.join(", ");
  elements.notesInput.value = anime.notes;
  elements.favoriteInput.checked = anime.favorite;

  elements.formHeading.textContent = "Edit anime";
  elements.editBadge.hidden = false;
  elements.saveButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9.2 17 19 7"></path></svg>
    Save changes`;

  renderFormPreview();
  document.querySelector(".form-card").scrollIntoView({ behavior: "smooth", block: "start" });
  elements.titleInput.focus({ preventScroll: true });
}

function deleteAnime(id) {
  const anime = animeList.find((entry) => entry.id === id);
  if (!anime) return;

  const confirmed = window.confirm(`Delete "${anime.title}" from the list?`);
  if (!confirmed) return;

  animeList = animeList.filter((entry) => entry.id !== id);
  saveAnime();
  renderAll();

  if (elements.animeId.value === id) {
    clearForm();
  }

  showToast(`${anime.title} deleted.`);
}

function clearForm() {
  elements.animeForm.reset();
  elements.animeId.value = "";
  elements.statusInput.value = "Watching";
  elements.ratingInput.value = "0";
  elements.currentEpisodeInput.value = "0";
  elements.totalEpisodesInput.value = "12";
  elements.formHeading.textContent = "Add an anime";
  elements.editBadge.hidden = true;
  elements.saveButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>
    Add anime`;
  renderFormPreview();
}

function renderManageList() {
  elements.adminCount.textContent = `${animeList.length} ${animeList.length === 1 ? "entry" : "entries"} stored`;

  if (!animeList.length) {
    elements.manageList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">+</div>
        <h3>Your library is empty</h3>
        <p>Use the form above to add the first anime.</p>
      </div>`;
    return;
  }

  elements.manageList.innerHTML = animeList
    .slice()
    .sort((first, second) => first.title.localeCompare(second.title))
    .map((anime) => `
      <article class="manage-item">
        <img class="manage-cover" src="${escapeHtml(getCover(anime))}" alt="" onerror="this.onerror=null;this.src='${createPlaceholder(anime.title)}'">
        <div class="manage-title">
          <strong>${escapeHtml(anime.title)} ${anime.favorite ? "★" : ""}</strong>
          <span>${escapeHtml(anime.status)} · ${Number(anime.rating) > 0 ? `${Number(anime.rating).toFixed(1)}/10` : "Not rated"}</span>
        </div>
        <span class="manage-progress">${anime.currentEpisode} / ${anime.totalEpisodes || "?"} eps</span>
        <div class="item-actions">
          <button class="icon-button" type="button" data-edit-id="${anime.id}" aria-label="Edit ${escapeHtml(anime.title)}" title="Edit">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"></path></svg>
          </button>
          <button class="icon-button danger" type="button" data-delete-id="${anime.id}" aria-label="Delete ${escapeHtml(anime.title)}" title="Delete">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"></path></svg>
          </button>
        </div>
      </article>`)
    .join("");
}

function exportAnime() {
  const exportData = {
    app: "My Anime List",
    exportedAt: new Date().toISOString(),
    version: 1,
    entries: animeList
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `my-anime-list-${date}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Anime list exported as JSON.");
}

/* =========================================================
   7. VIEW ROUTING, NAVIGATION, AND FEEDBACK
   ========================================================= */

function showView(viewName) {
  const safeView = viewName === "admin" ? "admin" : "list";

  elements.views.forEach((view) => {
    const isActive = view.dataset.view === safeView;
    view.hidden = !isActive;
    view.classList.toggle("active", isActive);
  });

  elements.viewLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === safeView);
  });

  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function routeFromHash() {
  const viewName = window.location.hash.replace("#", "");

  if (viewName === "admin" || viewName === "list" || !viewName) {
    showView(viewName);
    return;
  }

  /* Keep ordinary in-page anchors, such as #collection, on the public view. */
  showView("list");
  requestAnimationFrame(() => {
    document.querySelector(`#${CSS.escape(viewName)}`)?.scrollIntoView();
  });
}

function toggleMobileMenu() {
  const isOpen = elements.navLinks.classList.toggle("open");
  elements.menuToggle.classList.toggle("open", isOpen);
  elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMobileMenu() {
  elements.navLinks.classList.remove("open");
  elements.menuToggle.classList.remove("open");
  elements.menuToggle.setAttribute("aria-expanded", "false");
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toastMessage.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2800);
}

function renderAll() {
  renderStats();
  renderPublicList();
  renderManageList();
}

/* =========================================================
   8. EVENT LISTENERS
   ========================================================= */

elements.menuToggle.addEventListener("click", toggleMobileMenu);
window.addEventListener("hashchange", routeFromHash);

elements.searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderPublicList();
});

elements.statusFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-status]");
  if (!button) return;

  activeStatus = button.dataset.status;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip === button);
  });
  renderPublicList();
});

elements.sortSelect.addEventListener("change", (event) => {
  sortMode = event.target.value;
  renderPublicList();
});

elements.resetFiltersButton.addEventListener("click", resetFilters);
elements.emptyResetButton.addEventListener("click", resetFilters);
elements.randomPickButton.addEventListener("click", chooseRandomAnime);

document.addEventListener("keydown", (event) => {
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);

  if (event.key === "/" && !isTyping && !elements.searchInput.closest("[hidden]")) {
    event.preventDefault();
    elements.searchInput.focus();
  }

  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

elements.animeForm.addEventListener("submit", handleFormSubmit);
elements.animeForm.addEventListener("input", renderFormPreview);
elements.animeForm.addEventListener("change", renderFormPreview);
elements.clearFormButton.addEventListener("click", clearForm);
elements.exportButton.addEventListener("click", exportAnime);

elements.manageList.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-id]");
  const deleteButton = event.target.closest("[data-delete-id]");

  if (editButton) editAnime(editButton.dataset.editId);
  if (deleteButton) deleteAnime(deleteButton.dataset.deleteId);
});

/* =========================================================
   9. INITIAL APP STARTUP
   ========================================================= */

renderAll();
clearForm();
routeFromHash();
