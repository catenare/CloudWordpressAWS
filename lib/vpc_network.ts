import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcNetwork extends Construct {

  public readonly vpc: ec2.Vpc;
  public readonly ec2Instance: ec2.Instance;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id);

    const vpc = new ec2.Vpc(this, 'cdk-vpc', {
      cidr: '192.168.0.0/16',
      maxAzs: 3,
      natGateways: 0,
      subnetConfiguration: [
        {
          subnetType: SubnetType.PUBLIC,
          name: 'Public',
          cidrMask: 24
        },
        {
          subnetType: SubnetType.ISOLATED,
          name: 'Isolated',
          cidrMask: 24
        }
      ]
    });

    const ec2InstanceSG = new ec2.SecurityGroup(this, 'ec2-instance-sg', {
      vpc: vpc
    });

    ec2InstanceSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow SSH connections from anywhere',
    );

    const ec2Instance = new ec2.Instance(this, 'ec2-instance', {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: ec2InstanceSG,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'admin_instance',
    });

    this.ec2Instance = ec2Instance;
    this.vpc = vpc;
  }
}