import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@sgtickets510/common'
import { Ticket } from '../models/ticket'

const router = express.Router()

// Type assertion needed due to Express version conflicts between packages
// Both packages use Express 5.1.0, but TypeScript sees different type paths
router.post('/api/tickets', 
    requireAuth as unknown as express.RequestHandler,
    [
        body('title')
          .not()
          .isEmpty()
          .withMessage('Title is required'),
        body('price')
          .isFloat({ gt: 0 })
          .withMessage('Price must be greater than 0')    
    ],
    validateRequest as unknown as express.RequestHandler,
    async (req: Request, res: Response) => {
       const { title, price } = req.body;

       const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
       });

       await ticket.save();

       res.status(201).send(ticket);
    }
)

export { router as createTicketRouter }