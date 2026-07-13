// Load contacts when page opens
window.onload = function () {
    displayContacts();
}

// Add Contact

function addContact() {

    let name = document.getElementById("name").value.trim();
    let number = document.getElementById("number").value.trim();

    if (name == "" || number == "") {
        alert("Please fill all fields");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({
        name: name,
        number: number
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.getElementById("name").value = "";
    document.getElementById("number").value = "";

    displayContacts();

}

// Display Contacts

function displayContacts() {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let output = "";
    contacts.forEach((contact, index) => {

        output += `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.number}</td>
            <td>
            <button class="btn btn-danger btn-sm"
            onclick="deleteContact(${index})">
            Delete
            </button>
            </td>
        </tr>
        `;

    });
    document.getElementById("contactList").innerHTML = output;
}

// Delete Contact

function deleteContact(index) {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();

}

// Search Contact

function searchContact() {

    let input = document.getElementById("search").value.toLowerCase();
    let contacts = JSON.parse(localStorage.getItem("contacts")) || []
    let output = "";

    contacts.forEach((contact, index) => {

        if (contact.name.toLowerCase().includes(input) ||
            contact.number.includes(input)) {

            output += `
            <tr>
            <td>${contact.name}</td>
            <td>${contact.number}</td>
            <td>
            <button class="btn btn-danger btn-sm"
            onclick="deleteContact(${index})">
            Delete
            </button>
            </td>
            </tr>
            `;
        }

    });

    document.getElementById("contactList").innerHTML = output;

}