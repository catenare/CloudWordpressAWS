import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as CmsCdkStack from '../lib/cms_cdk_stack';


test('CMS Stack Created', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: "192.168.0.0/16"
    });
    template.resourceCountIs('AWS::EC2::VPC', 1);
});

test('SSM Parameters', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::SSM::Parameter', 13);

    template.hasResourceProperties('AWS::SSM::Parameter', {
        Name: Match.stringLikeRegexp('/cms/wp-nonce_salt')
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
        Name: Match.stringLikeRegexp('/cms/wp-multisite')
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
        Name: Match.stringLikeRegexp('/cms/db-resource-arn')
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
        Name: Match.stringLikeRegexp('/cms/db-secret-name')
    });
})

test('Aurora Settings', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::RDS::DBCluster', 1);

    template.hasResourceProperties('AWS::RDS::DBCluster', {
        DatabaseName: "wordpress"
    });

})

test('EFS File System', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EFS::FileSystem', 1);
    template.hasResourceProperties('AWS::EFS::FileSystem', {
        PerformanceMode: "generalPurpose"
    });
})

test('Service log props', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Logs::LogGroup', {
        RetentionInDays: 30,
        LogGroupName: "/ecs/nziswano-cms",
    });
})

test('Task role', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Role', {
        AssumeRolePolicyDocument: Match.objectLike({
            Statement: Match.anyValue(),
        }),
    });
})

test('ECS and Fargate Cluster', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::ECS::Cluster', 1);

    // Task definition
    template.hasResourceProperties('AWS::ECS::TaskDefinition', {
        RequiresCompatibilities: Match.arrayWith(["FARGATE"]),
        Family: "nziswano-cms",
        RuntimePlatform: Match.objectLike({
            "CpuArchitecture": "ARM64",
            "OperatingSystemFamily": "LINUX"
        })
    });
})

test('EC2 security group', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupName: "nziswanoCmsSecurityGroup",
        VpcId: Match.anyValue()
    });
})
