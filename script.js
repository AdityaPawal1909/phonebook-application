// ===============================
// Variables
// ===============================
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const saveBtn = document.getElementById("saveBtn");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contactList");
const contactCount = document.getElementById("contactCount");
// ===============================
// Event Listeners
// ===============================
// Save Button
saveBtn.addEventListener("click", addContact);
// Press Enter to Save
nameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addContact();
    }
});
numberInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addContact();
    }
});
// Search Contact
searchInput.addEventListener("keyup", searchContact);
// Load Contacts
displayContacts();
// ===============================
// Add Contact
// ===============================
function addContact() {
    let name = nameInput.value.trim();
    let number = numberInput.value.trim();
    if (name === "" || number === "") {
        alert("Please fill all fields.");
        return;
    }
    contacts.push({
        name: name,
        number: number
    });
    saveContacts();
    nameInput.value = "";
    numberInput.value = "";
    displayContacts();
}
// ===============================
// Display Contacts
// ===============================
function displayContacts() {
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        contactList.innerHTML += `
        <div class="contact-card">
            <div class="contact-info">
                <h4>👤 ${contact.name}</h4>
                <p>📞 ${contact.number}</p>
            </div>
            <div class="action-buttons">
                <button
                    class="btn btn-warning"
                    onclick="editContact(${index})">
                    ✏️ Edit
                </button>
                <button
                    class="btn btn-danger"
                    onclick="deleteContact(${index})">
                    🗑 Delete
                </button>
            </div>
        </div>
        `;
    });
    updateCounter();
}
// ===============================
// Search Contact
// ===============================
function searchContact() {
    let keyword = searchInput.value.toLowerCase();
    let filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(keyword) ||
        contact.number.includes(keyword)
    );
    showFilteredContacts(filtered);
}
// ===============================
// Show Filtered Contacts
// ===============================
function showFilteredContacts(filteredContacts) {
    contactList.innerHTML = "";
    filteredContacts.forEach((contact) => {
        let originalIndex = contacts.indexOf(contact);
        contactList.innerHTML += `
        <div class="contact-card">
            <div class="contact-info">
                <h4>👤 ${contact.name}</h4>
                <p>📞 ${contact.number}</p>
            </div>
            <div class="action-buttons">
                <button
                    class="btn btn-warning"
                    onclick="editContact(${originalIndex})">
                    ✏️ Edit
                </button>
                <button
                    class="btn btn-danger"
                    onclick="deleteContact(${originalIndex})">
                    🗑 Delete
                </button>
            </div>
        </div>
        `;
    });
}
// ===============================
// Contact Counter
// ===============================
function updateCounter() {
    contactCount.textContent = contacts.length;
}
// ===============================
// Save to Local Storage
// ===============================
function saveContacts() {
    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
    );
}
// ===============================
// Edit Contact
// ===============================
function editContact(index) {
    let newName = prompt(
        "Enter new name:",
        contacts[index].name
    );
    if (newName === null) return;
    let newNumber = prompt(
        "Enter new number:",
        contacts[index].number
    );
    if (newNumber === null) return;
    newName = newName.trim();
    newNumber = newNumber.trim();
    if (newName === "" || newNumber === "") {
        alert("Fields cannot be empty.");
        return;
    }
    contacts[index].name = newName;
    contacts[index].number = newNumber;
    saveContacts();
    displayContacts();
}
// ===============================
// Delete Contact
// ===============================
function deleteContact(index) {
    let confirmDelete = confirm(
        "Delete this contact?"
    );
    if (!confirmDelete) return;
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
}
// ===============================
// Dark Mode
// ===============================
const themeBtn = document.getElementById("themeBtn");
// Load Saved Theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.innerHTML = "☀️ Light Mode";
} else {
    themeBtn.innerHTML = "🌙 Dark Mode";
}
// Toggle Theme
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "🌙 Dark Mode";
    }
});