import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";


export interface SecurityGroupProps {
  vpc: ec2.Vpc;
}

export class SecurityGroup extends Construct {
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: SecurityGroupProps) {
    super(scope, id);

    const nziswanoCmsSecGrp = new ec2.SecurityGroup(this, "nziswanoCmsSecurityGroup", {
      allowAllOutbound: true,
      securityGroupName: 'nziswanoCmsSecurityGroup',
      vpc: props.vpc
    });

    nziswanoCmsSecGrp.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    this.securityGroup = nziswanoCmsSecGrp;
  }
}