const students = [];

// Function to register a student
function registerStudent(id, name) {
    students.push({ id, name });
    displayMessage(`Student ${name} registered successfully!`);
}

// Function to display messages
function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
}

// Event listener for the registration form
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    registerStudent(studentId, studentName);
    this.reset(); // Reset the form
});
