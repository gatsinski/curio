import { CurioAngularPage } from './app.po';

describe('curio-angular App', () => {
  let page: CurioAngularPage;

  beforeEach(() => {
    page = new CurioAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
