export function saveToLocalS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
window.saveToLocalS = saveToLocalS;
export function saveStringsToLocalS(key, data) {
  localStorage.setItem(key, data);
}

export function getFromLocalS(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function updateLocalS(key, newData) {
  // Get existing data from local storage
  const existingData = JSON.parse(localStorage.getItem(key)) || {};
  // Merge the existing data with the new data
  const updatedData = {
    ...existingData,
    ...newData,
  };

  // Save the updated data back to local storage
  localStorage.setItem(key, JSON.stringify(updatedData));
}
