import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as CmsCdkStack from '../lib/cms_cdk_stack';


test('CMS Stack Created', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: "10.0.0.0/16"
    });
    template.resourceCountIs('AWS::EC2::VPC', 1);
});

test('SSM Parameters', () => {
    const app = new cdk.App();
    const stack = new CmsCdkStack.CmsCdkStack(app, 'CmsTestStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::SSM::Parameter', 11);

    template.hasResourceProperties('AWS::SSM::Parameter', {
        Name: Match.stringLikeRegexp('/cms/wp-nonce_salt')
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
        Name: Match.stringLikeRegexp('/cms/wp-multisite')
    });
})
