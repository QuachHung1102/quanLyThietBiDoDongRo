'use strict';

// export data to file
const saveDynamicDataToFile = (data, fileName) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
    saveAs(blob, fileName);
    console.log(`Data saved to file: ${fileName}`);
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
};

export { saveDynamicDataToFile };