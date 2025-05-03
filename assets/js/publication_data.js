// Ensure the script runs only after the page is fully loaded
  window.onload = function() {
    console.log("Page loaded successfully.");

    // Function to populate the list based on the selected category
    function populateList(category, data) {
      //const filteredData = data.filter(item => item.category.toLowerCase() === category.toLowerCase()); // Filter items by category

      const filteredData = category.toLowerCase() === 'all' ? data : data.filter(item => item.category.toLowerCase() === category.toLowerCase());


      const publicationList = document.querySelector('.custom-counter'); // Get the publication list container

      if (!publicationList) {
        console.error("Publication list container not found.");
        return;
      }

      console.log("Filtered Data:", filteredData); // Check the filtered data

      // Clear the existing list
      publicationList.innerHTML = '';

      // Check if any data exists for the category
      if (filteredData.length === 0) {
        const noDataMessage = document.createElement('li');
        noDataMessage.textContent = `No publications found for the ${category} category.`;
        publicationList.appendChild(noDataMessage);
        return;
      }

      // Loop through filtered data and create list items
      filteredData.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('publication-item', 'active'); // Add 'active' class to make it visible
        li.setAttribute('data-category', item.category);
        li.setAttribute('data-number',  filteredData.length - index);  // Set the counter number

        // Create the HTML content for each item
        li.innerHTML = `
          <div class="publication-content">
            <div class="publication-meta">
              <span class="publication-authors">${item.authors}</span>
              <span class="publication-title">${item.title}</span>
              <span class="publication-journal">${item.journal}</span>
            </div>
            <div class="publication-action-container">              
              <a href="${item.pdf_link}" target="_blank">
                   <div class="publication-action">
  <i class="fas fa-file" style="font-size: 12px; margin-right: 2px;"></i>
  <i class="fas fa-paperclip" style="font-size: 10px;"></i>
  &nbsp;PDF
</div>

              </a>
              
            </div>
          </div>
        `;

        publicationList.appendChild(li);  // Append the created list item to the publication list
      });
    }

    //<div class="publication-action" data-abstract="${item.abstract}" data-cite="${item.citation}">
    //    Abstract
    //</div>
    //<div class="publication-action" data-cite="${item.citation}">
    //      Cite
    //</div>

    // Fetch JSON data and initialize the list
    fetch('./assets/publication/publication_data.json')
      .then(response => response.json())
      .then(data => {
        console.log("JSON data loaded:", data);
        
        // Initially load Journal items
        //populateList('journal', data);
        populateList('all', data);

        // // Event listener for Journal button in .filter-list
        // const publicationButton = document.querySelector('[data-nav-link="Publication"]');
        // if (publicationButton) {
        //   publiactionButton.addEventListener('click', () => {
        //     console.log("Publication button clicked");
        //     populateList('journal', data);  // Populate with journal category
        //   });
        // } else {
        //   console.error("Publication button not found");
        // }

        //Category Buttons
        const allButton = document.querySelector('[data-filter-btn="All"]');
        const journalButton = document.querySelector('[data-filter-btn="Journal"]');
        const conferenceButton = document.querySelector('[data-filter-btn="Conference"]');
        const patentButton = document.querySelector('[data-filter-btn="Patent"]');
        const allButtons = document.querySelectorAll('[data-filter-btn]');

        // Event listener for All button in .filter-list 
        if (allButton) {
          allButton.addEventListener('click', () => {
            console.log("All button clicked");
            allButtons.forEach(btn => btn.classList.remove('active'));  //remove active status from the other category
            allButton.classList.add('active');
            populateList('all', data);
          });
        } else {
          console.error("All button not found");
        }

        // Event listener for Journal button in .filter-list       
        if (journalButton) {
          journalButton.addEventListener('click', () => {
            console.log("Journal button clicked");
            allButtons.forEach(btn => btn.classList.remove('active')); //remove active status from the other category
            journalButton.classList.add('active');
            populateList('journal', data);  // Populate with journal category
          });
        } else {
          console.error("Journal button not found");
        }

        // Event listener for Conference button in .filter-list
        if (conferenceButton) {
          conferenceButton.addEventListener('click', () => {
            console.log("Conference button clicked");
            allButtons.forEach(btn => btn.classList.remove('active'));//remove active status from the other category
            conferenceButton.classList.add('active');
            populateList('conference', data);  // Populate with conference category
          });
        } else {
          console.error("Conference button not found");
        }

        // Event listener for Patent button in .filter-list
        if (patentButton) {
          patentButton.addEventListener('click', () => {
            console.log("Patent button clicked");
            allButtons.forEach(btn => btn.classList.remove('active'));//remove active status from the other category
            patentButton.classList.add('active');
            populateList('patent', data);  // Populate with conference category
          });
        } else {
          console.error("Patent button not found");
        }

        //All select buttons
        const allSelectButtons = document.querySelector('[data-select-item]');

        // Event listener for All button in .select-list
        const allSelectButton = document.querySelector('[data-select-item="All"]');
        if (allSelectButton) {
          allSelectButton.addEventListener('click', () => {
            console.log("All select item clicked");
            //allSelectButtons.forEach(btn => btn.classList.remove('active'));
            populateList('all', data);
          });
        } else {
          console.error("All select item not found");
        }

        // Event listener for Journal button in .select-list
        const journalSelectButton = document.querySelector('[data-select-item="Journal"]');
        if (journalSelectButton) {
          journalSelectButton.addEventListener('click', () => {
            console.log("Journal select item clicked");
            //allSelectButtons.forEach(btn => btn.classList.remove('active'));
            populateList('journal', data);  // Populate with journal category
          });
        } else {
          console.error("Journal select item not found");
        }

        // Event listener for Conference button in .select-list
        const conferenceSelectButton = document.querySelector('[data-select-item="Conference"]');
        if (conferenceSelectButton) {
          conferenceSelectButton.addEventListener('click', () => {
            console.log("Conference select item clicked");
            //allSelectButtons.forEach(btn => btn.classList.remove('active'));
            populateList('conference', data);  // Populate with conference category
          });
        } else {
          console.error("Conference select item not found");
        }

        // Event listener for Conference button in .select-list
        const patentSelectButton = document.querySelector('[data-select-item="Patent"]');
        if (patentSelectButton) {
          patentSelectButton.addEventListener('click', () => {
            console.log("Patent select item clicked");
            //allSelectButtons.forEach(btn => btn.classList.remove('active'));
            populateList('patent', data);  // Populate with conference category
          });
        } else {
          console.error("Patent select item not found");
        }     

      // Event listener for Abstract and Cite buttons to open modal
      document.addEventListener('click', function(e) {
        // Check if the clicked element is a publication action
        if (e.target && e.target.matches('.publication-action')) {
          const action = e.target;
          const abstract = action.getAttribute('data-abstract');
          const cite = action.getAttribute('data-cite');

          // Get the modal container and open it
          const modalContainer = document.querySelector('[pdata-modal-container]');
          const modalTitle = modalContainer.querySelector('[pdata-modal-title]');
          const modalText = modalContainer.querySelector('[pdata-modal-text]');

          // Display either abstract or citation in the modal
          if (abstract) {
            modalTitle.innerText = "Abstract";
            modalText.innerText = abstract;
            modalContainer.classList.toggle("active"); // Show the modal ()
          } else if (cite) {
            modalTitle.innerText = "Cite as";
            modalText.innerText = cite;
            modalContainer.classList.toggle("active"); // Show the modal
          }
          
        }
      });

      // Close the modal when the close button is clicked
      document.querySelector('[pdata-modal-close-btn]').addEventListener('click', function() {
        console.log("Closing Modal"); // Debugging line
        const modalContainer = document.querySelector('[pdata-modal-container]');
        modalContainer.classList.toggle("active");  // Hide the modal
      });

      // Close the modal if the overlay is clicked
      document.querySelector('[pdata-overlay]').addEventListener('click', function() {
        console.log("Closing Modal from Overlay"); // Debugging line
        const modalContainer = document.querySelector('[pdata-modal-container]');
        modalContainer.classList.toggle("active");  // Hide the modal
      });


      })
      .catch(error => console.error('Error loading JSON:', error));
  };