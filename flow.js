asetInterval(updateDateTime, 1000); // Update the date and time every second

function updateDateTime() {
    const dateTimeElement = document.querySelector('.date-time');
    const now = new Date();
    dateTimeElement.textContent = now.toLocaleString();
}

function message_box(text) {
    alert(text);
}

function flow_clear_values () {
    // clear load values
    document.getElementById("job_description").value = "(enter the description here)"; 
    document.getElementById("q").value = "0.0";
    document.getElementById("rho").value = "0.0";
    document.getElementById("eta").value = "0.0"; 
    document.getElementById("k").value = "0.0"; 
    document.getElementById("d_o").value = "0.0"; 
    document.getElementById("e_n").value = "0.0"; 
    document.getElementById("comment").value = ""; 
    //clear calculated values
    document.getElementById("v").value = "0.0";
    document.getElementById("d_i").value = "0.0";
    document.getElementById("a_i").value = "0.0";
    document.getElementById("w").value = "0.0";
    document.getElementById("r_e").value = "0.0";
    document.getElementById("flow").value = "(none)";
    document.getElementById("friction_factor").value = "0.0"; 
    // clear notes
    document.getElementById("note_1").value = "";
    document.getElementById("note_2").value = "";
    document.getElementById("note_3").value = "";
    document.getElementById("note_4").value = "";
    document.getElementById("note_5").value = "";
    document.getElementById("note_6").value = "";
    document.getElementById("note_7").value = "";
    //inform user
    //alert('Clear values -> done.');
}

function flow_load_example () {
    //clear values
    flow_clear_values();
    // load input values 
    document.getElementById("job_description").value = "steamline piping"; 
    document.getElementById("q").value = "40.0";
    document.getElementById("rho").value = "11.413";
    document.getElementById("eta").value = "0.00000015";
    document.getElementById("k").value = "0.0045"; 
    document.getElementById("d_o").value = "273.0"; 
    document.getElementById("e_n").value = "10.0";
    // inform user
    //alert('Example 1 succesfully loaded.');
}

function flow_calculate_values () {
    // get inlet values
    var  q = parseFloat(document.getElementById("q").value); 
    var  rho = parseFloat(document.getElementById("rho").value);
    var  eta = parseFloat(document.getElementById("eta").value);
    var  k = parseFloat(document.getElementById("k").value);
    var  d_o = parseFloat(document.getElementById("d_o").value); 
    var  e_n = parseFloat(document.getElementById("e_n").value);
    // calculate values
    var d_i = d_o - 2*e_n;
    var a_i = (d_i * d_i*Math.PI)/(4*1000000);
    var v = q / (3.6*rho);
    var w = v / a_i;
    var r_e = w*(d_i/1000)*rho/eta;
    // write values
    document.getElementById("d_i").value = d_i;
    document.getElementById("a_i").value = a_i;
    document.getElementById("v").value = v;
    document.getElementById("w").value = w;
    document.getElementById("r_e").value = r_e;
    //
    if (r_e < 2000) {
        document.getElementById("flow").value = "laminar";
        var friction_lam = 64/r_e;
        document.getElementById("friction_factor").value = friction_lam;
    } else if (r_e >= 2000 && r_e <= 4000) {
        document.getElementById("flow").value = "tranmsitional";
        var friction_1 = 64/r_e;
        var friction_2 = 0.25/(log10((k/d_i)/3.7+5.74/(r_e**0.9)))**2;
        friction_factor = (friction_1 + friction_2)/2
        document.getElementById("friction_factor").value = friction_factor;
    } else {
        document.getElementById("flow").value = "turbulent";
        var friction_turb = 0.25/(log10((k/d_i)/3.7 + 5.74/(r_e**0.9)))**2;
        document.getElementById("friction_factor").value = friction_turb;
    }

    // inform user
    //alert('Calculation done.');
}
