const statsData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Game winning analysis',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

const lineData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Player Vs Player',
        data: [7, 11, 5, 8, 3, 9],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
    }]
};

// Initialize the stats chart
const statsChart = new Chart(document.getElementById('myChart').getContext('2d'), {
    type: 'bar',
    data: statsData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize the line chart
const lineChart = new Chart(document.getElementById('lineChart').getContext('2d'), {
    type: 'line',
    data: lineData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
