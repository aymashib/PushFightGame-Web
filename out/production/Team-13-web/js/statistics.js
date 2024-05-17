// This data will be populated from the server-side (Java)
const colorData = [
    { color: "Red", count: 12 },
    { color: "Blue", count: 19 },
    { color: "Yellow", count: 3 },
    { color: "Green", count: 5 },
    { color: "Purple", count: 2 },
    { color: "Orange", count: 3 }
];

// Initialize the chart
const ctx = document.getElementById('colorChart').getContext('2d');
const colorChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: colorData.map(data => data.color),
        datasets: [{
            label: 'Most Used Colors',
            data: colorData.map(data => data.count),
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
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
