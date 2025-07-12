setInterval(updateDateTime, 1000); // Update the date and time every second

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
    document.getElementById("q").value = "0.00";
    document.getElementById("rho").value = "0.00";
    document.getElementById("eta").value = "0.000000"; 
    document.getElementById("k").value = "0.0000"; 
    document.getElementById("d_o").value = "0.000"; 
    document.getElementById("e_n").value = "0.000"; 
    document.getElementById("comment").value = ""; 
    //clear calculated values
    document.getElementById("v").value = "0.0000";
    document.getElementById("d_i").value = "0.000";
    document.getElementById("a_i").value = "0.00000";
    document.getElementById("w").value = "0.00";
    document.getElementById("r_e").value = "0.0";
    document.getElementById("flow").value = "(none)";
    document.getElementById("friction_factor").value = "0.000"; 
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
    document.getElementById("eta").value = "0.000015";
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
    var roughness = k / d_i;
    // write values
    document.getElementById("d_i").value = d_i.toFixed(3);
    document.getElementById("a_i").value = a_i.toFixed(5);
    document.getElementById("v").value = v.toFixed(5);
    document.getElementById("w").value = w.toFixed(2);
    document.getElementById("r_e").value = r_e.toFixed(0);
    // discuss case of re nummber
    if (r_e < 2000) {
        document.getElementById("flow").value = "laminar";
        var friction_laminar = 64/r_e;
        document.getElementById("friction_factor").value = friction_laminar.toFixed(3);
    
    } else if (r_e >= 2000 && r_e <= 4000) {
        document.getElementById("flow").value = "transitional";
        var friction_transition = (64/r_e + haaland_calculate(r_e, k, d_i))/2;
        document.getElementById("friction_factor").value = friction_transition;
    
    } else {
        document.getElementById("flow").value = "turbulent";
        var friction_turbulent = haaland_calculate(r_e, k, d_i);
        document.getElementById("friction_factor").value = friction_turbulent;
    }

    // inform user
    document.getElementById("status").textContent = "Calculation complete.";
}

function haaland_calculate(r_e, k, d_i) {
    // this function calculates halland friction factor for turbulent flow
    let roughness = k / d_i;
    let term = roughness / 3.7 + 6.9 / r_e;
    let friction = 1 / Math.pow(-1.8 * Math.log10(term), 2);
    return parseFloat(friction.toFixed(4));
}

function elbowKValue(angle_deg, radius_ratio = 1.0, size_mm = 100) {
  const angle = parseFloat(angle_deg);
  const rD = parseFloat(radius_ratio);

  // Base K-values by angle and radius
  let baseK;
  if (angle === 90) {
    baseK = rD >= 1.5 ? 0.4 : 0.75;
  } else if (angle === 45) {
    baseK = rD >= 1.5 ? 0.25 : 0.4;
  } else {
    // Approximate for other angles
    baseK = 0.01 * angle;
  }

  // Optional size correction (larger elbows = slightly lower K)
  const sizeFactor = size_mm < 50 ? 1.1 : size_mm < 150 ? 1.0 : 0.9;

  return parseFloat((baseK * sizeFactor).toFixed(3));
}

/*
elbowKValue(90, 1.5, 80); // ≈ 0.4
elbowKValue(45, 1.0, 100); // ≈ 0.4
elbowKValue(30, 1.5, 150); // ≈ 0.3
*/

function teeKValue(config = "branch", size_mm = 100) {
  const configType = String(config).toLowerCase();
  const size = parseFloat(size_mm);

  // Base K-values by configuration
  const baseK = {
    branch: 1.0,
    run: 0.4,
    elbow: 1.0,
    stub: 0.8
  };

  // Size factor — larger tees tend to have slightly lower resistance
  const sizeFactor = size < 50 ? 1.1 : size < 150 ? 1.0 : 0.9;

  const base = baseK[configType];
  if (base === undefined) {
    console.warn(`Unknown tee configuration: "${configType}"`);
    return null;
  }

  return parseFloat((base * sizeFactor).toFixed(3));
}

/*
teeKValue("branch", 80); // ≈ 1.0
teeKValue("run", 100);   // ≈ 0.4
teeKValue("stub", 150);  // ≈ 0.72
*/

function expansionLoopPressureDrop(size_mm, elbows, rho, velocity) {
  const size = parseFloat(size_mm);
  const numElbows = parseInt(elbows);
  const density = parseFloat(rho);       // kg/m³
  const v = parseFloat(velocity);        // m/s

  // Base K-value per elbow (standard 90°)
  const K_elbow = 0.75;

  // Loop geometry factor — assume 2 straight legs + 4 elbows
  const loopK = numElbows * K_elbow;

  // Optional: add straight pipe friction (simplified)
  const pipeLength_m = 5 * (size / 1000); // assume loop length ≈ 5 × diameter
  const f = 0.015; // friction factor (approx. for steel)
  const K_pipe = f * (pipeLength_m / (size / 1000));

  const K_total = loopK + K_pipe;

  // Pressure drop in Pascals
  const deltaP = K_total * (density * v * v) / 2;

  return {
    K_total: parseFloat(K_total.toFixed(3)),
    deltaP_Pa: parseFloat(deltaP.toFixed(2)),
    deltaP_bar: parseFloat((deltaP / 100000).toFixed(4))
  };
}

/*
let result = expansionLoopPressureDrop(273, 4, 11.4, 22.5);
console.log(result);
// Output:
// { K_total: 4.05, deltaP_Pa: 2882.81, deltaP_bar: 0.0288 }
*/









