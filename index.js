
async function countryInformation() {
    // Define the URL of the JSON file
    const jsonUrl = './data.json';
  
    try {
      // Fetch the JSON data from the URL
      const response = await fetch(jsonUrl);
  
      // Check for successful response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Return the parsed country information
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation: \n' + error.message);
    }
  }


  function displayCountry(data){
    const mainContainer=document.getElementById('main')
    // mainContainer.innerHTML='';

    const mainDiv=document.createElement('div');
    mainDiv.classList.add('container');
      
    const imageDiv=document.createElement('div');
    imageDiv.classList.add('image');
    const img=document.createElement('img');
    flag_image=data.flags['png']
    img.src=flag_image;
    imageDiv.appendChild(img);

    const infoDiv=document.createElement('div');
    infoDiv.classList.add('info');

    const h3=document.createElement('h3');
    // console.log(data.name)
    h3.innerText=data.name

    const contryInfo=document.createElement('div');
    contryInfo.classList.add('contry-info');

    const population=document.createElement('p');
    population.innerHTML=`<span>Population:</span> <span>${data.population}</span>`;
    contryInfo.appendChild(population);

    const region=document.createElement('p');
    region.innerHTML=`<span>Region:</span> <span>${data.region}</span>`;
    contryInfo.appendChild(region);

    const capital=document.createElement('p');
    capital.innerHTML=`<span>Capital:</span> <span>${data.capital}</span>`;
    contryInfo.appendChild(capital);

    infoDiv.appendChild(h3);
    infoDiv.appendChild(contryInfo);

    mainDiv.appendChild(imageDiv);
    mainDiv.appendChild(infoDiv);

    mainContainer.appendChild(mainDiv);

  }



function displayCountries(contriesData, selectedContinent) {
 
    const mainContainer=document.getElementById('main')
    mainContainer.innerHTML='';
    contriesData.forEach((countryInfo) => {
        if (countryInfo.region === selectedContinent){
            console.log(countryInfo.name)
            displayCountry(countryInfo);
        }
    });
  }
  


// display for each country
const filterDropdown = document.getElementById('filter-dropdown');
filterDropdown.addEventListener('change', () => {
    const selectedContinent = filterDropdown.value;
    // console.log(selectedContinent)
    (async () => {
      try {
        const countriesData = await countryInformation();
        displayCountries(countriesData, selectedContinent); 
      } catch (error) {
        console.error('Error fetching country information:', error);
      }
    })();
  });
  

// display for inputed country via input field
const countrySearch = document.getElementById('country');
countrySearch.addEventListener('keydown', (event) => {
   
    if (event.key === 'Enter') {

        const inputValue = countrySearch.value;
        (async () => {
            try {
              const countriesData = await countryInformation();
              countriesData.forEach(country => {
                if(country.name.lower() === inputValue.toLowerCase()) {
                    console.log(country)
                    displayCountry(country);
              }})

            } catch (error) {
              console.error('Error fetching country information:', error);
            }
          })();
        // Get the value of the input element

        // Print the value of the input element to the console
        // console.log(`Value entered: ${inputValue}`);
    }
});

  (async () => {
    try {
      const contriesData = await countryInformation();
        contriesData.forEach(countryInfo => {
            // console.log(contriesData[1])
            displayCountry(countryInfo);

            // console.log(data)
            
        });
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  })();

  


  