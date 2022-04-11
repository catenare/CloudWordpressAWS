#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CmsCdkStack } from '../lib/cms_cdk_stack';
import { CmsRegistryStack } from '../lib/cms_registry_stack';
import { CmsParamsStack } from '../lib/cms_params_stack';

const app = new cdk.App();
new CmsRegistryStack(app, 'CmsRegistryStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
new CmsCdkStack(app, 'CmsCdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
new CmsParamsStack(app, 'CmsParamsStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
