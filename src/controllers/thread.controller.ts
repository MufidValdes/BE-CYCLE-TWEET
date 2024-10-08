import { Request, Response } from 'express';
import ThreadService from '../services/thread.service';
import { ThreadSchema } from '../utils/thread.schema';

class ThreadController {
  async create(req: Request, res: Response) {
    try {
      // console.log(req.body); // Log body
      // console.log(req.file);  // Log file
      // const { error, value } = ThreadSchema.validate(req.body);
      // if (error) {
      //   return res.status(400).json({ error: error.details[0].message });
      // }
      const {content} = req.body
      const imageUrl = req.file?.path;
      if (!imageUrl) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const userId = (req as any).user.userId;// Dari token JWT
      const thread = await ThreadService.createThread(content ,userId,imageUrl);
      res.status(201).json(thread);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  async update(req: Request, res: Response) {
    try {
      const { error, value } = ThreadSchema.validate(req.body);
      const threadId = Number(req.params.id);
      
      const updatedThread = await ThreadService.updateThread(threadId, value);
      res.json(updatedThread);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update thread' });
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.id);
      const deleteThread =await ThreadService.deleteThread(threadId);
      res.status(204).json({ message: 'Thread deleted', deleteThread});
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete thread' });
    }
  }
  
  async findByIdThread(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.id);
      const thread = await ThreadService.getThreadById(threadId);
      res.json(thread);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch thread' });
    }
  }
  
  async findAllThreads(req: Request, res: Response) {
    try {
      const threads = await ThreadService.getAllThreads();
      res.json(threads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch threads' });
    }
  }
  
  async reply(req: Request, res: Response) {
    try {
      const {content} = req.body
      const threadId = Number(req.params.id);
      const userId = (req as any).user.userId;
      
      const reply = await ThreadService.replyToThread(threadId, content, userId);
      res.status(201).json(reply);
    } catch (error) {
      res.status(500).json( {message: 'Failed to reply to thread' , error});
    }
  }
}

export default new ThreadController();
