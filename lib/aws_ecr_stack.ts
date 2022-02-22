import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class WordpressEcrRegistry extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const ecr_repo = new ecr.Repository(this, 'WordpressDockerRegistry', {
      repositoryName: 'nziswano-cms-ecr',
    });
  }
}