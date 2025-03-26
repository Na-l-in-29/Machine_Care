const ctx = document.getElementById('sensorChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Sound', borderColor: 'blue', data: [], fill: false },
            { label: 'Current', borderColor: 'green', data: [], fill: false },
            { label: 'Temperature', borderColor: 'red', data: [], fill: false },
            { label: 'Vibration', borderColor: 'orange', data: [], fill: false }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: 'Timestamp' },
                type: 'category'
            },
            y: {
                title: { display: true, text: 'Sensor Values' }
            }
        }
    }
});

let allRows = [];
let currentIndex = 0;

async function loadCSV() {
    try {
        const response = await fetch('data/sensor_data.csv');
        const data = await response.text();
        allRows = data.trim().split('\n').slice(1); // Skip header row
    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}

function updateGraph() {
    if (currentIndex >= allRows.length) {
        console.log('End of dataset reached.');
        return; // Stop when we reach the end
    }

    const [timestamp, sound, current, temperature, vibration] = allRows[currentIndex].split(',');

    chart.data.labels.push(timestamp);
    chart.data.datasets[0].data.push(parseFloat(sound));
    chart.data.datasets[1].data.push(parseFloat(current));
    chart.data.datasets[2].data.push(parseFloat(temperature));
    chart.data.datasets[3].data.push(parseFloat(vibration));

    chart.update();

    currentIndex++; // Move to the next row
}

// Load CSV data once
loadCSV().then(() => {
    setInterval(updateGraph, 5000); // Add new data every 5 seconds
});
