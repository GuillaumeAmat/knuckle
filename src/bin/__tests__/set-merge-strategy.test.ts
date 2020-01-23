import { binScriptPath } from '../../helpers/tests/binScriptPath';
import * as cmd from '../../helpers/tests/cmd';
import { getKnuckleConfig } from '../../helpers/tests/getKnuckleConfig';
import { setupPristineTestFolder } from '../../helpers/tests/setupPristineTestFolder';

describe('SET-MERGE-STRATEGY', () => {
  setupPristineTestFolder();

  it('should fail if the given tool does not exists', async done => {
    let hasThrown = false;

    try {
      await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'unknown-tool', 'deep']);
    } catch (err) {
      hasThrown = true;
      expect(err).toMatchSnapshot();
    }

    expect(hasThrown).toBe(true);

    done();
  });

  it('should fail if the given strategy does not exists', async done => {
    let hasThrown = false;

    try {
      await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'prettier', 'unknown-strategy']);
    } catch (err) {
      hasThrown = true;
      expect(err).toMatchSnapshot();
    }

    expect(hasThrown).toBe(true);

    done();
  });

  it('should set merge strategies', async done => {
    await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'default', 'replace']);
    await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'prettier', 'spread']);
    await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'eslint', 'deep']);

    const config = getKnuckleConfig()?.config;

    expect(config.mergeStrategies.default).toBe('replace');
    expect(config.mergeStrategies.prettier).toBe('spread');
    expect(config.mergeStrategies.eslint).toBe('deep');

    done();
  });
});
