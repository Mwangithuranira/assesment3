// dark mode script
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const searchInput = document.getElementById('search');
  const regionFilter = document.getElementById('region-filter');
  const countriesContainer = document.getElementById('countries-container');

  const apiURL = 'https://restcountries.com/v3.1/all';

  // Fetch all countries from API
  fetch(apiURL)
      .then(response => response.json())
      .then(data => {
          displayCountries(data);
      })
      .catch(error => {
          console.error('Error fetching countries:', error);
      });

  // Display countries in the container
  function displayCountries(countries) {
      countriesContainer.innerHTML = '';
      countries.forEach(country => {
          const countryCard = document.createElement('div');
          countryCard.className = 'country-card';
          countryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
              <h3>${country.name.common}</h3>
              <p>Population: ${country.population.toLocaleString()}</p>
              <p>Region: ${country.region}</p>
              <p>Capital: ${country.capital}</p>
          `;
          countryCard.addEventListener('click', () => {
              showCountryDetail(country);
          });
          countriesContainer.appendChild(countryCard);
      });
  }

  // Show country detail on a separate page (alert for demo purposes)
  function showCountryDetail(country) {
      alert(`Country: ${country.name.common}\nPopulation: ${country.population}\nRegion: ${country.region}\nCapital: ${country.capital}`);
  }

  // Filter countries by search input
  searchInput.addEventListener('input', (event) => {
      const searchText = event.target.value.toLowerCase();
      fetch(apiURL)
          .then(response => response.json())
          .then(data => {
              const filteredCountries = data.filter(country =>
                  country.name.common.toLowerCase().includes(searchText)
              );
              displayCountries(filteredCountries);
          });
  });

  // Filter countries by region
  regionFilter.addEventListener('change', (event) => {
      const region = event.target.value;
      fetch(apiURL)
          .then(response => response.json())
          .then(data => {
              const filteredCountries = region ? data.filter(country => country.region === region) : data;
              displayCountries(filteredCountries);
          });
  });

  // Toggle theme

  
   themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
});