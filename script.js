(function() {
    const form = document.getElementById('travel-form');
    const saveButton = document.getElementById('save-button');
    const travelList = document.getElementById('travel-list');

    let travelData = [];

// Function to render the travel data list
    function renderList() {
        travelList.innerHTML = '';

        // Create a list item for each object
        for (const data of travelData) {
            const li = document.createElement('li');

            li.innerHTML = `
          <b>From ${data.city} to ${data.country}</b>
          <i class="bi bi-pencil-square edit"></i>
          <i class="bi bi-x-circle remove delete-button" data-index="${data.index}"></i>
          <i class="bi bi-three-dots-vertical details"></i><br>
          Expected budget: ${data.budget}<br>
          ${data.startDate}  -  ${data.endDate} | ${data.persons} persons |
          ${data.transferType}
        `;

            travelList.appendChild(li);
        }
    }

// Event listener to the save button to handle clicks/ adding elements to the array
    saveButton.addEventListener('click', () => {

        const city = form.elements.city.value;
        const country = form.elements.country.value;
        const budget = form.elements.budget.value;
        const startDate = form.elements.startDate.value;
        const endDate = form.elements.endDate.value;
        const persons = form.elements.persons.value;
        const transferType = form.elements.transferType.value;
        const time = new Date();

        travelData.push({
            city,
            country,
            budget,
            startDate,
            endDate,
            persons,
            transferType,
            time,
            index: travelData.length,  // Index property to each object
        });

        // Render the travel data list
        renderList();
    });

// Event listener to handle delete button clicks
    travelList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            // Get the index of the item to be deleted
            const index = event.target.dataset.index;

            // Remove the item from the travelData array
            travelData = travelData.filter(data => data.index != index);

            renderList();
        }
        // Details
        if (event.target.classList.contains('details')) {
            // Get the parent node (the list item) of the clicked button
            const li = event.target.parentNode;

            // Get the index of the list item in the list
            const index = Array.from(travelList.children).indexOf(li);

            // Get the time of the item from the travelData array
            const time = travelData[index].time;

            const timeString = time.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                weekday: 'long'
            });

            alert(`Time: ${timeString}`);
        }
    });

})()
