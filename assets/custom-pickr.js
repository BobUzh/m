let pickr = document.querySelector('.date-picker');
let la_week = pickr.dataset.laweek.split(',');
let la_customDates = pickr.dataset.ladate.split(',');
let la_weekIdx = la_week.map(
(day, idx) => day === 'true'
    ? idx
    : null
);

let sf_week = pickr.dataset.sfweek.split(',');
let sf_customDates = pickr.dataset.sfdate.split(',');
let sf_weekIdx = sf_week.map(
(day, idx) => day === 'true'
    ? idx
    : null
);

let la_config = {
    minDate: "2023-08-27",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
    dateFormat: "Y-m-d",
    disable: [
        function(date) {
        return la_weekIdx.includes(date.getDay());
        },
        ... la_customDates
    ],
    onChange: function(selectedDate) {
        $('.calendar-message').removeClass('error-show');
    }
};

let sf_config = {
    minDate: new Date().fp_incr(2),
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
    dateFormat: "Y-m-d",
    disable: [
        function(date) {
        return sf_weekIdx.includes(date.getDay());
        },
        ... sf_customDates
    ],
    onChange: function(selectedDate) {
        $('.calendar-message').removeClass('error-show');
    }
};

flatpickr("#picker", la_config);

subscribe(PUB_SUB_EVENTS.zipUpdate, function(key) {
    console.log('subscribe zip')
    if (key == 'la') flatpickr("#picker", la_config);
    if (key == 'sf') flatpickr("#picker", sf_config);


})
    