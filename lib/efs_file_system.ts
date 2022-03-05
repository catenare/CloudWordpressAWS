import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as efs from 'aws-cdk-lib/aws-efs';
import { Construct } from 'constructs';

export interface EfsFileSystemProps {
  vpc_network: ec2.Vpc;
}
export class EfsFileSystem extends Construct {

  public readonly efs_file_system: efs.FileSystem;

  constructor(scope: Construct, id: string, props: EfsFileSystemProps) {

    super(scope, id);

    const efs_file_system = new efs.FileSystem(this, 'EfsFileSystem', {
      vpc: props.vpc_network,
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
      throughputMode: efs.ThroughputMode.BURSTING,
    })

    this.efs_file_system = efs_file_system;

  }
}