#!/bin/bash
# Script to generate secure environment variables for production

echo "🔐 Generating secure credentials for Nipon Motors..."
echo ""

# Generate Django SECRET_KEY (50 random characters)
echo "# Django Configuration" > .env
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
echo "SECRET_KEY=${SECRET_KEY}" >> .env
echo "DEBUG=False" >> .env
echo "ALLOWED_HOSTS=localhost,127.0.0.1" >> .env
echo "CORS_ALLOWED_ORIGINS=http://localhost" >> .env
echo "" >> .env

# Generate random database password (25 characters)
echo "# Database Configuration" >> .env
echo "DB_NAME=nipon_motors" >> .env
echo "DB_USER=postgres" >> .env
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
echo "" >> .env

# Add AWS placeholders
echo "# AWS Configuration (Optional - for S3 media storage)" >> .env
echo "# AWS_ACCESS_KEY_ID=your_key_here" >> .env
echo "# AWS_SECRET_ACCESS_KEY=your_secret_here" >> .env
echo "# AWS_STORAGE_BUCKET_NAME=your_bucket_here" >> .env
echo "# AWS_S3_REGION_NAME=us-east-1" >> .env

echo "✅ .env file created successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Review .env and update ALLOWED_HOSTS with your domain"
echo "   2. Update CORS_ALLOWED_ORIGINS with your frontend URL"
echo "   3. Run: docker-compose up --build"
echo ""
echo "⚠️  IMPORTANT: Never commit .env to git!"
