async function populateTable() {
    try {
        const response = await fetch('https://intruder-alert-system.onrender.com/api/history');
        console.log(response)
        const data = await response.json();
        const tbody = document.getElementById('data-table-tbody');

        data.forEach(item => {
            const tr = document.createElement('tr');
            const timestamp = parseInt(item.time, 10);
            const date = new Date(timestamp * 1000);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            tr.innerHTML = `
                <td class="border px-4 py-2">${item._id}</td>
                <td class="border px-4 py-2">${formattedDate || 'N/A'}</td>
                <td class="border px-4 py-2">${formattedTime || 'N/A'}</td>
                <td class="border px-4 py-2">${item.message || 'N/A'}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = populateTable;