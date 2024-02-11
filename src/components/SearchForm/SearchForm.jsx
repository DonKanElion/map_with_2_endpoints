// import './css/styles.css';
// import debounce from 'lodash.debounce';

// import { fetchStreet } from 'api/fetchStreet';

// const refs = {
//   searchBox: document.querySelector('input#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfo: document.querySelector('.country-info'),
// };

// const DEBOUNCE_DELAY = 300;

// refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// export function onSearch() {
//   const searchCountry = refs.searchBox.value.trim();

//   if (!searchCountry) {
//     refs.countryInfo.innerHTML = '';
//     refs.countryList.innerHTML = '';
//     return;
//   }

//   fetchStreet(searchCountry)
//     .then(data => {
//       if (data.length > 10) {
//         return alert(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       }
//       if (data.length > 2 && data.length <= 9) {
//         refs.countryInfo.innerHTML = '';
//         return renderCountryList(data);
//       } else refs.countryList.innerHTML = '';
//       renderCountryInfo(data);
//     })
//     .catch(error => {
//       alert('Oops, there is no country with that name', error);
//     });
// }

// ========= RENDER =======

// function renderCountryList(countries) {
//   const markup = countries
//     .map(country => {
//       return `<li>
//             <p><img src="${country.flags.svg}" alt="country flag ${country.name}" width='35' height='20'></img> <b>Name</b>: ${country.name.official}</p>
//           </li>`;
//     })
//     .join('');
//   refs.countryList.innerHTML = markup;
// }

// function renderCountryInfo(country) {
//   const markup = country
//     .map(country => {
//       return `<li>        
//             <p style="font-size:24px;"><img src="${
//               country.flags.svg
//             }" alt="country flag ${
//         country.name
//       }" width='70' height='40'></img> <b>Name</b>: ${country.name.official}</p>
//             <p><b>Capital</b>: ${country.capital}</p>
//             <p><b>Population</b>: ${country.population}</p>
//             <p><b>Languages</b>: ${Object.values(country.languages)}</p>
//           </li>`;
//     })
//     .join('');
//   refs.countryInfo.innerHTML = markup;
// }
