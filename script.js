const taxInput = document.getElementById('taxInput');
const fundInput = document.getElementById('fundInput');
const taxVal = document.getElementById('taxVal');
const fundVal = document.getElementById('fundVal');

let hurdleChart;

function calculateHurdle(T, rf, n) {
    const T_dec = T / 100;
    const rf_dec = rf / 100;
    if (T_dec >= 1) return 100;
    const r_be = ( (1 + rf_dec) / Math.pow((1 - T_dec), (1 / n)) ) - 1;
    return (r_be * 100);
}

function init() {
    const ctx = document.getElementById('hurdleChart').getContext('2d');
    hurdleChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Required DIY Return (%)',
                data: [],
                borderColor: '#F87171',
                fill: false,
                borderWidth: 3,
                pointRadius: 0,
                tension: 0.3
            }, {
                label: 'Fund Annual Return (%)',
                data: [],
                borderColor: '#FBBF24',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top', labels: { font: { family: 'Inter', color: '#E0E0E0' } } },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#000',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' }
                }
            },
            scales: {
                y: { 
                    grid: { color: '#333' }, 
                    ticks: { color: '#888', font: { family: 'Inter', weight: 'bold' } } 
                },
                x: { 
                    grid: { display: false }, 
                    ticks: { color: '#888', font: { family: 'Inter' } } 
                }
            }
        }
    });

    taxInput.addEventListener('input', updateData);
    fundInput.addEventListener('input', updateData);

    updateData();
}

function updateData() {
    const T = parseFloat(taxInput.value);
    const rf = parseFloat(fundInput.value);

    taxVal.innerText = T;
    fundVal.innerText = rf.toFixed(1);

    const labels = [];
    const hurdlePoints = [];
    const fundPoints = [];

    // Generate data for 1 to 30 years
    for (let n = 1; n <= 30; n++) {
        labels.push(`${n}y`);
        hurdlePoints.push(calculateHurdle(T, rf, n).toFixed(2));
        fundPoints.push(rf.toFixed(2));
    }

    hurdleChart.data.labels = labels;
    hurdleChart.data.datasets[0].data = hurdlePoints;
    hurdleChart.data.datasets[1].data = fundPoints;
    hurdleChart.update();

    // Update Dashboard
    document.getElementById('h5').innerText = calculateHurdle(T, rf, 5).toFixed(1) + '%';
    document.getElementById('h10').innerText = calculateHurdle(T, rf, 10).toFixed(1) + '%';
    document.getElementById('h20').innerText = calculateHurdle(T, rf, 20).toFixed(1) + '%';
    document.getElementById('h30').innerText = calculateHurdle(T, rf, 30).toFixed(1) + '%';
}

document.addEventListener('DOMContentLoaded', init);
