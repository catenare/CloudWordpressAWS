import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface FargateClusterProps {
  vpc: ec2.Vpc;

}
export class FargateCluster extends Construct {

  public readonly cluster: ecs.Cluster;

  constructor(scope: Construct, id: string, props: FargateClusterProps) {

    super(scope, id);

    const cluster = new ecs.Cluster(this, 'FargateCluster', {
      vpc: props.vpc,
    });

    this.cluster = cluster;

  }
}