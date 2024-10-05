import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

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

interface SalesChartProps {
    salesData: Sale[]; // Prop name here should be `salesData`
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
    // Group data by order
    const orders: Record<string, { totalQuantity: number; totalPrice: number }> = {};
    salesData.forEach(sale => {
        if (!orders[sale.order_id]) {
            orders[sale.order_id] = { totalQuantity: 0, totalPrice: 0 };
        }
        orders[sale.order_id].totalQuantity += sale.quantity_sold;
        orders[sale.order_id].totalPrice += sale.total_price;
    });

    // Prepare data for the chart
    const orderIds = Object.keys(orders);
    const quantities = orderIds.map(orderId => orders[orderId].totalQuantity);

    const data = {
        labels: orderIds, // X-Axis labels: Order IDs
        datasets: [{
            label: 'Quantity Sold',
            data: quantities, // Y-Axis: Quantities sold
            backgroundColor: 'rgba(224, 206, 9, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
                text: 'Sales Quantity by Order',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default SalesChart;
