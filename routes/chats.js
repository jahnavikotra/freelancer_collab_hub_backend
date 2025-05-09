const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');

// Create a new chat
router.post('/', auth, async (req, res) => {
  try {
    const { participantId, projectId } = req.body;
    const chat = new Chat({
      participants: [req.user.id, participantId],
      project: projectId
    });
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get user's chats
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate('participants', ['name', 'email'])
      .populate('project', ['title']);
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Send a message
router.post('/:chatId/messages', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    const message = {
      sender: req.user.id,
      content: req.body.content
    };

    chat.messages.push(message);
    chat.lastMessage = Date.now();
    await chat.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get chat messages
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate('messages.sender', ['name', 'email']);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }
    res.json(chat.messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;