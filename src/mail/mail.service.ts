import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';

import { News } from 'src/news/news.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  public async sendTest() {
    console.log('Sending test email');
    return this.mailService
      .sendMail({
        subject: 'First test email',
        template: 'test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  public async sendNewNewsForAdmins(news: News): Promise<void> {
    console.log('Sending email about a new news to administrators');

    const emails = process.env.ADMINS.split(',');
    for (const email of emails) {
      await this.mailService
        .sendMail({
          to: email,
          subject: `Created a new news: ${news.title}`,
          template: 'new-news',
          context: news,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  public async sendEditedNewsForAdmins(
    existedNews: News,
    updatedNews: News,
  ): Promise<void> {
    console.log('Sending email about an edited news to administrators');

    const emails = process.env.ADMINS.split(',');
    for (const email of emails) {
      await this.mailService
        .sendMail({
          to: email,
          subject: `Edited a news: ${existedNews.title}`,
          template: 'edited-news',
          context: {
            existed: existedNews,
            updated: updatedNews,
          },
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
}
