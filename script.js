async function populateTable() {
    try {
        const response = await fetch(
            "https://intruder-alert-system.onrender.com/api/history"
        );
        console.log(response);
        const data = await response.json();
        const tbody = document.getElementById("data-table-tbody");

        data.forEach((item) => {
            const tr = document.createElement("tr");
            const str = item.time
            const date =str.split(",")[0] 
            const time =str.split(",")[1] 
            tr.innerHTML = `
                <td class="border px-4 py-2">${item._id}</td>
                <td class="border px-4 py-2">${date}</td>
                <td class="border px-4 py-2">${time}</td>
                <td class="border px-4 py-2">${item.message || "N/A"}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

window.onload = populateTable;
