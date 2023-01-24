# Contacts - UX Studio Full-Stack challenge
Developed by Bálint Berente
## Setup
There should be a `.env` file for prisma and AWS S3 in the root directory.
Based on the `.env.example` file, create the `.env` file
and fill in the required variables.

I used an SQLite database for Prisma, which is included in this repository.
The record in that database points to an image in the S3 bucket I have created, read about the config below. 

For this demo, I have configured an S3 Bucket for image serving purposes.
This is the config I used for that bucket and for Prisma (yes this is not a good practice to share this here).
```dotenv
DATABASE_URL="file:contact.db"
AWS_IAM_ACCESS_KEY=AKIAUEFBUIC2FSVNBWXR
AWS_IAM_SECRET=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
AWS_S3_BUCKET_NAME=cdn-contact-images
```

Formidable allows around 10 Megabytes of image upload.

After writing the config, simply run `yarn dev` or as production, build it with `yarn build` and run with `yarn start`.