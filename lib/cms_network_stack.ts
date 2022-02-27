import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

export class CmsNetworkStack extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'CmsVpc', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'private',
          subnetType: ec2.SubnetType.PRIVATE,
          cidrMask: 24,
        }
      ],
      natGatewayProvider: ec2.NatProvider.gateway(),
      natGateways: 1
    });

    const lb = new elbv2.ApplicationLoadBalancer(this, 'CmsLoadBalancer', {
      vpc,
      internetFacing: true,
    });
  }
}