import express, { Request, Response } from 'express'
import { requireAuth } from '@sgtickets510/common'

const router = express.Router()

// Type assertion needed due to Express version conflicts between packages
// Both packages use Express 5.1.0, but TypeScript sees different type paths
router.post('/api/tickets', requireAuth as unknown as express.RequestHandler, (req: Request, res: Response) => {
    res.sendStatus(200);
})

export { router as createTicketRouter }