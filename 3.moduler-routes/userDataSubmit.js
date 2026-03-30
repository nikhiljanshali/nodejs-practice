function userDataSubmit(req, res) {
  let dataBody = [];
  req.on("data", (chunk) => {
    dataBody.push(chunk);
  });
  req.on("end", () => {
    const formData = Buffer.concat(dataBody).toString();
    console.log("Received form data:", formData);
    res.write(`<h1>Form data received successfully!</h1>`);
  });
  // Process the form data (e.g., save to a database, send an email, etc.)
  //   console.log("Received form data:", formData);
  res.write(`<h1>Form data received successfully!</h1>`);
  // Send a response back to the client
  //   res.status(200).send("Form data received successfully!");
}

module.exports = userDataSubmit;
