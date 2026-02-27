# Deployment Checklist

Before deploying Pockit Dashboard to production, ensure all items are completed.

## Pre-Deployment

### Code Quality
- [ ] Run linter: `npm run lint`
- [ ] All linting errors fixed
- [ ] Code review completed
- [ ] No console.log() statements (except error logging)
- [ ] No TODO or FIXME comments in production code

### Environment Configuration
- [ ] `.env.production` created with all required variables
- [ ] `NEXTAUTH_SECRET` is strong (40+ characters, randomly generated)
- [ ] `BACKEND_API_URL` points to production API
- [ ] `NEXTAUTH_URL` matches your production domain (HTTPS)
- [ ] `.env.production` is NOT committed to git
- [ ] `.env.production` added to `.gitignore`

### Security
- [ ] All sensitive data removed from code
- [ ] No API keys in source files
- [ ] No hardcoded passwords or tokens
- [ ] CORS configured properly in `src/middleware.ts`
- [ ] Security headers enabled in `next.config.ts`
- [ ] CSP (Content Security Policy) configured
- [ ] HSTS header enabled for HTTPS

### Build & Testing
- [ ] Local production build works: `npm run build && npm start`
- [ ] No build warnings
- [ ] No TypeScript errors
- [ ] Application loads without errors
- [ ] Login flow works end-to-end
- [ ] Token persistence works (refresh page and still logged in)
- [ ] Logout clears session properly

### Database & Backend
- [ ] Backend API is running and accessible
- [ ] `BACKEND_API_URL` is correct
- [ ] API endpoints are working
- [ ] CORS is configured on backend
- [ ] Database migrations completed
- [ ] Database backups configured

### Dependencies
- [ ] All dependencies are security-patched
- [ ] Run: `npm audit` and fix vulnerabilities
- [ ] No deprecated packages
- [ ] `package-lock.json` is committed

## Deployment Setup

### Vercel Deployment
- [ ] GitHub repository connected to Vercel
- [ ] Project imported in Vercel dashboard
- [ ] Environment variables set in Vercel settings
- [ ] Build command set to: `npm run build`
- [ ] Start command set to: `npm start`
- [ ] Custom domain configured (if applicable)
- [ ] DNS updated to point to Vercel
- [ ] Domain SSL verified

### Docker Deployment
- [ ] Dockerfile builds without errors
- [ ] `.dockerignore` configured
- [ ] Docker image runs locally: `docker build -t pockit . && docker run -p 3000:3000 pockit`
- [ ] All environment variables passed to container
- [ ] Health checks working
- [ ] Image pushed to registry (ECR/Docker Hub/etc.)

### VPS/Self-Hosted
- [ ] Server security hardened (firewall, SSH keys)
- [ ] Node.js 18.x installed
- [ ] PM2 or similar process manager installed
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Domain pointing to server IP
- [ ] Auto-restart on server reboot configured

### CI/CD Pipeline
- [ ] GitHub Actions workflow configured
- [ ] All secrets added to GitHub Actions
- [ ] Sample workflow runs successfully
- [ ] Auto-deploy on push to main (if using)
- [ ] Staging environment available for testing

## Pre-Production Testing

### Functionality Testing
- [ ] Authentication flow works
- [ ] Login/logout works
- [ ] Forgot password works
- [ ] Protected routes redirect properly
- [ ] API calls working with production backend
- [ ] All features function correctly

### Performance Testing
- [ ] Page load time acceptable
- [ ] No console errors
- [ ] No memory leaks
- [ ] Server response times acceptable
- [ ] Database queries optimized

### Security Testing
- [ ] HTTPS working (green lock in browser)
- [ ] Security headers present in response
- [ ] Cookies marked as httpOnly/Secure
- [ ] No sensitive data in URLs
- [ ] No XSS vulnerabilities
- [ ] CSRF protection working

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Design
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## Production Monitoring Setup

### Logging
- [ ] Error logging configured
- [ ] Access logs available
- [ ] Logs backed up
- [ ] Log rotation configured (if self-hosted)

### Error Tracking
- [ ] Sentry or similar configured (optional)
- [ ] Error notifications setup
- [ ] Alert thresholds configured
- [ ] Team members added to notifications

### Performance Monitoring
- [ ] Web Vitals monitoring (Core Web Vitals)
- [ ] API response time monitoring
- [ ] Server resource usage monitoring
- [ ] Database query monitoring

### Uptime Monitoring
- [ ] Uptime monitoring service configured
- [ ] Health check endpoint working
- [ ] Notifications on downtime
- [ ] Status page created (optional)

### Backups
- [ ] Database backups automated
- [ ] Backup retention policy set (30 days minimum)
- [ ] Restore process tested
- [ ] Code backups via git

## Post-Deployment

### Verification
- [ ] Application accessible at production URL
- [ ] Homepage loads without errors
- [ ] All pages load correctly
- [ ] API calls succeed
- [ ] No 404 or 500 errors in logs
- [ ] Performance metrics acceptable

### Monitoring
- [ ] Check error logs for any issues
- [ ] Monitor server resources
- [ ] Check database connection
- [ ] Verify automatic backups running

### Documentation
- [ ] Deployment documented
- [ ] Runbook created for common issues
- [ ] Team updated on deployment
- [ ] Rollback plan documented

### Communication
- [ ] Team notified of deployment
- [ ] Status page updated
- [ ] Users notified if needed
- [ ] Stakeholders informed

## Rollback Plan

In case of issues:

```bash
# Vercel: Automatic rollback available in dashboard
# Docker: Roll back to previous image tag
docker run -p 3000:3000 pockit:v1.0.0

# VPS: Roll back via git
git revert <commit-hash>
npm install
npm run build
pm2 restart pockit-dashboard
```

## Post-Launch Monitoring (First 24 Hours)

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Watch for security alerts
- [ ] Monitor user feedback
- [ ] Be ready to rollback if critical issues found

## Sign-Off

- [ ] Development Team Lead: _______________  Date: ________
- [ ] QA Manager: _______________  Date: ________
- [ ] DevOps/Deployment: _______________  Date: ________
- [ ] Project Manager: _______________  Date: ________
