import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplate implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeMailTemplate;
