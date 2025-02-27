// Menampilkan popup ketika tombol "Open Popup" diklik
document
  .getElementById('open-popup-btn')
  .addEventListener('click', function () {
    document.querySelector('.popup').classList.add('active');
  });

// Menyembunyikan popup ketika tombol "Dismiss" diklik
document
  .getElementById('dismiss-popup-btn')
  .addEventListener('click', function () {
    document.querySelector('.popup').classList.remove('active');
  });
