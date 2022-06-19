import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { SecurityGroup } from './security_group';
import { FargateTaskDefinition } from './fargate_task_definition';
import { FargateCluster } from './fargate_cluster';
import { Construct } from 'constructs';

export interface FargateServiceProps {
  vpc: ec2.Vpc;
}
export class FargateService extends Construct {
  public readonly fargate_service: ecs.FargateService;
  constructor(scope: Construct, id: string, props: FargateServiceProps) {

    super(scope, id);

    const nziswanoCmsSecGrp = new SecurityGroup(this, 'nziswanoCmsSecurityGroup', {
      vpc: props.vpc
    });

    const fargateCluster = new FargateCluster(this, 'nziswnaocmsFargateCluster', {
      vpc: props.vpc
    });

    const fargateTaskDefinition = new FargateTaskDefinition(this, 'FargateTaskDefinition', {
      vpc: props.vpc,
      db: fargateCluster.db
    });

    const service = new ecs.FargateService(this, 'FargateService', {
      cluster: fargateCluster.cluster,
      taskDefinition: fargateTaskDefinition.taskDefinition,
      assignPublicIp: true,
      securityGroups: [nziswanoCmsSecGrp.securityGroup],
    });

    this.fargate_service = service;
  }
}