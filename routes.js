const fs = require("fs");

const requestHandler = (req, res) => {
   const url = req.url;
   const method = req.method;
   if (url === "/") {
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Home Page</title></head>");
      res.write(
         "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>submit</button></form></body>"
      );
      res.write("</html>");
      return res.end();
   }

   if (url === "/message" && method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
         console.log(chunk);
         body.push(chunk);
      });
      return req.on("end", () => {
         const parsedBody = Buffer.concat(body).toString();
         const message = parsedBody.split("=")[1];
         fs.writeFile("messages.txt", message, (err) => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
         });
      });
   }

   res.setHeader("Content-Type", "text/html");
   res.write("<html>");
   res.write("<head><title>Home Page</title></head>");
   res.write("<body><h1>Hello World</h1></body>");
   res.write("</html>");
   return res.end();
};

// module.export = requestHandler;

module.exports = {
   routes: requestHandler,
   text: "Hello World!",
};
