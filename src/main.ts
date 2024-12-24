import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Constants } from './common/constants.config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api/v1')
    await app.listen(Constants.PORT ?? 5001)
}
bootstrap()
