import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Define the type for sales data
type Sale = {
    sale_id: string;
    order_id: string;
    product_id: string;
    variant_id: string | null;
    quantity_sold: number;
    total_price: number;
    created_at: string;
};

interface IncomesChartsProps {
    salesData: Sale[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomesCharts: React.FC<IncomesChartsProps> = ({ salesData }) => {
    // Calculate income for each product
    const incomeByProduct: Record<string, number> = {};
    salesData.forEach(sale => {
        if (!incomeByProduct[sale.product_id]) {
            incomeByProduct[sale.product_id] = 0;
        }
        incomeByProduct[sale.product_id] += sale.total_price; // Aggregate total price for each product
    });

    // Prepare data for the pie chart
    const productIds = Object.keys(incomeByProduct);
    const incomes = productIds.map(productId => incomeByProduct[productId]);

    const data = {
        labels: productIds, // X-Axis labels: Product IDs
        datasets: [{
            label: 'Income by Product',
            data: incomes, // Y-Axis: Incomes for each product
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Income by Product',
            },
        },
    };

    return (
        <div>
            <Pie data={data} options={options} />
        </div>
    );
};

export default IncomesCharts;
