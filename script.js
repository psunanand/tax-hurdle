// Tax-Hurdle Calculator - Core JavaScript Logic
// This script handles calculations, chart rendering, and interactive updates

// DOM Elements
const taxInput = document.getElementById('taxInput');
const fundInput = document.getElementById('fundInput');
const taxVal = document.getElementById('taxVal');
const fundVal = document.getElementById('fundVal');

// Chart instance
let hurdleChart;

// Register Chart.js annotation plugin for vertical milestone lines
Chart.register(window['chartjs-plugin-annotation']);

function calculateHurdle(T, rf, n) {
    // Calculate the break-even return rate for DIY portfolio to match tax-advantaged fund
    // Formula: r_be = ((1 + r_f) / (1 - T)^(1/n)) - 1
    // Where T = tax rate, r_f = fund return, n = number of years
    const T_dec = T / 100;
    const rf_dec = rf / 100;
    if (T_dec >= 1) return 100;
    const r_be = ( (1 + rf_dec) / Math.pow((1 - T_dec), (1 / n)) ) - 1;
    return (r_be * 100);
}

function init() {
    // Initialize Chart.js instance
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
                },
                // Initialize empty annotation config for vertical milestone lines
                annotation: {
                    annotations: {}
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

    // Add event listeners for slider inputs
    taxInput.addEventListener('input', updateData);
    fundInput.addEventListener('input', updateData);

    // Initial data load
    updateData();
}

function updateData() {
    // Read input values from sliders
    const T = parseFloat(taxInput.value);
    const rf = parseFloat(fundInput.value);

    // Update display values
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

    // Update chart datasets
    hurdleChart.data.labels = labels;
    hurdleChart.data.datasets[0].data = hurdlePoints;
    hurdleChart.data.datasets[1].data = fundPoints;

    // Add vertical milestone annotation lines at years 5, 10, 20, 30
    // Each line connects fund return to DIY return, showing the "gap" between them
    const milestones = [5, 10, 20, 30];
    const annotations = {};
    
    milestones.forEach(year => {
        // Calculate hurdle at this milestone year
        const hurdle = calculateHurdle(T, rf, year);
        // Calculate extra return needed (hurdle - fund return)
        const extra = (hurdle - rf).toFixed(1);
        
        // Create vertical line annotation connecting fund return to DIY return
        annotations[`line${year}`] = {
            type: 'line',
            mode: 'vertical',
            xMin: year - 1,
            xMax: year - 1,
            yMin: rf,
            yMax: hurdle,
            borderColor: '#0D0D0D',
            borderWidth: 1,
            label: {
                display: true,
                content: `${year}y: +${extra}%`,
                position: 'end',
                yAdjust: -30,
                backgroundColor: '#fff',
                color: '#0D0D0D',
                borderColor: '#ccc',
                borderWidth: 1,
                font: { family: 'Inter', size: 10, weight: 'bold' }
            }
        };
    });

    // Update chart with new annotations and refresh
    hurdleChart.options.plugins.annotation.annotations = annotations;
    hurdleChart.update();
}

document.addEventListener('DOMContentLoaded', init);
