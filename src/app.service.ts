import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const data = {
      data: 'Hello Word',
    };
    return data;
  }
}
