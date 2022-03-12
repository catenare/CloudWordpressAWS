import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { ServiceLog } from './service_log';
import { TaskRole } from './task_role';
import { SecurityGroup } from './security_group';
import { Construct } from 'constructs';

export interface FargateTaskDefinitionProps {
  vpc: ec2.Vpc;
};

export class FargateTaskDefinition extends Construct {
  public readonly taskDefinition: ecs.FargateTaskDefinition;
  constructor(scope: Construct, id: string, props: FargateTaskDefinitionProps) {

    super(scope, id);

    const image = ecr.Repository.fromRepositoryName(this, 'Repository', 'nziswano-registry',);

    const serviceLogGroupDriver = new ServiceLog(this, 'ServiceLogGroupDriver', {
      streamPrefix: 'nziswano-cms',
      logGroupName: '/ecs/nziswano-cms',
    });

    const taskRole = new TaskRole(this, 'TaskRole', {});

    const awsTaskDefinition = {
      family: 'nziswano-cms',
      memoryLimitMiB: 512,
      cpu: 256,
      runtimePlatform: {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.ARM64
      },
      taskRole: taskRole.taskRole,
      networkMode: ecs.NetworkMode.AWS_VPC,
      environment: {
        WORDPRESS_DB_HOST: '',
        WORDPRESS_DB_USER: '',
        WORDPRESS_DB_PASSWORD: '',
        WORDPRESS_DB_NAME: '',
        AUTH_KEY: '',
        SECURE_AUTH_KEY: '',
        LOGGED_IN_KEY: '',
        NONCE_KEY: '',
        AUTH_SALT: '',
        SECURE_AUTH_SALT: '',
        LOGGED_IN_SALT: '',
        NONCE_SALT: '',
        MY_KEY: '',
        WP_DEBUG: ''
      },
    }

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FargateTaskDefinition', awsTaskDefinition);

    const serviceContainer = taskDefinition.addContainer('nziswano-cms-container', {
      image: ecs.ContainerImage.fromEcrRepository(image),
      logging: serviceLogGroupDriver.serviceLogDriver,
    })

    serviceContainer.addPortMappings({
      containerPort: 80,
    });

    this.taskDefinition = taskDefinition;
  }

};