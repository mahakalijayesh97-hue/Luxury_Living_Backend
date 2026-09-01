import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('MAIL_HOST', 'smtp.gmail.com'),
        port: env.int('MAIL_PORT', 587),
        auth: {
          user: env('MAIL_USERNAME'),
          pass: env('MAIL_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('MAIL_FROM_ADDRESS', 'kabirmahakali@gmail.com'),
        defaultReplyTo: env('MAIL_FROM_ADDRESS', 'kabirmahakali@gmail.com'),
      },
    },
  },
});

export default config;
