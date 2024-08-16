// Datos de ejemplo para tutores
let tutors = [
    { id: 1, firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos.rodriguez@example.com', phone: '1234567890', students: [1, 3, 5] },
    { id: 2, firstName: 'Ana', lastName: 'Martínez', email: 'ana.martinez@example.com', phone: '2345678901', students: [2, 4] },
    { id: 3, firstName: 'Luis', lastName: 'González', email: 'luis.gonzalez@example.com', phone: '3456789012', students: [6, 7] },
];

// Datos de ejemplo para estudiantes
let students = [
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', tutorId: 1 },
    { id: 2, firstName: 'María', lastName: 'García', email: 'maria@example.com', tutorId: 2 },
    { id: 3, firstName: 'Pedro', lastName: 'López', email: 'pedro@example.com', tutorId: 1 },
    { id: 4, firstName: 'Laura', lastName: 'Sánchez', email: 'laura@example.com', tutorId: 2 },
    { id: 5, firstName: 'Diego', lastName: 'Martín', email: 'diego@example.com', tutorId: 1 },
    { id: 6, firstName: 'Sara', lastName: 'Fernández', email: 'sara@example.com', tutorId: 3 },
    { id: 7, firstName: 'Pablo', lastName: 'Ruiz', email: 'pablo@example.com', tutorId: 3 },
    { id: 8, firstName: 'Elena', lastName: 'Gómez', email: 'elena@example.com', tutorId: null },
    { id: 9, firstName: 'Javier', lastName: 'Torres', email: 'javier@example.com', tutorId: null },
    { id: 10, firstName: 'Lucía', lastName: 'Díaz', email: 'lucia@example.com', tutorId: null },
];

// Función para cargar los tutores en la tabla
function loadTutors() {
    const tableBody = document.getElementById('tutorsTableBody');
    tableBody.innerHTML = '';
    tutors.forEach(tutor => {
        const row = `
            <tr>
                <td>${tutor.id}</td>
                <td>${tutor.firstName} ${tutor.lastName}</td>
                <td>${tutor.email}</td>
                <td>${tutor.phone}</td>
                <td>${tutor.students.length}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewTutorDetails(${tutor.id})">Ver</button>
                    <button class="btn btn-sm btn-primary" onclick="editTutor(${tutor.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTutor(${tutor.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Función para cargar las opciones de estudiantes en el select
function loadStudentOptions() {
    const studentSelect = document.getElementById('studentSelect');
    studentSelect.innerHTML = '';
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.firstName} ${student.lastName}`;
        studentSelect.appendChild(option);
    });
}

// Función para abrir el modal de agregar/editar tutor
function openTutorModal(tutorId = null) {
    const modal = document.getElementById('tutorModal');
    const title = document.getElementById('tutorModalTitle');
    const form = document.getElementById('tutorForm');
    const studentSelect = document.getElementById('studentSelect');

    loadStudentOptions();

    if (tutorId) {
        const tutor = tutors.find(t => t.id === tutorId);
        title.textContent = 'Editar Tutor';
        form.tutorId.value = tutor.id;
        form.firstName.value = tutor.firstName;
        form.lastName.value = tutor.lastName;
        form.email.value = tutor.email;
        form.phone.value = tutor.phone;
        
        // Seleccionar los estudiantes asociados al tutor
        Array.from(studentSelect.options).forEach(option => {
            option.selected = tutor.students.includes(parseInt(option.value));
        });
    } else {
        title.textContent = 'Agregar Nuevo Tutor';
        form.reset();
        form.tutorId.value = '';
        
        // Deseleccionar todos los estudiantes
        Array.from(studentSelect.options).forEach(option => {
            option.selected = false;
        });
    }

    $(modal).modal('show');
}

// Función para guardar un tutor (nuevo o editado)
function saveTutor() {
    const form = document.getElementById('tutorForm');
    const studentSelect = document.getElementById('studentSelect');
    const selectedStudents = Array.from(studentSelect.selectedOptions).map(option => parseInt(option.value));

    const tutorData = {
        id: form.tutorId.value ? parseInt(form.tutorId.value) : tutors.length + 1,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        students: selectedStudents
    };

    const index = tutors.findIndex(t => t.id === tutorData.id);
    if (index !== -1) {
        tutors[index] = tutorData;
    } else {
        tutors.push(tutorData);
    }

    // Actualizar los tutorId de los estudiantes
    students.forEach(student => {
        if (selectedStudents.includes(student.id)) {
            student.tutorId = tutorData.id;
        } else if (student.tutorId === tutorData.id) {
            student.tutorId = null;
        }
    });

    loadTutors();
    $('#tutorModal').modal('hide');
}

// Función para ver los detalles de un tutor
function viewTutorDetails(tutorId) {
    const tutor = tutors.find(t => t.id === tutorId);
    if (tutor) {
        document.getElementById('tutorName').textContent = `${tutor.firstName} ${tutor.lastName}`;
        document.getElementById('tutorEmail').textContent = tutor.email;
        document.getElementById('tutorPhone').textContent = tutor.phone;

        const studentsTableBody = document.getElementById('tutorStudentsTableBody');
        studentsTableBody.innerHTML = '';
        tutor.students.forEach(studentId => {
            const student = students.find(s => s.id === studentId);
            if (student) {
                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.firstName}</td>
                        <td>${student.lastName}</td>
                        <td>${student.email}</td>
                    </tr>
                `;
                studentsTableBody.innerHTML += row;
            }
        });

        $('#tutorDetailsModal').modal('show');
    }
}

// Función para editar un tutor
function editTutor(tutorId) {
    openTutorModal(tutorId);
}

// Función para eliminar un tutor
function deleteTutor(tutorId) {
    if (confirm('¿Estás seguro de que quieres eliminar este tutor?')) {
        tutors = tutors.filter(t => t.id !== tutorId);
        
        // Actualizar los tutorId de los estudiantes
        students.forEach(student => {
            if (student.tutorId === tutorId) {
                student.tutorId = null;
            }
        });

        loadTutors();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadTutors();

    document.getElementById('addTutorBtn').addEventListener('click', () => openTutorModal());
    document.getElementById('saveTutorBtn').addEventListener('click', saveTutor);
});