// @ts-nocheck
// Example: Backend module for the new Backstage backend system
// Add this to your backend in packages/backend/src/index.ts

import {
  createBackendModule,
  coreServices,
} from "@backstage/backend-plugin-api";
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createUuidAction } from "./actions/uuidAction";

/**
 * Scaffolder backend module for utility actions including UUID generation.
 *
 * @alpha
 */
export const scaffolderUtilsAction = createBackendModule({
  pluginId: "scaffolder",
  moduleId: "scaffolder-utils-actions",
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ scaffolder, logger }) {
        logger.info("Initializing Scaffolder Utils Actions");
        
        // Register the UUID generation action
        scaffolder.addActions(createUuidAction());
      },
    });
  },
});
