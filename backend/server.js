const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3000;
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcrypt');
// var salt = bcrypt.genSaltSync(10); 
const {encrypt , decrypt} = require('./EncryptionHandler')



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "yene_bazaar"
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


app.post("/api/registered_events", upload.single("receipt"), (req, res) => {
  const { businessName, contactPerson, phoneNumber, link, description, boothNumber, electricalOutlet,created_by } = req.body;
  const receiptPath = req.file ? `uploads/${req.file.filename}` : null;
  const cleanCreatedBy = Array.isArray(created_by) ? created_by[1] : created_by;
  console.log("Clean created_by:", cleanCreatedBy);
  if (!businessName || !contactPerson || !phoneNumber || !link || !description || !boothNumber || !receiptPath) {
    return res.status(400).send("All fields are required");
  }

  const sql = `INSERT INTO registered_events 
  (business_name, contact_person, phone_number, link, description, electrical_outlet, booth_number, receipt_path, booth_id,created_by)
VALUES 
  (?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM booth ORDER BY id DESC LIMIT 1),?);`;
  const values = [businessName, contactPerson, phoneNumber, link, description, electricalOutlet, boothNumber, receiptPath,cleanCreatedBy];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving to database:", err);
      return res.status(500).send("Failed to save to database");
    }
    res.status(201).send("Event registered successfully");
  });
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));





app.post('/booth', upload.single('boothImage'), (req, res) => {
  // console.log("Request body:", req.body); // Debugging
  // console.log("Uploaded file:", req.file);
  const {  eventName ,boothNumber,created_by} = req.body;
  const boothImagePath = req.file ? `uploads/${req.file.filename}` : null;
  console.log(created_by)

  if (!boothImagePath || !boothNumber || !eventName) {
    return res.status(400).send("All fields are required");
  }

  const sql = "INSERT INTO booth (image, booth_no, event_name,created_by) VALUES (?, ?, ?,?)";
  const values = [boothImagePath, boothNumber, eventName,created_by];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving to database:", err);
      return res.status(500).send("Failed to save data into the database");
    }
    res.status(201).send("Booth saved successfully");
  });
});


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get('/boothImage', (req,res)=>{
  sql = "SELECT *, CONCAT('http://localhost:3000/', image) AS boothImage_url FROM booth ORDER BY id DESC LIMIT 1;";
  db.query(sql,(err,result)=>{
    if(err){
      console.log("faild to fetch booth images");
      res.status(500).send("failed to fetch");
    }
    res.status(200).json(result);
    console.log(result);

  })
})

app.get("/selectedBooths", (req,res)=>{
  sql = "SELECT registered_events.booth_number FROM registered_events JOIN (SELECT id FROM booth ORDER BY id DESC LIMIT 1) AS selected_booth ON registered_events.booth_id = selected_booth.id";
  
  db.query(sql,(err,result)=>{
 if(err){
  console.log("failed to fetch selected booth numbers");
  res.status(500).send("failed to fetch");
 }
 res.status(200).json(result);
 console.log(result);
  })
})


app.post("/signup", async (req, res) => {
  const { fullName, username, password } = req.body;
  console.log(fullName);

  if (!fullName || !username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);  
  // var hashedPassword = bcrypt.hashSync(password, salt);
  // const hashedPassword = encrypt(password);
const query = "INSERT INTO users (Full_Name, username, password) VALUES (?, ?, ?)";
db.query(query, [fullName, username, hashedPassword], (err) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ message: "Error signing up!" });
  }
  res.status(201).json({ message: "User registered successfully!" });
});
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    console.log("User found in DB:", results);
console.log("Entered password:", password);


    if (err) return res.status(500).json({ message: "Database error!" });

    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials!" });

    const user = results[0];
    console.log("Stored hashed password:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = bcrypt.compareSync(password, user.password);
    // console.log(isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

    // const token = jwt.sign({ id: user.id, username: user.username }, "secret", { expiresIn: "1h" });

    res.json({ message: "Login successful!",
      role: user.role_id,
      username: user.username,
      user_id:user.Id

     });
 
  });
});


app.get("/usernames", (req,res)=>{
  
  sql="select username from users";

  db.query(sql,(err,result)=>{
    if(err){
      return res.status(500).json({message:"Faild to fetch username"})
    }
    res.status(200).json(result)
  })
})





app.get('/selectedBooth',(req,res)=>{
  const sql = "select booth_Number from registered_events";
  db.query(sql,(err,data) =>{
    if(err) return res.json(err);
    return res.json(data);
  });
});

app.get('/viewRegistration', (req, res) => {
  const sql = "SELECT *, CONCAT('http://localhost:3000/', receipt_path) AS receipt_url FROM registered_events join booth on booth.id = registered_events.booth_id join users on users.Id = registered_events.created_by order by booth.id Desc";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
