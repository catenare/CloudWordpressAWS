import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';


export interface ServiceLogProps {
  streamPrefix: string;
  logGroupName: string;
}

export class ServiceLog extends Construct {
  public readonly serviceLogDriver: ecs.AwsLogDriver;

  constructor(scope: Construct, id: string, props: ServiceLogProps) {

    super(scope, id);

    const serviceLogGroup = new logs.LogGroup(this, 'LogGroup', {
      logGroupName: props.logGroupName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: logs.RetentionDays.ONE_MONTH,
    });

    this.serviceLogDriver = new ecs.AwsLogDriver({
      logGroup: serviceLogGroup,
      streamPrefix: props.streamPrefix
    });

  }
}