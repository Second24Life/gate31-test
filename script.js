const url = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";

let list = document.querySelector('.list__wrapper');
let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');

// Вызов функции добавление событий
addEventForApp();

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    let search = urlParams.get('search');

    if (search) {
      return filterData(data, search);
    }
    
    return data;
  })
  .then((data) => {
    // Добавление подготовленных элементов в список
    list.innerHTML = preparationListItem(data);
  })
  .catch((err) => console.error(err));

// Фильтрация данных
function filterData(data, search) {
  const filterData = data.filter((item) => {
    return item.title.toLowerCase().includes(search);
  })
  return filterData;
}

// Подготовка разметки элементов списка
function preparationListItem(data) {
  if (data && data.length > 0) {
    const result = data.map((item) => {
      return `<li class="list__item" key="${item.id}">
                <h3 class="list__title">${item.title}</h3>
                <div class="list__content">${item.body}</div>
                <input type="checkbox" name="list__checkbox" id="${item.id}" class="list__checkbox" />
              </li>`;
    });

    return result.join('');
  }
  return `<li>Нет данных</li>`;
}

// Добавление событий для приложения
function addEventForApp() {
  window.addEventListener("load", () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let searchValue = urlParams.get("search");

    searchInput.value = searchValue;
  });

  searchButton.addEventListener('click', () => {
    let value = searchInput.value;
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("search", value);
    window.location.search = urlParams;
  })

  list.addEventListener('click', (event) => {
    if (event.target.className === 'list__checkbox') {
      if (event.target.checked) {
        event.target.parentElement.classList.add('dark-theme');
      } else {
        event.target.parentElement.classList.remove('dark-theme');
      }
    }
  })
}