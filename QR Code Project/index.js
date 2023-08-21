/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

var filePath = "count.txt"


inquirer
  .prompt([
    {
        message:"Type in your URL: ",
        name: "URL"
    },
    {
        message:"Type in name of QR code image: ",
        name: "QR"
    }])
  .then((answers) => {
    // Read the contents of the file
    fs.readFile(filePath, "utf-8", (err, fileContents) => {
        if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    // Create the QR code
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img_"+answers.QR+".png"));
    
    // write the url to URL.txt
    fs.appendFile("URL.txt", answers.QR+": "+url+"\n", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
  
    // Modify count.txt contents as needed
    var modifiedContents = parseInt(fileContents)+1; // add one
  
    // Write the modified data back to the same file
    fs.writeFile(filePath, modifiedContents.toString(), "utf-8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
  
      console.log("Data has been successfully written back to the file.");
    });
  });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      // Something else went wrong
      console.lof("Something else went wrong")
    }
  });