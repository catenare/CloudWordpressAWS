import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { ServiceLog } from './service_log';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface FargateTaskDefinitionProps {
  vpc: ec2.Vpc;
};

// # https://aws.amazon.com/blogs/containers/building-http-api-based-services-using-aws-fargate/

export class FargateTaskDefinition extends Construct {
  public readonly taskDefinition: ecs.FargateTaskDefinition;
  constructor(scope: Construct, id: string, props: FargateTaskDefinitionProps) {

    super(scope, id);

    const image = ecr.Repository.fromRepositoryName(this, 'Repository', 'nziswano-registry',);

    const serviceLogGroupDriver = new ServiceLog(this, 'ServiceLogGroupDriver', {
      streamPrefix: 'nziswano-cms',
      logGroupName: '/ecs/nziswano-cms',
    });

    const taskrole = new iam.Role(this, 'ecsTaskExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
    });

    taskrole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'));

    const nziswanoCmsSecGrp = new ec2.SecurityGroup(this, "nziswanoCmsSecurityGroup", {
      allowAllOutbound: true,
      securityGroupName: 'nziswanoCmsSecurityGroup',
      vpc: props.vpc
    });

    nziswanoCmsSecGrp.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    const awsTaskDefinition = {
      family: 'nziswano-cms-task-definition',
      image: image,
      logging: serviceLogGroupDriver,
      runtimePlatform: {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.ARM64
      },
      cpu: 512,
      taskrole: taskrole
    }

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FargateTaskDefinition', awsTaskDefinition);

    this.taskDefinition = taskDefinition;
  }

};

// - WORDPRESS_DB_HOST=${ WORDPRESS_DB_HOST }
// - WORDPRESS_DB_USER=${ WORDPRESS_DB_USER }
// - WORDPRESS_DB_PASSWORD=${ WORDPRESS_DB_PASSWORD }
// - WORDPRESS_DB_NAME=${ WORDPRESS_DB_NAME }
// - AUTH_KEY=${ AUTH_KEY }
// - SECURE_AUTH_KEY=${ SECURE_AUTH_KEY }
// - LOGGED_IN_KEY=${ LOGGED_IN_KEY }
// - NONCE_KEY=${ NONCE_KEY }
// - AUTH_SALT=${ AUTH_SALT }
// - SECURE_AUTH_SALT=${ SECURE_AUTH_SALT }
// - LOGGED_IN_SALT=${ LOGGED_IN_SALT }
// - NONCE_SALT=${ NONCE_SALT }
// - MY_KEY=${ MY_KEY }
// - WP_DEBUG=${ WP_DEBUG }


// version: 1
// task_definition:
// task_execution_role: ecsTaskExecutionRole
// ecs_network_mode: awsvpc
// task_size:
// mem_limit: 0.5GB
// cpu_limit: 256
// run_params:
// network_configuration:
// awsvpc_configuration:
// subnets:
// - "subnet-0f0a44b7b22bdbabd"
//   - "subnet-012c36b402fd2e1ca"
// security_groups:
// - "sg-04b9ab288c394e397"
// assign_public_ip: ENABLED