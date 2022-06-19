import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CmsRegistryStack from '../lib/cms_registry_stack';

test('WordPress Registry Created', () => {
    const app = new cdk.App();
    const stack = new CmsRegistryStack.CmsRegistryStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ECR::Repository', {
        RepositoryName: 'nziswano-registry'
    });
});
