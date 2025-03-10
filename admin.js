const navToggle = document.getElementById("nav-toggle");
const logoImg = document.getElementById("logo-img");

navToggle.addEventListener("change", function () {
if (this.checked) {
    logoImg.src = "asset/homepage-assets/shortlogo.png";
} else {
    logoImg.src = "asset/homepage-assets/image.png";
}
});

const ctx = document.getElementById('newChart').getContext('2d');

const newChart = new Chart(ctx, {
type: 'line',
data: {
    labels: ['January', 'Febuarary', 'March', 'April', 'May ', 'July'],
    datasets: [
    {
        label: 'LOL news',
        data: [12, 15, 20, 18, 24, 28],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: false,
    },
    {
        label: 'Valorant news',
        data: [10, 12, 18, 20, 25, 26],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: false,
    },
    {
        label: 'Other news',
        data: [5, 7, 10, 9, 12, 15],
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: false,
    }
    ]
},
options: {
    responsive: true,
    scales: {
    y: {
        beginAtZero: true,
        title: {
        display: true,
        text: 'Number of news posted'
        }
    },
    x: {
        title: {
        display: true,
        text: 'Month'
        }
    }
    },
    plugins: {
    legend: {
        position: 'top'
    },
    tooltip: {
        mode: 'index',
        intersect: false
    }
    }
}
});