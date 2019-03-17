import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import PhoneController from '../controllers/phoneController';

const phoneController = new PhoneController();
const router = new Router();

router.post('/', catchErrors(phoneController.generateNumbers));
router.get('/', catchErrors(phoneController.getNumbers));
router.delete('/', catchErrors(phoneController.deleteNumbers));
router.post('/save', catchErrors(phoneController.saveDataToFile));
router.get('/ascending', catchErrors(phoneController.sortNumbersMax));
router.get('/descending', catchErrors(phoneController.sortNumbersMin));

router.use((error, req, res, next) => {
if (error.type === 'ValidationError') {
    return res.status(422).jsend.fail({ errors: error.errors})
  };

  res.status(500).jsend.error({
    message: 'Oops!, Kindly retry'
  });
});

export default router;