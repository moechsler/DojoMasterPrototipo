// Datos de ejemplo de la academia
const academyInfo = {
    name: "Lorca Taekwon-do Team",
    address: "Calle Principal 123, Ciudad Ejemplo",
    phone: "+1 234 567 890",
    email: "info@lorcatkd.cl",
    website: "www.lorcatkd.cl",
    foundedYear: 1985,
    mainStyle: "Taekwon-Do",
    branches: 3,
    students: 60,
    instructors: 3
};

// Función para cargar la información de la academia
function loadAcademyInfo() {
    document.getElementById('academyName').textContent = academyInfo.name;
    document.getElementById('academyAddress').textContent = academyInfo.address;
    document.getElementById('academyPhone').textContent = academyInfo.phone;
    document.getElementById('academyEmail').textContent = academyInfo.email;
    document.getElementById('academyWebsite').textContent = academyInfo.website;
    document.getElementById('academyFoundedYear').textContent = academyInfo.foundedYear;
    document.getElementById('academyMainStyle').textContent = academyInfo.mainStyle;
    document.getElementById('academyBranches').textContent = academyInfo.branches;
    document.getElementById('academyStudents').textContent = academyInfo.students;
    document.getElementById('academyInstructors').textContent = academyInfo.instructors;
}

// Cargar la información cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadAcademyInfo);