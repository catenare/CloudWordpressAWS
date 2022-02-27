import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcNetwork extends Construct {

  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id);

    this.vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          subnetType: SubnetType.PUBLIC,
          name: 'Public',
          cidrMask: 24
        },
        {
          subnetType: SubnetType.PRIVATE,
          name: 'Private',
          cidrMask: 24
        }
      ]
    });
  }
}