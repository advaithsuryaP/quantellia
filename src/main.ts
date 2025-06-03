import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { registerLicense } from '@syncfusion/ej2-base';

// Free trial license key
const LICENSE_KEY =
    'Ngo9BigBOggjHTQxAR8/V1NNaF1cVWhOYVBpR2Nbek5xdl9CaFZQQGYuP1ZhSXxWdkNjWn9fcXNVQGZVUEB9XUs=';

registerLicense(LICENSE_KEY);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);
