// Datos dummy
const monthlyIncomes = [1200000, 1700000, 1650000, 1500000, 1950000, 2000000];
const paymentMethods = {
  'Efectivo': 5,
  'Tarjeta de Crédito': 10,
  'Transferencia Bancaria': 85
};

const recentPayments = [
  { date: '2023-05-15', student: 'Juan Pérez', amount: 35000, method: 'Tarjeta de Crédito', status: 'Completado' },
  { date: '2023-05-14', student: 'María García', amount: 35000, method: 'Transferencia Bancaria', status: 'Pendiente' },
  { date: '2023-05-13', student: 'Carlos Rodríguez', amount: 70000, method: 'Efectivo', status: 'Completado' },
  { date: '2023-05-12', student: 'Ana Martínez', amount: 35000, method: 'Tarjeta de Crédito', status: 'Completado' },
  { date: '2023-05-11', student: 'Luis Sánchez', amount: 105000, method: 'Efectivo', status: 'Atrasado' }
];

// Función para cargar el dashboard
function loadDashboard() {
  document.getElementById('monthlyIncome').textContent = `$${monthlyIncomes[monthlyIncomes.length - 1]}`;
  document.getElementById('incomeChange').textContent = calculateIncomeChange();
  document.getElementById('collectionRate').textContent = '95%';
  document.getElementById('latePayments').textContent = '7';
  document.getElementById('projectedIncome').textContent = `$${calculateProjectedIncome()}`;
}

// Función para calcular el cambio en los ingresos
function calculateIncomeChange() {
  const currentMonth = monthlyIncomes[monthlyIncomes.length - 1];
  const lastMonth = monthlyIncomes[monthlyIncomes.length - 2];
  return Math.round(((currentMonth - lastMonth) / lastMonth) * 100);
}

// Función para calcular los ingresos proyectados
function calculateProjectedIncome() {
  return Math.round(monthlyIncomes[monthlyIncomes.length - 1] * 1.1);
}

// Función para cargar los pagos recientes
function loadRecentPayments() {
  const tableBody = document.getElementById('recentPaymentsBody');
  tableBody.innerHTML = '';
  recentPayments.forEach(payment => {
    const row = `
      <tr>
        <td>${payment.date}</td>
        <td>${payment.student}</td>
        <td>$${payment.amount}</td>
        <td>${payment.method}</td>
        <td><span class="badge badge-${getStatusBadge(payment.status)}">${payment.status}</span></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Función para obtener la clase de la insignia de estado
function getStatusBadge(status) {
  switch(status) {
    case 'Completado':
      return 'success';
    case 'Pendiente':
      return 'warning';
    case 'Atrasado':
      return 'danger';
    default:
      return 'secondary';
  }
}

// Función para crear el gráfico de tendencia de ingresos
function createIncomeChart() {
  const ctx = document.getElementById('incomeChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Ingresos Mensuales',
        data: monthlyIncomes,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Función para crear el gráfico de métodos de pago
function createPaymentMethodChart() {
  const ctx = document.getElementById('paymentMethodChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(paymentMethods),
      datasets: [{
        data: Object.values(paymentMethods),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    },
    options: {
      responsive: true
    }
  });
}

// Cargar todos los elementos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  loadDashboard();
  loadRecentPayments();
  createIncomeChart();
  createPaymentMethodChart();
});