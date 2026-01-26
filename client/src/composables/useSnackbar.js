export function useSnackbar(message) {
  const show = () => {
    const snackbar = document.getElementById('snackbar');
    snackbar.style.display = 'block';
    setTimeout(function() {
      snackbar.style.display = 'none';
    }, 3000);
  }

  const hide = () => {
    const snackbar = document.getElementById('snackbar');
    snackbar.style.display = 'none';
  }

  return { show, hide };
}
