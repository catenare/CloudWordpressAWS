import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class AwsWordpressCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ecr_repo = new ecr.Repository(this, 'WordpressDockerRegistry', {
      repositoryName: 'nziswano-cms-ecr',
    });
  }
}
