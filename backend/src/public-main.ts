import 'dotenv/config';
import { bootstrapApi } from './common/bootstrap.js';
import { PublicAppModule } from './public/public-app.module.js';

await bootstrapApi(PublicAppModule, {
  name: 'Public API',
  port: Number(process.env['PUBLIC_API_PORT'] ?? 3000),
});
