import { initCountUps, initVideoPreviews } from "../vendor/oj-designsystem/index.js";

// These scoped APIs own animation, reduced motion and accessible fallbacks.
// Website navigation, search and other existing controllers keep their scope.
initCountUps(document);
initVideoPreviews(document);
