import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

export interface DbProps {
  vpc_network: ec2.Vpc;
  ec2_instance: ec2.Instance;
}

export class AuroraServerless extends Construct {

  public readonly db: rds.ServerlessCluster;

  constructor(scope: Construct, id: string, props: DbProps) {

    super(scope, id);

    const cluster = new rds.ServerlessCluster(this, 'WordpressCluster', {
      vpc: props.vpc_network,
      vpcSubnets: {
        subnetType: ec2.SubnetType.ISOLATED,
      },
      engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
      credentials: rds.Credentials.fromGeneratedSecret('wordpress'),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      defaultDatabaseName: 'wordpress'
    });

    cluster.connections.allowFrom(props.ec2_instance, ec2.Port.tcp(5432));

    new cdk.CfnOutput(this, 'dbEndpoint', {
      value: cluster.clusterEndpoint.hostname,
    });

    new cdk.CfnOutput(this, 'secretName', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: cluster.secret?.secretName!,
    });

    this.db = cluster;
  }
}