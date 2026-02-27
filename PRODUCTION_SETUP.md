# Production Setup Guide

This guide covers the production deployment setup for the Pockit Dashboard application.

## Prerequisites

- Node.js 18.x LTS (see `.nvmrc`)
- Docker (for containerized deployment)
- Git
- Vercel account (if deploying to Vercel)
- AWS/DigitalOcean account (if self-hosted)

## Environment Setup

### 1. Environment Variables

Copy `.env.example` and create environment-specific files:

```bash
# For production
cp .env.example .env.production
# For staging
cp .env.example .env.staging
```

Update the values in each file:

```env
BACKEND_API_URL=https://your-production-api.com
NODE_ENV=production
NEXTAUTH_SECRET=<generate-a-strong-random-string>
NEXTAUTH_URL=https://your-production-domain.com
```

**Important**: Generate a strong `NEXTAUTH_SECRET` using:
```bash
openssl rand -base64 32
```

### 2. Node Version

This project uses Node.js 18.x. Install via NVM:

```bash
nvm install 18.17.0
nvm use 18.17.0
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest option for Next.js applications.

#### Steps:

1. **Connect GitHub Repository**
   - Sign in to [Vercel](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Import the project

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following:
     - `BACKEND_API_URL`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`

3. **Deploy**
   - Vercel automatically deploys on `git push` to main/master
   - View deployments in the Vercel dashboard

#### Benefits:
- Automatic deployments
- Built-in analytics
- Serverless functions
- Global CDN
- Zero-config setup

### Option 2: Docker + Self-Hosted (AWS/DigitalOcean)

#### Build Docker Image

```bash
docker build -t pockit-dashboard:latest .
```

#### Run Locally

```bash
docker run -p 3000:3000 \
  -e BACKEND_API_URL=https://api.example.com \
  -e NEXTAUTH_SECRET=your-secret \
  -e NEXTAUTH_URL=https://your-domain.com \
  pockit-dashboard:latest
```

#### Using Docker Compose

```bash
# Update .env file with your values
docker-compose up -d
```

#### Push to Registry

```bash
# AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker tag pockit-dashboard:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/pockit-dashboard:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/pockit-dashboard:latest

# Docker Hub
docker tag pockit-dashboard:latest your-username/pockit-dashboard:latest
docker push your-username/pockit-dashboard:latest
```

#### Deploy to AWS ECS

```bash
# Create task definition, service, and cluster in AWS Console
# Then update service with new image
aws ecs update-service --cluster pockit-cluster --service pockit-service --force-new-deployment
```

#### Deploy to DigitalOcean App Platform

1. Go to DigitalOcean App Platform
2. Connect GitHub repository
3. Select `Dockerfile` as source
4. Set environment variables
5. Deploy

### Option 3: Traditional VPS (Ubuntu/CentOS)

#### Install Dependencies

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Clone and Setup

```bash
git clone https://github.com/your-repo/pockit-dashboard.git
cd pockit-dashboard
npm install
npm run build
```

#### Setup PM2 for Process Management

```bash
sudo npm install -g pm2
pm2 start npm --name "pockit-dashboard" -- start
pm2 startup
pm2 save
```

#### Setup Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable HTTPS

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## CI/CD Pipeline

### GitHub Actions

The project includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`).

#### Setup

1. **Add GitHub Secrets**
   - `VERCEL_TOKEN` - Vercel API token
   - `VERCEL_ORG_ID` - Vercel organization ID
   - `VERCEL_PROJECT_ID` - Vercel project ID
   - `BACKEND_API_URL` - Production API URL
   - `NEXTAUTH_SECRET` - Auth secret
   - `NEXTAUTH_URL` - Production URL

2. **Workflow Triggers**
   - Runs on all PRs (builds and lints)
   - Auto-deploys on push to `main` or `master`

3. **Build Output**
   - Checks linting with ESLint
   - Builds the Next.js application
   - Deploys to Vercel (if push to main)

## Security Checklist

- [ ] Set strong `NEXTAUTH_SECRET` (40+ characters)
- [ ] Use HTTPS in production (`NEXTAUTH_URL=https://...`)
- [ ] Enable secure cookies in production
- [ ] Configure CORS properly (check middleware.ts)
- [ ] Set up rate limiting on API endpoints
- [ ] Enable HSTS headers (configured in next.config.ts)
- [ ] Disable source maps in production (configured)
- [ ] Use environment-specific secrets
- [ ] Enable API authentication tokens
- [ ] Setup monitoring and error tracking

## Performance Optimization

The application is pre-configured with:

- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Automatic route-based code splitting
- **Minification**: SWC-based minification
- **Cache Headers**: Optimal caching strategies
- **Compression**: Gzip compression enabled
- **Source Maps**: Disabled in production

## Monitoring & Logging

### Add Error Tracking (Optional)

#### Sentry

```bash
npm install @sentry/nextjs
```

Add to `next.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Add Analytics (Optional)

```bash
npm install next-google-analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { GoogleAnalytics } from 'next-google-analytics';

export default function RootLayout() {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      {/* your content */}
    </>
  );
}
```

## Database & Sessions

If using a backend database for user sessions:

### PostgreSQL Example

```sql
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  token VARCHAR(500),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Update API routes to handle sessions

See `src/app/api/auth/` for implementation patterns.

## Testing in Production-like Environment

### Local Production Build

```bash
npm run build
npm start
```

Test at ``

### Staging Environment

Deploy to staging with different domain:
- `NEXTAUTH_URL=https://staging.your-domain.com`
- Connect to staging API backend
- Run smoke tests before production

## Troubleshooting

### Build Fails

```bash
# Clear build cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Token Not Persisting

- Verify cookies are being set (browser DevTools → Applications)
- Check `httpOnly` cookie flag in API routes
- Verify `NEXTAUTH_URL` matches production domain

### CORS Errors

Edit `src/middleware.ts` and update:
```typescript
response.headers.set(
  "Access-Control-Allow-Origin",
  "https://your-domain.com" // Specify your domain
);
```

## Scaling Considerations

- **Database**: Use managed services (AWS RDS, DigitalOcean Managed DB)
- **Caching**: Implement Redis for session storage
- **CDN**: Use CloudFlare or AWS CloudFront for static assets
- **Load Balancing**: Use ELB/ALB for multiple instances
- **Auto-scaling**: Configure based on traffic metrics

## Next Steps

1. Setup environment variables for your deployment
2. Test the build: `npm run build && npm start`
3. Push to your chosen platform (Vercel/Docker/VPS)
4. Monitor logs and errors
5. Setup alerts for critical errors

## Support

For issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- GitHub Issues in this repository
