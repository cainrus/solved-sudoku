document.getElementsByClassName('sudokuTable')[0].addEventListener('click', function (e) {
  var cellEl = e.target.closest('div');
  if (!cellEl) return;
  cellEl.style.color = (cellEl.style.color === 'transparent') ? '#000' : 'transparent';
});

document.getElementsByClassName('print')[0].addEventListener('click', function (e) {
  window.print();
});