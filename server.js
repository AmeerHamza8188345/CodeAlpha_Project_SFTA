const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';

// Ensure 'uploads' directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected');
});

// Define Schema and Model for Transfers
const transferSchema = new mongoose.Schema({
    fileName: String,
    fileSize: Number,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

const Transfer = mongoose.model('Transfer', transferSchema);

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Express Routes
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        // Save transfer details to MongoDB
        const fileData = files.map(file => ({
            fileName: file.filename,
            fileSize: file.size,
            status: 'Pending',
        }));

        await Transfer.insertMany(fileData);

        res.status(200).json({
            message: 'Files uploaded successfully.',
            files: fileData
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Error uploading files.' });
    }
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
    socket.emit('message', 'Hello from server!');
});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
