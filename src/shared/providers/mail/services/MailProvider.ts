import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

interface SendMailData {
  to: string;
  subject: string;
  templatePath: string;
  variables: Record<string, string>;
}

export class MailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });
  }

  async sendMail({ to, subject, templatePath, variables }: SendMailData): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8');
    const parseTemplate = handlebars.compile(templateFileContent);
    const html = parseTemplate(variables);

    await this.client.sendMail({
      to,
      subject,
      html,
      from: `Equipe <${process.env.EMAIL_USER}>`,
    });
  }
}
