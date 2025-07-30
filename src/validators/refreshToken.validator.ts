import * as Yup from 'yup';
import { RefreshTokenModel } from '../models/refreshToken.model';

const RefreshTokenValidator: Yup.ObjectSchema<RefreshTokenModel> = Yup.object().shape({
  token: Yup.string().required('Token is required'),
  refreshToken: Yup.string().required('Refresh Token is required'),
});

export default RefreshTokenValidator;
