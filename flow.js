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
    document.getElementById("job_description").value = "(enter the description here)"; 
    document.getElementById("q").value = "0.0";
    document.getElementById("rho").value = "0.0"; 
    document.getElementById("d_o").value = "0.0"; 
    document.getElementById("e_n").value = "0.0"; 
    document.getElementById("comment").value = ""; 
    //clear calculated values
    document.getElementById("v").value = "0.0";
    document.getElementById("d_i").value = "0.0";
    document.getElementById("a_i").value = "0.0";
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
    //  clear values
    clear_values()
    // load input values 
    document.getElementById("job_description").value = "steamline piping"; 
    document.getElementById("q").value = "40.0";
    document.getElementById("rho").value = "11.413"; 
    document.getElementById("d_o").value = "273.0"; 
    document.getElementById("e_n").value = "10.0";
    // inform user
    alert('Example 1 succesfully loaded.');

function calculate () {
    // get inlet values
    var  q = document.getElementById("q").value; 
    var  rho = document.getElementById("rho").value; 
    var  d_o = document.getElementById("d_o").value; 
    var  e_n = document.getElementById("e_n").value; 
        
    // test code
    alert(rho);
}
