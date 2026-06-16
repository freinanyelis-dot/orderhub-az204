import { Controller, Get } from '@nestjs/common';

@Controller('debug')
export class AppController {
  @Get('error')
  throwError() {
    throw new Error('Error controlado para validar Application Insights');
  }

  @Get('slow')
  async slowRequest() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { message: 'Respuesta lenta simulada' };
  }
}