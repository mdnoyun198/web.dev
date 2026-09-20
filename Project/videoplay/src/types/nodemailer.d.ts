declare module 'nodemailer' {
  export type SendMailOptions = {
    from?: string;
    to: string | string[];
    subject?: string;
    text?: string;
    html?: string;
  };

  export interface Transporter {
    sendMail(options: SendMailOptions): Promise<unknown>;
  }

  export function createTransport(config: Record<string, unknown>): Transporter;
  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}
