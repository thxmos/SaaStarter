/// <reference path="./.sst/platform/config.d.ts" />

import * as cdk from "aws-cdk-lib";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as acm from "aws-cdk-lib/aws-certificatemanager";


const APP_NAME = "bean-swipe";
const APP_DOMAIN = "beanswipe.com";
const EMAIL_SENDER = `mail@${APP_DOMAIN}`;

// todo: this wont workfor deployment
const POSTGRES_USER = process.env.POSTGRES_USER!;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD!;
const POSTGRES_DB = process.env.POSTGRES_DB!;
const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public`;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!; // todo: do we need?
const NODE_ENV = process.env.NODE_ENV!;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!; //todo: dont think we need for prod
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;

export default {
  config(){
    return {
      name: APP_NAME,
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({stack}){
      const serverCachePolicy = new cf.CachePolicy(stack, "server-cache", {
        queryStringBehavior: cf.CacheQueryStringBehavior.all(),
        headerBehavior: cf.CacheQueryStringBehavior.all(),
        cookieBehavior: cf.CacheQueryStringBehavior.none(),
        defaultTtl: cdk.Duration.days(0),
        maxTtl: cdk.Duration.days(365),
        minTtl: cdk.Duration.days(0),
        enableAcceptEncodingBrotli: true, //todo: do we need this?
        enableAcceptEncodingGzip: true, //todo: do we need this?
      });

      const certificate = new acm.Certificate(stack, "certificate", { //stack should be this?
        domainName: `*.${APP_DOMAIN}`,
        validation: acm.CertificateValidation.fromDns(),
        subjectAlternativeNames: [`${APP_DOMAIN}`],
        certificateName: `${APP_NAME}-cert`,
      });

      const site = new NextjsSite(stack, "site", {
        cdk: {
          serverCachePolicy
        },
        timeout: "30 seconds",
        memorySize: "2048 MB",
        customDomain: {
          isExternalDomain: true,
          domainName: `www.${APP_DOMAIN}`,
          cdk: {
            certificate,
          },
        },
        // path: "./nextjs",
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          POSTGRES_USER: process.env.POSTGRES_USER!,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
          POSTGRES_DB: process.env.POSTGRES_DB!,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
          NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL!,
          NODE_ENV: process.env.NODE_ENV!,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
          
        }
    });
  },
  // Deploy
  // async run() {
  //   const vpc = new sst.aws.Vpc(`${APP_NAME}-vpc`); // todo: do we need this?

  //   const serverPolicy = new cf.

  //   const email = new sst.aws.Email("Email", {
  //     sender: EMAIL_SENDER,
  //   });

  //   const bucket = new sst.aws.Bucket("bucket", {
  //     access: "public",
  //   });

  //   const db = new sst.aws.Postgres(`${APP_NAME}-db`, {
  //     scaling: {
  //       min: "2 ACU",
  //       max: "128 ACU",
  //     },
  //     vpc,
  //   });

  //   const app = new sst.aws.Nextjs(`${APP_NAME}-app`, {
  //     link: [bucket, db, email],
  //     path: "./nextjs",
  //     domain: APP_DOMAIN,
  //     environment: {
  //       DATABASE_URL,
  //       POSTGRES_USER,
  //       POSTGRES_PASSWORD,
  //       POSTGRES_DB,
  //       GOOGLE_CLIENT_ID,
  //       GOOGLE_CLIENT_SECRET,
  //       NEXT_PUBLIC_URL,
  //       NODE_ENV,
  //       STRIPE_SECRET_KEY,
  //       STRIPE_WEBHOOK_SECRET,
  //       RESEND_API_KEY,
  //       BLOB_READ_WRITE_TOKEN,
  //     },
  //     vpc,
  //   });
  // },
);

/*

import { Config, Nextjs, Postgres, Secret } from "sst/constructs";

const APP_NAME = "bean-swipe";








*/
