import { registerAs } from '@nestjs/config';

export default registerAs('authorConfig', () => ({
  name: process.env.AUTHOR_NAME || 'Sergio',
  lastname: process.env.AUTHOR_LASTNAME || 'Arro',
}));
