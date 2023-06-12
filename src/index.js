import { fetchApi, fetchCatByBreed } from './services/API';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorMessage = document.querySelector('.error');
// console.log(error);

function createOption({ id, name }) {
  const option = document.createElement('option');
  option.setAttribute('value', id);
  option.innerText = name;

  return option;
}

function optionsList(dates) {
  const arrTags = dates.map(date => createOption(date));
  select.append(...arrTags);
}

const createInfoMarkup = date => {
  const { name, description, temperament } = date;
  const cardInfo = document.createElement('div');
  const title = document.createElement('h2');
  title.innerText = name;
  const about = document.createElement('p');
  about.innerText = description;
  const temperamentInfo = document.createElement('p');
  temperamentInfo.innerText = temperament;
  const temperamentBold = document.createElement('span');
  temperamentBold.innerText = 'Temperament:';

  temperamentInfo.prepend(temperamentBold);
  cardInfo.append(title, about, temperamentInfo);

  return cardInfo;
};

const createImgMarkup = ([{ url }]) => {
  const img = document.createElement('img');
  img.setAttribute('src', url);

  return img;
};

async function createBreedList() {
  try {
    const data = await fetchApi();
    console.log(data);

    optionsList(data);
    /* Все что касчается события чейндж */
    async function renderInfo(event) {
      console.dir(select.value);
      const image = await fetchCatByBreed(select.value);
      const renderImg = createImgMarkup(image);
      const infoObj = data.filter(el => el.id === select.value);
      catInfo.replaceChildren();
      catInfo.append(renderImg, createInfoMarkup(...infoObj));
    }

    select.addEventListener('change', renderInfo);
  } catch (err) {
    errorMessage.style.display = 'block';
  }
}

createBreedList();
