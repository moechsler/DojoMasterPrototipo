// Datos dummy para movimientos bancarios y pagos de estudiantes
let bankMovements = [
    { date: '2023-05-01', description: 'Depósito', amount: 500, status: 'No Conciliado' },
    { date: '2023-05-02', description: 'Transferencia', amount: 250, status: 'No Conciliado' },
    { date: '2023-05-03', description: 'Pago Juan Pérez', amount: 100, status: 'No Conciliado' },
  ];
  
  let studentPayments = [
    { date: '2023-05-01', student: 'Depósito Anónimo', amount: 500, status: 'No Conciliado' },
    { date: '2023-05-02', student: 'Carlos Rodríguez', amount: 250, status: 'No Conciliado' },
    { date: '2023-05-03', student: 'Juan Pérez', amount: 100, status: 'No Conciliado' },
    { date: '2023-05-04', student: 'María García', amount: 300, status: 'No Conciliado' },
  ];
  
  // Función para cargar los movimientos bancarios
  function loadBankMovements() {
    const tableBody = document.querySelector('#bank-movements tbody');
    tableBody.innerHTML = '';
    bankMovements.forEach(movement => {
      const row = `
        <tr>
          <td>${movement.date}</td>
          <td>${movement.description}</td>
          <td>$${movement.amount}</td>
          <td>${movement.status}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // Función para cargar los pagos de estudiantes
  function loadStudentPayments() {
    const tableBody = document.querySelector('#student-payments tbody');
    tableBody.innerHTML = '';
    studentPayments.forEach(payment => {
      const row = `
        <tr>
          <td>${payment.date}</td>
          <td>${payment.student}</td>
          <td>$${payment.amount}</td>
          <td>${payment.status}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  

  
  // Función para realizar la conciliación automática
  function conciliateAutomatically() {
    bankMovements.forEach((movement, index) => {
      const matchingPayment = studentPayments.find(payment => 
        payment.amount === movement.amount && payment.date === movement.date
      );
      if (matchingPayment) {
        bankMovements[index].status = 'Conciliado';
        matchingPayment.status = 'Conciliado';
      }
    });
    loadBankMovements();
    loadStudentPayments();
    updateConciliationSummary();
  }
  
  // Función para actualizar el resumen de conciliación
  function updateConciliationSummary() {
    const conciliatedMovements = bankMovements.filter(m => m.status === 'Conciliado').length;
    const conciliatedPayments = studentPayments.filter(p => p.status === 'Conciliado').length;
    
    const summaryHtml = `
      <p><strong>Movimientos Bancarios Conciliados:</strong> ${conciliatedMovements} de ${bankMovements.length}</p>
      <p><strong>Pagos de Estudiantes Conciliados:</strong> ${conciliatedPayments} de ${studentPayments.length}</p>
    `;
    
    document.getElementById('conciliation-summary').innerHTML = summaryHtml;
  }
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    loadBankMovements();
    loadStudentPayments();
    updateConciliationSummary();
  
    document.getElementById('upload-form').addEventListener('submit', processCartola);
    document.getElementById('conciliate-btn').addEventListener('click', conciliateAutomatically);
  });


  // ... (mantén las variables y funciones anteriores)

// Función para procesar la carga de la cartola
function processCartola(event) {
    console.log('processCartola called');
    event.preventDefault();
    const file = document.getElementById('cartola-file').files[0];
    if (file) {
       console.log('File selected:', file.name);
    const reader = new FileReader();
    reader.onload = function(e) {
      console.log('File loaded');
      const content = e.target.result;
      console.log('File content:', content);
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        
        // Limpiar movimientos bancarios anteriores
        bankMovements = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue; // Saltar líneas vacías
          const values = lines[i].split(',');
          const movement = {
            date: values[0],
            description: values[1],
            amount: parseFloat(values[2]),
            status: 'No Conciliado'
          };
          bankMovements.push(movement);
        }
        
        // Mostrar contenido del archivo
        document.getElementById('file-content').textContent = content;
        
        loadBankMovements();
        updateConciliationSummary();
      };
      reader.readAsText(file);
    }
  }
  
  // Función para realizar la conciliación automática
  function conciliateAutomatically() {
    bankMovements.forEach((movement, index) => {
      const matchingPayment = studentPayments.find(payment => 
        payment.amount === movement.amount && payment.date === movement.date
      );
      if (matchingPayment) {
        bankMovements[index].status = 'Conciliado';
        matchingPayment.status = 'Conciliado';
      }
    });
    loadBankMovements();
    loadStudentPayments();
    updateConciliationSummary();
  }
