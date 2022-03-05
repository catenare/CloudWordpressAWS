import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface FargateServiceProps {
  vpc: ec2.Vpc;
  taskDefinition: ecs.FargateTaskDefinition;
  cluster: ecs.Cluster;
}
export class FargateService extends Construct {
  constructor(scope: Construct, id: string, props: FargateServiceProps) {

    super(scope, id);

    const service = new ecs.FargateService(this, 'FargateService', {
      cluster: props.cluster,
      taskDefinition: props.taskDefinition,
      assignPublicIp: true,
    });
  }
}