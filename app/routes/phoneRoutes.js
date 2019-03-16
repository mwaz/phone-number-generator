import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import PhoneController from '../controllers/phoneController';

const phoneController = new PhoneController();
const router = new Router();
import store from 'store-js';

router.post('/', catchErrors(phoneController.generateNumbers));
router.get('/', catchErrors(phoneController.getNumbers));
router.get('/max', catchErrors(phoneController.sortNumbersMax));
router.get('/min', catchErrors(phoneController.sortNumbersMin));

router.use((error, req, res, next) => {
if (error.type === 'ValidationError') {
    return res.status(422).jsend.fail({ errors: error.errors})
  };

  res.status(500).jsend.error({
    message: 'Something went wrong on the server.'
  });
});

export default router;