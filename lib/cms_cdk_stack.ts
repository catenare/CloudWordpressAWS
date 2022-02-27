import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { VpcNetwork } from './vpc_network';
import { Construct } from 'constructs';

export class CmsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    // Create VPC network
    const network = new VpcNetwork(this, 'VpcNetwork');


  }
}
