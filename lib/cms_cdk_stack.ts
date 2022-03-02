import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { VpcNetwork } from './vpc_network';
import { WpSsmParameters } from './wp_ssm_parameters';
import { AuroraServerless } from './aurora_serverless';
import { Construct } from 'constructs';

export class CmsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const network = new VpcNetwork(this, 'VpcNetwork');
    const database = new AuroraServerless(this, 'AuroraServerless', {
      vpc_network: network.vpc,
      ec2_instance: network.ec2Instance
    });

    const WpSsmParams = new WpSsmParameters(this, 'SsmParameters', {
      db: database.db
    });
  }
}
