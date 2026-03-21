import 'i18next';

import { defaultNamespace, resources } from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNamespace;
    resources: typeof resources.en;
    enableSelector: true;
  }
}