import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const updateProfileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', updateProfileController.show);
profileRouter.put('/', updateProfileController.update);


export default profileRouter;