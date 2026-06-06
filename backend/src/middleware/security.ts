import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { Express, Request, Response, NextFunction } from 'express';

/**
 * Apply security headers and protection middleware
 */
export const setupSecurityMiddleware = (app: Express): void => {
  // Helmet - sets various HTTP headers for security
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
  }));

  // Data sanitization - removes $ and . from keys (prevents NoSQL injection)
  app.use(mongoSanitize());

  // HTTP Parameter Pollution protection
  app.use(hpp());

  // Custom security headers
  app.use(securityHeadersMiddleware);

  // Request logging for sensitive operations
  app.use(requestLoggingMiddleware);
};

/**
 * Custom security headers middleware
 */
const securityHeadersMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
  // Prevent browsers from MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Disable iframe embedding
  res.setHeader('X-Frame-Options', 'DENY');

  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy (formerly Feature Policy)
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  next();
};

/**
 * Request logging middleware for sensitive operations
 */
const requestLoggingMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  // Log sensitive operations
  if (
    req.path.includes('/auth/') ||
    req.path.includes('/payment/') ||
    req.path.includes('/admin/')
  ) {
    console.log(`[SECURITY] ${req.method} ${req.path} - IP: ${req.ip} - User-Agent: ${req.headers['user-agent']}`);
  }
  next();
};

/**
 * Request validation middleware - checks for suspicious patterns
 */
export const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Check for suspicious payload sizes
  const contentLength = req.headers['content-length'];
  if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) {
    res.status(413).json({ success: false, message: 'Payload too large' });
    return;
  }

  // Check for suspicious SQL-like patterns
  const bodyStr = JSON.stringify(req.body);
  if (/(['";`]|\bor\b|\band\b|--|\/\*|\*\/|xp_|sp_)/i.test(bodyStr)) {
    console.warn(`[SECURITY] Suspicious pattern detected in request from ${req.ip}`);
    // Don't block, just log - might be legitimate
  }

  next();
};
