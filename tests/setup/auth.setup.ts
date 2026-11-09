import { test as setup } from '@playwright/test';
import { ROLES, credentialsFor, storageStatePath } from '@config/roles';
import { LoginPage } from '@pages/auth/login.page';

// One login per role, saved to .auth/<role>.json and reused by every project that depends on `setup`.
for (const role of ROLES) {
  setup(`authenticate as ${role}`, async ({ page }) => {
    const credentials = credentialsFor(role);
    setup.skip(!credentials, `No credentials for ${role}: set the MUKUT_* variables in .env`);

    await new LoginPage(page).login(credentials!.username, credentials!.password);
    await page.context().storageState({ path: storageStatePath(role) });
  });
}
