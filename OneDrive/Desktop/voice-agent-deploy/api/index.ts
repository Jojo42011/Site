// Vercel serverless entry point — wraps the Express app for all API routes.
// Static files are served by Vercel from the dist/ outputDirectory.
// WebSocket (Twilio bridge) is not supported on Vercel; use Fly.io for that.
import app from "../server/app";

export default app;
