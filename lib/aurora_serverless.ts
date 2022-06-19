import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { AuroraMysqlEngineVersion } from 'aws-cdk-lib/aws-rds';
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
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      engine: rds.DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_10_2 }),
      credentials: rds.Credentials.fromGeneratedSecret('wordpress'),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      defaultDatabaseName: 'wordpress',
      enableDataApi: true,
    });

    cluster.connections.allowFrom(props.ec2_instance, ec2.Port.tcp(3306));

    this.db = cluster;
  }
}