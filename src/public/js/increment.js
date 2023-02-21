const $incrementForm = document.getElementById('increment-form');

$incrementForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $incrementForm.submit();
});
