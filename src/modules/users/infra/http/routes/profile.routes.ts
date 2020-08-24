import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const updateProfileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', updateProfileController.show);
profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
}), updateProfileController.update);


export default profileRouter;