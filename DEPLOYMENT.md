# 🚀 Deployment Guide - BrandCollab Platform

This guide will walk you through deploying both the frontend and backend of the BrandCollab platform.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Backend Deployment (Heroku)](#backend-deployment-heroku)
5. [Backend Deployment (Railway)](#backend-deployment-railway)
6. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
7. [AWS S3 Setup](#aws-s3-setup)
8. [Stripe Setup](#stripe-setup)
9. [Post-Deployment Testing](#post-deployment-testing)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Node.js v16+ installed
- ✅ Git installed
- ✅ MongoDB Atlas account
- ✅ AWS account (for S3)
- ✅ Stripe account
- ✅ Netlify/Vercel account (for frontend)
- ✅ Heroku/Railway account (for backend)

---

## Frontend Deployment (Netlify)

### Method 1: Using Netlify Dashboard (Easiest)

1. **Prepare your repository**
   ```bash
   cd Major_Project_Client_Enhanced
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - **Base directory**: `Major_Project_Client_Enhanced`
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
   - Click "Deploy site"

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add the following:
     ```
     REACT_APP_API_URL=https://your-backend-url.herokuapp.com
     REACT_APP_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
     ```

4. **Custom Domain (Optional)**
   - Go to Domain settings → Add custom domain
   - Follow the DNS configuration instructions

### Method 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the app
cd Major_Project_Client_Enhanced
npm run build

# Deploy
netlify deploy --prod

# Follow the prompts to create a new site or deploy to existing
```

---

## Frontend Deployment (Vercel)

### Using Vercel Dashboard

1. **Push to GitHub** (same as Netlify Method 1, step 1)

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `Major_Project_Client_Enhanced`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
   - Add environment variables
   - Click "Deploy"

### Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd Major_Project_Client_Enhanced
vercel --prod
```

---

## Backend Deployment (Heroku)

### Step 1: Prepare Backend

```bash
cd Major_Project_Server_Enhanced

# Ensure package.json has start script
# "start": "node server.js"

# Create Procfile
echo "web: node server.js" > Procfile
```

### Step 2: Deploy to Heroku

```bash
# Install Heroku CLI (if not installed)
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create a new Heroku app
heroku create brandcollab-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3500
heroku config:set DATABASE_URI="your_mongodb_atlas_uri"
heroku config:set ACCESS_TOKEN_SECRET="your_access_token_secret"
heroku config:set REFRESH_TOKEN_SECRET="your_refresh_token_secret"
heroku config:set AWS_ACCESS_KEY_ID="your_aws_key"
heroku config:set AWS_SECRET_ACCESS_KEY="your_aws_secret"
heroku config:set AWS_REGION="us-east-1"
heroku config:set AWS_BUCKET_NAME="your_bucket_name"
heroku config:set STRIPE_SECRET_KEY="your_stripe_secret"
heroku config:set CLIENT_URL="https://your-netlify-site.netlify.app"

# Deploy
git init
git add .
git commit -m "Deploy to Heroku"
heroku git:remote -a brandcollab-api
git push heroku main

# Check logs
heroku logs --tail
```

---

## Backend Deployment (Railway)

Railway is an excellent Heroku alternative with a generous free tier.

### Using Railway Dashboard

1. **Go to [Railway](https://railway.app)**
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Node.js
5. **Set environment variables**:
   - Go to Variables tab
   - Add all the variables from the `.env.example` file
6. Click "Deploy"

### Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd Major_Project_Server_Enhanced
railway init

# Link to project
railway link

# Add environment variables
railway variables set DATABASE_URI="your_mongodb_uri"
railway variables set ACCESS_TOKEN_SECRET="your_secret"
# ... add all other variables

# Deploy
railway up
```

---

## Database Setup (MongoDB Atlas)

### Step 1: Create Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Click "Build a Database"
4. Choose **FREE** tier (M0 Sandbox)
5. Select a cloud provider and region (choose closest to your backend)
6. Click "Create Cluster"

### Step 2: Configure Database Access

1. **Database Access**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set permissions to "Read and write to any database"
   - Click "Add User"

2. **Network Access**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### Step 3: Get Connection String

1. Go to "Databases" tab
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `brandcollab`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/brandcollab?retryWrites=true&w=majority
```

---

## AWS S3 Setup

### Step 1: Create S3 Bucket

1. Go to [AWS Console](https://console.aws.amazon.com)
2. Navigate to S3
3. Click "Create bucket"
4. Enter bucket name (e.g., `brandcollab-uploads`)
5. Choose region (same as your backend)
6. **Uncheck** "Block all public access"
7. Click "Create bucket"

### Step 2: Configure CORS

1. Go to your bucket → Permissions tab
2. Scroll to "Cross-origin resource sharing (CORS)"
3. Click "Edit" and add:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["ETag"]
    }
]
```

### Step 3: Create IAM User

1. Navigate to IAM → Users
2. Click "Add users"
3. Enter username (e.g., `brandcollab-s3-user`)
4. Select "Access key - Programmatic access"
5. Click "Next: Permissions"
6. Click "Attach existing policies directly"
7. Select "AmazonS3FullAccess"
8. Click through to "Create user"
9. **Save Access Key ID and Secret Access Key**

---

## Stripe Setup

### Step 1: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up/Login
3. Go to Developers → API keys
4. Copy your **Publishable key** (starts with `pk_`)
5. Copy your **Secret key** (starts with `sk_`)

### Step 2: Set Up Webhooks (Optional)

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Enter your backend URL + `/webhook/stripe`
   - Example: `https://brandcollab-api.herokuapp.com/webhook/stripe`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook secret (starts with `whsec_`)

---

## Post-Deployment Testing

### 1. Test Backend Health

```bash
curl https://your-backend-url.herokuapp.com/health
# Should return: {"status": "ok"}
```

### 2. Test Frontend

1. Open your deployed frontend URL
2. Try registering a new account
3. Check browser console for errors
4. Verify API calls are reaching backend

### 3. Test Full Flow

1. **Register** as an Influencer
2. **Login** with credentials
3. **Update profile** with information
4. **Register** as a Brand (different email)
5. **Create a project** as Brand
6. **View project** as Influencer
7. Test file uploads

### 4. Monitor Logs

**Heroku:**
```bash
heroku logs --tail -a brandcollab-api
```

**Railway:**
```bash
railway logs
```

**Netlify:**
- Go to Deploys → Deploy log

---

## Troubleshooting

### Frontend Issues

**Problem**: Blank page after deployment
- **Solution**: Check browser console for errors
- Verify `REACT_APP_API_URL` is set correctly
- Ensure build was successful

**Problem**: API calls failing
- **Solution**: Check CORS settings on backend
- Verify backend URL is correct
- Check network tab in browser dev tools

### Backend Issues

**Problem**: Database connection failed
- **Solution**: Verify MongoDB Atlas IP whitelist
- Check connection string is correct
- Ensure database user has proper permissions

**Problem**: 500 errors
- **Solution**: Check backend logs
- Verify all environment variables are set
- Check for missing dependencies

**Problem**: AWS S3 upload failing
- **Solution**: Verify IAM user has S3 permissions
- Check bucket CORS configuration
- Verify AWS credentials are correct

---

## Environment Variables Checklist

### Frontend (.env)
- [ ] `REACT_APP_API_URL`
- [ ] `REACT_APP_STRIPE_PUBLIC_KEY`

### Backend (.env)
- [ ] `PORT`
- [ ] `NODE_ENV`
- [ ] `DATABASE_URI`
- [ ] `ACCESS_TOKEN_SECRET`
- [ ] `REFRESH_TOKEN_SECRET`
- [ ] `AWS_ACCESS_KEY_ID`
- [ ] `AWS_SECRET_ACCESS_KEY`
- [ ] `AWS_REGION`
- [ ] `AWS_BUCKET_NAME`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `CLIENT_URL`

---

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong, unique secrets for JWT tokens
3. ✅ Enable HTTPS only in production
4. ✅ Regularly rotate API keys
5. ✅ Monitor logs for suspicious activity
6. ✅ Keep dependencies updated
7. ✅ Use environment-specific configurations

---

## Need Help?

- 📧 Email: support@brandcollab.com
- 📚 Documentation: [Link to docs]
- 💬 Discord: [Link to Discord]
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/brandcollab/issues)

---

**🎉 Congratulations! Your BrandCollab platform is now live!**
