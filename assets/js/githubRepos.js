"use strict";

/* -------------- PAGINAÇÃO E CONSUMO DA API DO GITHUB -------------- */
const GITHUB_USERNAME = "jadiael1";
const REPOS_PER_PAGE = 4;
const allRepos = [];

const lazyLoadImages = () => {
  const images = document.querySelectorAll(".lazy-image");
  images.forEach((img, index) => {
    const datasrc = img.getAttribute("data-src");
    if (!datasrc) {
      return;
    }
    setTimeout(() => {
      img.src = datasrc;
      img.removeAttribute("data-src");
    }, index * 500);
  });
};

const createRepoCard = (repo) => {
  const description = repo.description ? repo.description : "Sem descrição disponível.";
  return `
        <article class="jjs-bg-white jjs-rounded-xl jjs-shadow hover:jjs-shadow-md jjs-transition-shadow jjs-overflow-hidden jjs-flex jjs-flex-col">
            <img data-src="https://opengraph.githubassets.com/a/${GITHUB_USERNAME}/${repo.name}" src="./assets/img/place.png" alt="Imagem do Repositório ${repo.name}" class="lazy-image jjs-w-full jjs-h-48 jjs-object-cover jjs-flex-none" loading="lazy" />
            <div class="jjs-p-6 jjs-flex jjs-flex-col jjs-flex-1">
                <h3 class="jjs-text-xl jjs-font-bold jjs-text-gray-900 jjs-mb-2">${repo.name}</h3>
                <p class="jjs-text-gray-600 jjs-mb-4">${description}</p>
                <p class="jjs-text-sm jjs-text-gray-500 jjs-mb-4">Linguagem: ${repo.language || "Não especificada"}</p>
                <div class="jjs-mt-auto">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="jjs-text-sky-500 hover:jjs-text-sky-600 jjs-transition-colors jjs-font-medium" > Ver Detalhes</a>
                </div>
            </div>
        </article> 
        `;
};

const setItemWithExpiry = (key, value, ttlInMs) => {
  const now = Date.now();
  const item = {
    value,
    expiry: now + ttlInMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key) => {
  const storedItem = localStorage.getItem(key);
  if (!storedItem) return null;
  const item = JSON.parse(storedItem);
  const now = Date.now();
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const fetchRepos = async (repos_per_page = 100) => {
  const pages = Array.from({ length: 100 }, (_, index) => index + 1);
  const myRepos = getItemWithExpiry("allRepos");
  if (myRepos?.length) {
    allRepos.push(...myRepos);
    return;
  }
  for (const page of pages) {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${repos_per_page}&page=${page}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar repositórios");
    }
    const repos = await response.json();
    if (!repos.length) {
      break;
    }
    allRepos.push(...repos);
  }
  if (!allRepos.length) {
    throw new Error("Não existe repositorio publico no momento.");
  }
  setItemWithExpiry("allRepos", allRepos, 3600000);
};

const renderPage = (pageNumber = 1) => {
  const reposContainer = document.querySelector("#repos-container");
  reposContainer.innerHTML = ``;
  const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);
  if (pageNumber < 1 || pageNumber > totalPages) {
    throw new Error("Número de página inválido");
  }
  const startIndex = (pageNumber - 1) * REPOS_PER_PAGE;
  const repos = allRepos.slice(startIndex, startIndex + REPOS_PER_PAGE);

  for (const repo of repos) {
    const repoCardHTML = createRepoCard(repo);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = repoCardHTML;
    reposContainer.appendChild(wrapper.firstElementChild);
  }

  setTimeout(() => {
    lazyLoadImages();
  }, 500);

  if (document.querySelector("#current-page") && document.querySelector("#total-pages")) {
    const currentPage = document.querySelector("#current-page");
    const totalPagesH = document.querySelector("#total-pages");
    currentPage.innerText = pageNumber;
    totalPagesH.innerText = totalPages;
  }
};

