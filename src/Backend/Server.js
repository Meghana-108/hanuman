import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from "multer";

const app = express();
app.use(cors());
app.use(bodyParser.json());

import path from 'path';

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


const OTP_STORE = new Map();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB connection error:', err));

// Mongoose schemas and models
const fishermanSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  licenseId: String,
  region: String,
  address: String,
}, { collection: 'fishermen_verify' });

const Fisherman = mongoose.model('Fisherman', fishermanSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const fishSchema = new mongoose.Schema({
  fishermanId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fishName: String,
  location: String,
  price: Number,
  status: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});
const Fish = mongoose.model("Fish", fishSchema);
// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in .env file');
  process.exit(1);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Helper: generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Middleware for protected routes (example)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized: No token' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: Invalid token format' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

// Routes

// Signup Route
app.post('/api/buyersignup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    const savedUser = await user.save();

    const token = generateToken(savedUser);

    res.status(201).json({
      message: 'User created successfully',
      user: { name, email, role },
      token,
    });
  } catch (err) {
    console.error('Signup error:', err);

    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login Route
app.post('/api/buyerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      user: { name: user.name, email, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data accessed', user: req.user });
});

// POST /login - Sends OTP using 2Factor API for fishermen login
app.post('/login', async (req, res) => {
  try {
   let { name, licenseId, mobile } = req.body;

if (!name || !licenseId || !mobile) {
  return res.status(400).json({ success: false, message: 'Name, licenseId and phone are required' });
}

mobile = mobile.startsWith('+91') ? mobile.slice(3) : mobile;


    // Search fisherman by exact mobile with +91 prefix, name, and licenseId
    const fisherman = await Fisherman.findOne({ name, licenseId, mobile: `+91${mobile}` });

    if (!fisherman) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Request OTP from 2Factor API
    const otpResponse = await axios.get(
      `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${mobile}/AUTOGEN`
    );

    const sessionId = otpResponse.data.Details;
    OTP_STORE.set(mobile, sessionId);

    // Remove OTP session after 2 minutes
    setTimeout(() => OTP_STORE.delete(mobile), 2 * 60 * 1000);

    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error('OTP sending error:', err.message || err);
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: err.message });
  }
});

// POST /verify - Verifies OTP
app.post('/verify', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }

    const mobile = phone.startsWith('+91') ? phone.slice(3) : phone;

    const sessionId = OTP_STORE.get(mobile);
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session expired or invalid' });
    }

    const verifyResponse = await axios.get(
      `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
    );

    if (verifyResponse.data.Details === 'OTP Matched') {
      OTP_STORE.delete(mobile);

      // ✅ Find the fisherman in DB
      const fisherman = await Fisherman.findOne({ mobile: `+91${mobile}` });

      if (!fisherman) {
        return res.status(404).json({ success: false, message: 'Fisherman not found' });
      }

      // ✅ Create token with JWT
      const token = jwt.sign(
        { id: fisherman._id, role: 'fisherman' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // ✅ Send token back
      return res.json({
        success: true,
        message: 'OTP verified',
        token,
      });
    } else {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error('OTP verification error:', err.message || err);
    res.status(500).json({ success: false, message: 'Verification failed', error: err.message });
  }
});

// GET /fisherman/:licenseId - Fetch fisherman info by licenseId
app.get('/fisherman/:licenseId', async (req, res) => {
  try {
    const { licenseId } = req.params;

    const fisherman = await Fisherman.findOne({ licenseId });

    if (!fisherman) {
      return res.status(404).json({ success: false, message: 'Fisherman not found' });
    }

    res.json({ success: true, data: fisherman });
  } catch (err) {
    console.error('Error fetching fisherman:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /test-fisherman - Test endpoint to fetch any fisherman
app.get('/test-fisherman', async (req, res) => {
  try {
    const fisherman = await Fisherman.findOne();

    if (fisherman) {
      res.json({ success: true, data: fisherman });
    } else {
      res.json({ success: false, message: 'No fishermen found' });
    }
  } catch (err) {
    console.error('Error fetching fisherman:', err);
    res.status(500).json({ success: false, message: 'Error fetching data', error: err.message });
  }
});

app.post("/api/fish",  authenticateToken, upload.single("fishImage"), async (req, res) => {
  try {
    const fish = new Fish({
      fishermanId: req.user.id,
      fishName: req.body.fishName,
      location: req.body.location,
      price: req.body.price,
      status: req.body.status,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ""
    });
    await fish.save();
    res.status(201).json(fish);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/api/fish",  authenticateToken, async (req, res) => {
  try {
    const fishes = await Fish.find({ fishermanId: req.user.id });
    res.json(fishes);
  } catch {
    res.status(500).json({ error: "Error fetching fish" });
  }
});
app.get("/api/fishes/price-range-chart", authenticateToken, async (req, res) => {
    console.log("Price range chart route hit");
  try {
    // const fishermanId = req.user.id;

   const fishes = await Fish.find();
   console.log(fishes);
    // Group prices by fishName
    const fishMap = {};
    fishes.forEach(fish => {
      const name = fish.fishName;
      if (!fishMap[name]) fishMap[name] = [];
      fishMap[name].push(fish.price);
    });

    // Calculate min and max price for each fishName
    const priceRanges = Object.keys(fishMap).map(name => {
      const prices = fishMap[name];
      return {
        name,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
      };
    });
    res.json({ success: true, data: priceRanges });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/fish-quantity-summary', async (req, res) => {
  try {
    const result = await Fish.aggregate([
      {
        $group: {
          _id: "$fishName",
          quantity: { $sum: 1 } // count uploads
        }
      },
      {
        $project: {
          _id: 0,
          fishName: "$_id",
          quantity: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.delete('/api/fish/:id', authenticateToken, async (req, res) => {
  await Fish.findByIdAndDelete(req.params.id);
  res.send({ message: "Fish deleted" });
});

// PUT update fish
app.put('/api/fish/:id', authenticateToken, async (req, res) => {
  const { fishName, location, price, status } = req.body;
  const updated = await Fish.findByIdAndUpdate(req.params.id, {
    fishName,
    location,
    price,
    status,
  }, { new: true });
  res.send(updated);
});

app.get('/api/fishes', async (req, res) => {
  try {
    const fishes = await Fish.aggregate([
      {
        $lookup: {
          from: 'fishermen_verify',  // ensure this matches your actual collection name
          localField: 'fishermanId',
          foreignField: '_id',
          as: 'fishermenInfo',
        },
      },
      {
        $unwind: {
          path: '$fishermenInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          fishName: 1,
          price: 1,
          imageUrl: 1,
          fishermenName: '$fishermenInfo.name',
        },
      },
    ]);


    res.json(fishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/fishes/:id', async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id).populate('fishermanId', 'name');
    if (!fish) return res.status(404).json({ message: 'Fish not found' });

    // Return data with fisherman name as fishermenName for frontend convenience
    res.json({
      _id: fish._id,
      fishName: fish.fishName,
      price: fish.price,
      imageUrl: fish.imageUrl,
      fishermenName: fish.fishermanId?.name || 'Unknown',
      location: fish.location,
      status: fish.status,
      createdAt: fish.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Start server
import http from 'http';
import { Server } from 'socket.io';

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // Join a private room (e.g., based on customer-fisherman chatId)
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`👥 Socket ${socket.id} joined room ${roomId}`);
  });

  // Receive and forward messages in room
  socket.on("send_message", ({ roomId, message, sender }) => {
    console.log(`📩 ${sender} sent message in room ${roomId}: ${message}`);
    io.to(roomId).emit("receive_message", { message, sender });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

