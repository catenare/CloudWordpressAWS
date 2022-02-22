
import { Stack, StackProps } from 'aws-cdk-lib';
import { WordpressEcrRegistry } from './aws_ecr_stack';
import { Construct } from 'constructs';


export class AwsWordpressCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ecr_repo = new WordpressEcrRegistry(this, 'WordpressDockerRegistry');
  }
}
