const thresholds = {
    sound: 100,
    current: 3,
    temperature: 400,
    vibration: 0.1
};

let sensorData = [];
let currentIndex = 0;

async function loadData() {
    try {
        const response = await fetch('../data/sensor_data.csv');
        const data = await response.text();
        const rows = data.trim().split('\n').slice(1);

        sensorData = rows.map(row => {
            const [timestamp, sound, current, temperature, vibration] = row.split(',');
            return {
                timestamp,
                sound: parseFloat(sound),
                current: parseFloat(current),
                temperature: parseFloat(temperature),
                vibration: parseFloat(vibration)
            };
        });

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function updateDashboard() {
    if (sensorData.length === 0) return;

    const data = sensorData[currentIndex];

    updateSensor('sound', data.sound);
    updateSensor('current', data.current);
    updateSensor('temperature', data.temperature);
    updateSensor('vibration', data.vibration);

    currentIndex = (currentIndex + 1) % sensorData.length; // Loop back to the start
}

function updateSensor(sensor, value) {
    const valueElement = document.getElementById(`${sensor}Value`);
    const fillElement = document.getElementById(`${sensor}Fill`);
    const threshold = thresholds[sensor];

    valueElement.textContent = value.toFixed(2);

    const percentage = Math.min((value / threshold) * 100, 100);
    fillElement.style.height = `${percentage}%`;

    if (value > threshold) {
        fillElement.style.backgroundColor = 'red'; // Stays red if above threshold
        showAlert(sensor, value);
    } else {
        fillElement.style.backgroundColor = getSensorColor(sensor); // Resets to its original color
    }
}

function getSensorColor(sensor) {
    const colors = {
        sound: '#4caf50',       // Green
        current: '#2196f3',     // Blue
        temperature: '#ff9800', // Orange
        vibration: '#9c27b0'    // Purple
    };
    return colors[sensor];
}

function showAlert(sensor, value) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = `⚠️ ${sensor} exceeded threshold! Value: ${value}`;
    alertBox.classList.remove('hidden');
}

loadData().then(() => {
    setInterval(updateDashboard, 2000); // Update every 2 seconds
});
