import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as AwsWordpressCdk from '../lib/aws_wordpress_cdk-stack';

test('WordPress Registry Created', () => {
    const app = new cdk.App();
    const stack = new AwsWordpressCdk.AwsWordpressCdkStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ECR::Repository', {
        RepositoryName: 'nziswano-cms-ecr'
    });
});
