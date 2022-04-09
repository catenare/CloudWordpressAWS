import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ssm from 'aws-cdk-lib/aws-ssm';
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
        WORDPRESS_DB_HOST: ssm.StringParameter.fromStringParameterAttributes(this, 'WordPressDbHost', {
          parameterName: '/cms/db-resource-arn'
        }).stringValue,
        WORDPRESS_DB_USER: "wordpress",
        WORDPRESS_DB_PASSWORD: ssm.StringParameter.fromStringParameterAttributes(this, 'WordPressDbPassword', {
          parameterName: '/cms/db-secret-name'
        }).stringValue,
        WORDPRESS_DB_NAME: 'wordpress',
        AUTH_KEY: ssm.StringParameter.fromStringParameterAttributes(this, 'WordPressDbName', {
          parameterName: '/cms/wp-auth_key'
        }).stringValue,
        SECURE_AUTH_KEY: ssm.StringParameter.fromStringParameterAttributes(this, 'SecureAuthKey', {
          parameterName: '/cms/wp-secure_auth_key'
        }).stringValue,
        LOGGED_IN_KEY: ssm.StringParameter.fromStringParameterAttributes(this, 'LoggedInKey', {
          parameterName: '/cms/wp-secure_auth_key'
        }).stringValue,
        NONCE_KEY: ssm.StringParameter.fromStringParameterAttributes(this, 'NonceKey', {
          parameterName: '/cms/wp-nonce_key'
        }).stringValue,
        AUTH_SALT: ssm.StringParameter.fromStringParameterAttributes(this, 'AuthSalt', {
          parameterName: '/cms/wp-auth_salt'
        }).stringValue,
        SECURE_AUTH_SALT: ssm.StringParameter.fromStringParameterAttributes(this, 'SecureAuthSalt', {
          parameterName: '/cms/wp-secure_auth_salt'
        }).stringValue,
        LOGGED_IN_SALT: ssm.StringParameter.fromStringParameterAttributes(this, 'LoggedInSalt', {
          parameterName: '/cms/wp-logged_in_salt'
        }).stringValue,
        NONCE_SALT: ssm.StringParameter.fromStringParameterAttributes(this, 'NonceSalt', {
          parameterName: '/cms/wp-nonce_salt'
        }).stringValue,
        MY_KEY: ssm.StringParameter.fromStringParameterAttributes(this, 'MyKey', {
          parameterName: '/cms/wp-my_key'
        }).stringValue,
        WP_DEBUG: ssm.StringParameter.fromStringParameterAttributes(this, 'WpDebug', {
          parameterName: '/cms/wp-debug'
        }).stringValue,
        WP_MULTISITE: ssm.StringParameter.fromStringParameterAttributes(this, 'WpMultiSite', {
          parameterName: '/cms/wp-multisite'
        }).stringValue,
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