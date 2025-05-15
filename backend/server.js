const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware

app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
.then(() => {
  console.log('MongoDB Connected!');
})
.catch((err) => {
  console.error('MongoDB Error', err);
});

// Define Schemas and Models

const infoSchema = new mongoose.Schema({
  name: String, 
  birthDate: Date, 
  interests: Array, 
  biography: String, 
  education: Object, 
  contactInfo: Object, 
});

const projectSchema = new mongoose.Schema({
  name: String, 
  description: String,
  technologies: Array, 
  date: Date, 
});

const educationSchema = new mongoose.Schema({
  title: String, 
  description: String, 
  image: String, 
  date: Date, 
  progress: Number, 
});

const skillsSchema = new mongoose.Schema({
  tech: String, 
  link: String, 
  image: String, 
  date: Date, 
});

const messageSchema = new mongoose.Schema({
  name: String, 
  email: String, 
  message: String, 
});

const Info = mongoose.model('info', infoSchema, 'info');
const Projects = mongoose.model('projects', projectSchema, 'projects');
const Education = mongoose.model('education', educationSchema, 'education');
const Skills = mongoose.model('skills', skillsSchema, 'skills');
const Message = mongoose.model('messages', messageSchema, 'messages');


// Add Routes

app.get('/info', async (req, res) => {
  try {
    const info = await Info.findOne();
    res.json(info);
  } catch(err) {
    res.status(500).json({message: 'Failed to fetch info.'});
  }
});

app.get('/projects', async (req, res) => {
  try {
    const info = await Projects.find();
    res.json(info);
  } catch(err) {
    res.status(500).json({message: 'Failed to fetch projects.'});
  }
});

app.get('/education', async (req, res) => {
  try {
    const info = await Education.find();
    res.json(info);
  } catch(err) {
    res.status(500).json({message: 'Failed to fetch education.'});
  }
});

app.get('/skills', async (req, res) => {
  try {
    const info = await Skills.find();
    res.json(info);
  } catch(err) {
    res.status(500).json({message: 'Failed to fetch skills.'});
  }
});

// Post request to receive messages

app.post('/messages', async (req, res) => {
  try {
      const {name, email, message} = req.body;
      const sentMessage = new Message({name, email, message});
      await sentMessage.save();
      res.status(200).json({message:'Message sent successfully.'});
  } catch(err) {
      res.status(500).json({message: 'Failed to send message.'});
  }
});

// Start server

app.listen(PORT, () => {console.log('Server is running on http://localhost:5000/')});