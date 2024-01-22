import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as process from 'process';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class LinkedinService {
  private readonly linkedinApiUrl = process.env.LINKEDIN_API_URI;
  private readonly clientId = process.env.LINKEDIN_CLIENT_ID;
  private readonly clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  private readonly redirectUri = process.env.LINKEDIN_REDIRECT_URI;

  constructor(private readonly logger: LoggerService) {}

  async authenticateUser(code: string): Promise<any> {
    const authData = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    };

    try {
      const response = await axios.post(
        `${this.linkedinApiUrl}/oauth/v2/accessToken`,
        null,
        { params: authData },
      );

      return response.data;
    } catch (error) {
      this.logger.error('LinkedIn Authentication Error', error.stack);
      throw new Error('Error authenticating with LinkedIn');
    }
  }

  async postToLinkedIn(accessToken: string, postData: any): Promise<any> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(
        `${this.linkedinApiUrl}/shares`,
        postData,
        { headers },
      );

      return response.data;
    } catch (error) {
      this.logger.error('LINKEDIN POST ERROR', error.stack);
      throw new Error('Error posting to LinkedIn');
    }
  }
}
