const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$(document).ready(function () {
    function validateAnnualGrossIncome() {
        var annualGrossIncome = $("#gross-annual-income").val();
        const errorIcon = $('#gross-annual-income-error')
        var tooltip = bootstrap.Tooltip.getOrCreateInstance(errorIcon[0]);

        if (annualGrossIncome === '') {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please enter your annual gross income.';
            return false;
        } else if (isNaN(annualGrossIncome)) {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please enter a valid number.';
            return false;
        } else {
            errorIcon.addClass('d-none')
            tooltip.hide();
            return true;
        }
    }

    function validateExtraIncome() {
        var extraIncome = $("#extra-income").val();
        const errorIcon = $('#extra-income-error')
        var tooltip = bootstrap.Tooltip.getOrCreateInstance(errorIcon[0]);

        if (extraIncome === '') {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please enter your extra income.';
            return false;
        } else if (isNaN(extraIncome)) {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please enter a valid number.';
            return false;
        } else {
            errorIcon.addClass('d-none')
            tooltip.hide();
            return true;
        }
    }

    function validateDeductions() {
        var deductions = $("#deductions").val();
        const errorIcon = $('#deductions-error')
        var tooltip = bootstrap.Tooltip.getOrCreateInstance(errorIcon[0]);

        if (deductions === '') {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please enter your deductions.';
            return false;
        } else if (isNaN(deductions)) {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please enter a valid number.';
            return false;
        } else {
            errorIcon.addClass('d-none')
            tooltip.hide();
            return true;
        }
    }

    function validateAgeGroupSelection () {
        var ageGroup = $("#age-group")[0].value;
        const errorIcon = $('#age-group-error')
        var tooltip = bootstrap.Tooltip.getOrCreateInstance(errorIcon[0]);

        if (ageGroup === '') {
            errorIcon.removeClass('d-none')
            tooltip._config.title = 'Please select your age group.';
            return false;
        } else {
            errorIcon.addClass('d-none')
            tooltip.hide();
            return true;
        }
    }

    function calculateTax() {
        var annualGrossIncome = $("#gross-annual-income").val();
        var extraIncome = $("#extra-income").val();
        var deductions = $("#deductions").val();
        var ageGroup = $("#age-group")[0].value;
        var tax = 0;
        console.log(ageGroup)

        var totalIncome = Number(annualGrossIncome) + Number(extraIncome) - Number(deductions);

        if(totalIncome > 800000) {
            if(ageGroup === '1') {
                tax = 0.3 * (totalIncome - 800000);
            } else if(ageGroup === '2') {
                tax = 0.4 * (totalIncome - 800000);
            } else {
                tax = 0.1 * (totalIncome - 800000);
            }
        }

        return totalIncome - tax;
    }

    // submit form
    const form = $('#tax-form')
    form.submit(function (e) {
        e.preventDefault();
        if (
            validateAnnualGrossIncome() &
            validateExtraIncome() &
            validateAgeGroupSelection() &
            validateDeductions()
        ) {
            var actualIncome = calculateTax();

            var modal = new bootstrap.Modal(document.getElementById('resultModal'))
            var result = $('#result')
            result.text(actualIncome.toLocaleString('en-US', { style: 'currency', currency: 'INR' })) 
            modal.show()
        }
    });
})