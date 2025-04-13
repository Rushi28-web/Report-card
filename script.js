// Define our form inputs and store them in constants
const myForm = document.querySelector("#std_input_table");
const inputs = {
    school_name: document.querySelector(".i-school"),
    std_name: document.querySelector(".i-name"),
    std_roll: document.querySelector(".i-roll"),
    std_class: document.querySelector(".i-class"),
    std_section: document.querySelector(".i-sec"),
    std_gender: document.querySelector(".i-gender"),
    std_father_name: document.querySelector(".i-father"),
    std_physics_mark: document.querySelector(".i-p-sec"),
    std_chemistry_mark: document.querySelector(".i-c-sec"),
    std_math_mark: document.querySelector(".i-math-sec"),
    std_result: document.querySelector(".i-res"),
    std_mob: document.querySelector(".i-mob"),
    std_p_total: document.querySelector(".i-p-total"),
    std_c_total: document.querySelector(".i-c-total"),
    std_m_total: document.querySelector(".i-math-total")
};

let total_mark_secured = 0;
let full_subject_mark = 0;
let std_percent = 0;

// Hide the report card elements initially
document.querySelector("#report-card-HTML").style.display = "none";
document.querySelector(".table_bw-div").style.display = "none";

// Button onclick (submit)
function send_data_for_print() {
    total_mark_secured = parseFloat(inputs.std_math_mark.value) + parseFloat(inputs.std_physics_mark.value) + parseFloat(inputs.std_chemistry_mark.value);
    full_subject_mark = parseFloat(inputs.std_p_total.value) + parseFloat(inputs.std_c_total.value) + parseFloat(inputs.std_m_total.value);
    std_percent = (total_mark_secured / full_subject_mark) * 100;

    send_data_from_form();
    document.querySelector("#report-card-HTML").style.display = "block";
    document.querySelector(".table_bw-div").style.display = "block";
}

// Send data from table to report card
function send_data_from_form() {
    // Fill in the report card content (color)
    const reportCardSelectors = {
        ".school-title": inputs.school_name.value,
        "#p-name": inputs.std_name.value,
        "#p-roll": inputs.std_roll.value,
        "#p-class": inputs.std_class.value,
        "#p-section": inputs.std_section.value,
        "#p-father": inputs.std_father_name.value,
        "#p-mobile": inputs.std_mob.value,
        "#p-phy-total": inputs.std_p_total.value,
        "#p-phy-mark": inputs.std_physics_mark.value,
        "#p-chem-total": inputs.std_c_total.value,
        "#p-chem-mark": inputs.std_chemistry_mark.value,
        "#p-math-total": inputs.std_m_total.value,
        "#p-math-mark": inputs.std_math_mark.value,
        "#p-total-mark": `${total_mark_secured}/${full_subject_mark}`,
        "#p-result": inputs.std_result.value,
        "#p-percentage": `${std_percent.toFixed(1)}%`
    };

    // Apply the values to the report card (color)
    Object.entries(reportCardSelectors).forEach(([selector, value]) => {
        document.querySelector(selector).innerHTML = value;
    });

    // Fill in the report card content (B/W)
    const bwSelectors = {
        ".school-title_bw": inputs.school_name.value,
        ".p-name": inputs.std_name.value,
        ".p-roll": inputs.std_roll.value,
        ".p-class": inputs.std_class.value,
        ".p-section": inputs.std_section.value,
        ".p-father": inputs.std_father_name.value,
        ".p-mobile": inputs.std_mob.value,
        ".p-phy-total": inputs.std_p_total.value,
        ".p-phy-mark": inputs.std_physics_mark.value,
        ".p-chem-total": inputs.std_c_total.value,
        ".p-chem-mark": inputs.std_chemistry_mark.value,
        ".p-math-total": inputs.std_m_total.value,
        ".p-math-mark": inputs.std_math_mark.value,
        ".p-total-mark": `${total_mark_secured}/${full_subject_mark}`,
        ".p-result": inputs.std_result.value,
        ".p-percentage": `${std_percent.toFixed(1)}%`
    };

   // Apply the values to the report card (B/W)
Object.entries(bwSelectors).forEach(([selector, value]) => {
    document.querySelector(selector).innerHTML = value;
});

// Generalized PDF generation function (for both color and B/W)
function generate_pdf(divId, filename) {
    const div = document.getElementById(divId);
    if (!div) {
        console.error(`Div with id ${divId} not found.`);
        return;
    }

    html2canvas(div, { 
        useCORS: true, 
        logging: true, 
        scale: 2  // Optional: Increase resolution for better quality
    })
    .then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('portrait');

        // Adjust image placement and size in the PDF
        const imgWidth = 180;  // Adjust width of the image in the PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width;  // Maintain aspect ratio

        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        doc.save(filename);
    })
    .catch(function (error) {
        console.error("Error generating PDF: ", error);
    });
}

// Generate color PDF
function GenerateCard() {
    console.log('Generating color PDF...');
    generate_pdf("report-card-HTML", 'report-carder-color.pdf');
}

// Generate black and white PDF
function GenerateCard_bw() {
    console.log('Generating black & white PDF...');
    generate_pdf("table_bw-div", 'report-carder-bw.pdf');
}}

// Reset form fields
function reset_table() {
Object.values(inputs).forEach(input => input.value = "");
}

// Print the report card (color)
function print_report_card() {
printDiv("report-card-HTML");
}

// Print the report card (black & white)
function print_report_card_bw() {
printDiv("table_bw-div");
}

// Common print function for any div
function printDiv(divName) {
const backup_whole_body = document.body.innerHTML;
const print_div = document.querySelector(`#${divName}`).innerHTML;
document.body.innerHTML = print_div;
window.print();
document.body.innerHTML = backup_whole_body;
}

// Download PDF button handling
const options = {
filename: 'report-card-ssc.pdf',
image: { type: 'png' },
html2canvas: { scale: 2, width: 810, height: 1100 },
jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
};

$('.btn-download').click(function (e) {
e.preventDefault();
const element = document.getElementById('report-card-HTML');
html2pdf().from(element).set(options).save();
});