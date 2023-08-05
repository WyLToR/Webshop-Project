import axios from 'axios';
import {
  FRONTEND_URL, MAILER_API_URL, registerTemplateHeader,
} from '../constants/constants';
import HttpError from '../utils/HttpError';
import registerTemplate from './register-template';

export default async function sendActivateMail(user) {
  const {
    id, email, firstName, lastName,
  } = user;
  const registerLink = `${FRONTEND_URL}/activate/email/?userId=${id}`;
  const registerParams = {
    lastName,
    API_URL: registerLink,
  };
  const toSend = [{
    email,
    name: `${lastName} ${firstName}`,
  }];
  const activationMail = await axios.post(
    MAILER_API_URL,
    registerTemplate(toSend, registerParams),
    registerTemplateHeader,
  );
  if (!activationMail) {
    throw new HttpError('Email sending problem, check!', 500);
  }
  return activationMail;
}
