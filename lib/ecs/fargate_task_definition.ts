import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface FargateTaskDefinitionProps {
  vpc: ec2.Vpc;
};


export class FargateTaskDefinition extends Construct {
  public readonly taskDefinition: ecs.FargateTaskDefinition;
  constructor(scope: Construct, id: string, props: FargateTaskDefinitionProps) {

    super(scope, id);

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FargateTaskDefinition', this.awsTaskDefinition);
    this.taskDefinition = taskDefinition;
  }

  awsTaskDefinition = {
    family: 'nziswano-cms-task-definition',
    runtimePlatform: {
      operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
      cpuArchitecture: ecs.CpuArchitecture.ARM64
    },
    cpu: 512
  }
};