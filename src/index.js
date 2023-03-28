import debounce from 'lodash.debounce';
import { fetchCountries } from './fetch';
import './css/styles.css';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;


const searchFormEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchFormEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
    const countryName = e.target.value.trim();
    clearCountryList();
    clearCountryInfo();
    fetchCountries(countryName)
        .then(countries => {
            if (countries.length === 1) {
                makeCountryInfo(countries);
            }

            if (countries.length <= 10 && countries.length > 1) {
                makeCountryList(countries);
            }

            if (countries.length > 10) {
                Notiflix.Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );

            }
        })
}



function makeCountryList(data) {
    const murkupList = data.map(({ flags, name }) => {
        return `<li style="display:flex; align-items:center; gap:10px">
       <img src="${flags.svg}" alt="" width=40 height=30  />
       <h3>${name.official}</h3>
     </li>`;
    })
        .join('');

    countryList.insertAdjacentHTML('afterbegin', murkupList);
}

function makeCountryInfo(infoCountry) {
    const murkup = infoCountry.map(({ flags, name, capital, population, languages }) => {
        return `<li style="display:flex; align-items:center; gap:10px">
 <img src="${flags.svg}" alt="" width=40 height=30  />
 <h1>${name.official}</h1></li>
 <p> <span class="info">Capital:</span> ${capital}</p>
 <p> <span class="info">Population:</span> ${population}</p>
 <p> <span class="info">Languages:</span> ${Object.values(languages)}</p>`;
    });
    countryInfo.insertAdjacentHTML('afterbegin', murkup);
}




function clearCountryList() {
    countryList.innerHTML = '';
}



function clearCountryInfo() {
    countryInfo.innerHTML = '';
}

