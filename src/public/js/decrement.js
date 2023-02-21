const $decrementForm = document.getElementById('decrement-form');
const $countData = document.getElementById('count-data');

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "500",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$decrementForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const countValue = parseInt($countData.innerHTML);
  console.log(countValue);
  if (countValue <= 0) {
    return toastr.error('Count value cannot be less than zero!');
  }
  $decrementForm.submit();
});
