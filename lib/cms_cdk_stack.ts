import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { VpcNetwork } from './vpc_network';
import { WpSsmParameters } from './wp_ssm_parameters';
import { AuroraServerless } from './aurora_serverless';
import { Construct } from 'constructs';
import { EfsFileSystem } from './efs_file_system';
import { FargateService } from './ecs/fargate_service';

export class CmsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const network = new VpcNetwork(this, 'VpcNetwork');
    const database = new AuroraServerless(this, 'AuroraServerless', {
      vpc_network: network.vpc,
      ec2_instance: network.ec2Instance
    });

    const file_system = new EfsFileSystem(this, 'EfsFileSystem', {
      vpc_network: network.vpc
    })

    const WpSsmParams = new WpSsmParameters(this, 'SsmParameters', {
      db: database.db
    });

    const fargateService = new FargateService(this, 'FargateService', {
      vpc: network.vpc,
    });


    new cdk.CfnOutput(this, 'dbEndpoint', {
      value: database.db.clusterEndpoint.hostname,
    });

    new cdk.CfnOutput(this, 'secretName', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: database.db.secret?.secretName!,
    });

    new cdk.CfnOutput(this, 'ec2InstanceDns', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: network.ec2Instance.instancePublicDnsName,
    });

    new cdk.CfnOutput(this, 'ec2InstanceIp', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: network.ec2Instance.instancePublicIp,
    });
  }
}
