setInterval(updateDateTime, 1000); // Update the date and time every second

function updateDateTime() {
    const dateTimeElement = document.querySelector('.date-time');
    const now = new Date();
    dateTimeElement.textContent = now.toLocaleString();
}

function message_box(text) {
    alert(text);
}

function clear_values () {
    // clear load values
    document.getElementById("Q").value = "0.0";
    document.getElementById("rho").value = "0.0"; 
    document.getElementById("D_o").value = "0.0"; 
    document.getElementById("e_n").value = "0.0"; 
    document.getElementById("comment").value = ""; 
    //clear calculated values
    document.getElementById("V").value = "0.0";
    document.getElementById("D_i").value = "0.0";
    document.getElementById("A_i").value = "0.0";
    document.getElementById("w").value = "0.0";
    // clear notes
    document.getElementById("note_1").value = "";
    document.getElementById("note_2").value = "";
    document.getElementById("note_3").value = "";
    document.getElementById("note_4").value = "";
    document.getElementById("note_5").value = "";
    document.getElementById("note_6").value = "";
    document.getElementById("note_7").value = "";
    //inform user
    alert('Clear values -> done.');
}

function load_example () {
    clear
}

function calculate () {

}
