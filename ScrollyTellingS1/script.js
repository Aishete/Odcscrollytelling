function getcurrentDate(){
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString(undefined, options);

}
window.addEventListener("DOMContentLoaded", () => {
  const dateDisplay = document.getElementById("date-display");
  if (dateDisplay) {
    dateDisplay.innerHTML = getcurrentDate();
  }
});
