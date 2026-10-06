import 'dotenv/config';
import { bootstrapApi } from './common/bootstrap.js';
import { AdminAppModule } from './admin/admin-app.module.js';

await bootstrapApi(AdminAppModule, {
  name: 'Admin API',
  port: Number(process.env['ADMIN_API_PORT'] ?? 3001),
});