const createPaginationIfNotExists = (page = 1) => {
  const reposContainer = document.querySelector("#repos-container");
  const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);
  const paginationHTML = `
    <div class="jjs-mt-8 jjs-flex jjs-justify-center jjs-items-center jjs-gap-4" id="pagination">
        <button id="prevPageBtn" class="jjs-px-4 jjs-py-2 jjs-bg-sky-500 jjs-text-white jjs-rounded hover:jjs-bg-sky-600 jjs-transition-colors">Anterior</button>
        <span class="jjs-text-sm jjs-text-gray-700">Página <span id="current-page">${page}</span> de <span id="total-pages">${totalPages}</span></span>
        <button id="nextPageBtn" class="jjs-px-4 jjs-py-2 jjs-bg-sky-500 jjs-text-white jjs-rounded hover:jjs-bg-sky-600 jjs-transition-colors">Próximo</button>
    </div>
  `;
  if (!document.querySelector("#pagination")) {
    reposContainer.insertAdjacentHTML("afterend", paginationHTML);
  }
};

const toggleButtonState = (element, page) => {
  const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);
  const nextPageNumber = page + 1;
  if (nextPageNumber > totalPages && element.getAttribute("id") && element.getAttribute("id") === "nextPageBtn") {
    element.disabled = true;
    element.classList.add("jjs-bg-gray-500");
    element.classList.add("hover:jjs-bg-gray-600");
    element.classList.add("jjs-cursor-not-allowed");
    element.classList.remove("jjs-bg-sky-500");
    element.classList.remove("hover:jjs-bg-sky-600");
  } else if (element.getAttribute("id") && element.getAttribute("id") === "nextPageBtn") {
    element.disabled = false;
    element.classList.add("jjs-bg-sky-500");
    element.classList.add("hover:jjs-bg-sky-600");
    element.classList.remove("jjs-bg-gray-500");
    element.classList.remove("hover:jjs-bg-gray-600");
    element.classList.remove("jjs-cursor-not-allowed");
  }
  if (page <= 1 && element.getAttribute("id") && element.getAttribute("id") === "prevPageBtn") {
    element.disabled = true;
    element.classList.add("jjs-bg-gray-500");
    element.classList.add("hover:jjs-bg-gray-600");
    element.classList.add("jjs-cursor-not-allowed");
    element.classList.remove("jjs-bg-sky-500");
    element.classList.remove("hover:jjs-bg-sky-600");
  } else if (element.getAttribute("id") && element.getAttribute("id") === "prevPageBtn") {
    element.disabled = false;
    element.classList.add("jjs-bg-sky-500");
    element.classList.add("hover:jjs-bg-sky-600");
    element.classList.remove("jjs-bg-gray-500");
    element.classList.remove("hover:jjs-bg-gray-600");
    element.classList.remove("jjs-cursor-not-allowed");
  }
};

const updatePaginationInfo = (page = 1) => {
  const pagination = document.querySelector("#pagination");
  const nextPageBtn = document.querySelector("#nextPageBtn");
  const prevPageBtn = document.querySelector("#prevPageBtn");
  if (pagination) {
    pagination.querySelector("#current-page").innerText = `${page}`;
  }
  toggleButtonState(nextPageBtn, page);
  toggleButtonState(prevPageBtn, page);
};

const updateButtonsEvents = (page = 1) => {
  const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);
  const prevPageBtn = document.querySelector("#prevPageBtn");
  const nextPageBtn = document.querySelector("#nextPageBtn");
  const prevPage = (evt) => {
    evt.preventDefault();
    if (page <= 1) return;
    renderPage(page - 1);
    renderButtons(page - 1);
  };
  const nextPage = (evt) => {
    evt.preventDefault();
    const nextPageNumber = page + 1;
    if (nextPageNumber > totalPages) return;
    renderPage(page + 1);
    renderButtons(page + 1);
  };
  prevPageBtn.removeEventListener("click", prevPage);
  prevPageBtn.addEventListener("click", prevPage);
  nextPageBtn.removeEventListener("click", nextPage);
  nextPageBtn.addEventListener("click", nextPage);
};

const renderButtons = (page = 1) => {
  createPaginationIfNotExists(page);
  updatePaginationInfo(page);
  updateButtonsEvents(page);
};

fetchRepos()
  .then(() => {
    renderPage();
    renderButtons();
  })
  .catch(console.error);
