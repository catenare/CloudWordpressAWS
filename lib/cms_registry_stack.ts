import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class CmsRegistryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ecr_repo = new ecr.Repository(this, 'WordpressDockerRegistry', {
      repositoryName: 'nziswano-registry',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
      lifecycleRules: [
        {
          maxImageAge: cdk.Duration.days(180)
        },
      ]
    });
  }
}
